import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Privileges } from "@milovicvtickets/common";
import dotenv from "dotenv";
import { User } from "../models/user";
import generateJWT from "../utils/functions/jwtGenerator";
import { GithubTokenRequest, UserData } from "../utils/types/user";
import { verifyUserData } from "../utils/functions/credValidator";
import {
  getGitAccessToken,
  getGithubUserData,
} from "../utils/functions/gitApiHelper";

dotenv.config();

function githubRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  const client_id = process.env.GITHUB_CLIENT_ID;

  app.get(
    "/api/users/get_token",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const scope = "read:user,user:email";
      const redirect_uri = "http://client-srv:3000/";
      const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri${redirect_uri}`;
      reply.redirect(url);
    }
  );

  app.get(
    "/api/users/get_token/callback",
    async (request: GithubTokenRequest, reply: FastifyReply) => {
      const code = request.query.code;

      const token = await getGitAccessToken(code);

      const data = await getGithubUserData(token);

      const verifiedData = verifyUserData(data, request);

      const user = await saveUserData(verifiedData);

      const { access_token, refresh_token } = generateJWT(user);

      // Add a valid session into redis db, remove the oldest one if there's more than 5 of them

      reply.setCookie("access_token", access_token);
      reply.setCookie("refresh_token", refresh_token);

      reply.redirect("/");
    }
  );

  done();
}

async function saveUserData(data: UserData & { sessionId: string }) {
  let user = await User.findOne({ git_id: data.git_id });
  if (!user) {
    user = User.build({
      email: data.email,
      git_id: data.git_id,
      username: data.username,
      privileges: Privileges.basic,
    });
    await user.save();
  }
  const res = {
    id: user.id,
    username: user.username,
    privileges: user.privileges,
    sessionId: data.sessionId,
  };
  return res;
}

export { githubRouter };
