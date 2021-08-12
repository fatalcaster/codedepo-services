import axios from "axios";
import { FastifyInstance, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { RequestValidationError } from "../common/errors/request-validation-error";
import { ReplyType, ValidationError } from "../common/types/types";
import { isEmail, isGithubUsername } from "../common/validation";
import { User } from "../models/user";
require("dotenv").config();

function githubRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  // const client_id = process.env.GITHUB_CLIENT_ID;
  const client_id = "ff75b3e4d82513e62ec7";
  // const cliend_secret = process.env.GITHUB_CLIENT_SECRET;

  app.get(
    "/api/users/get_token",
    async (_request: GithubTokenRequest, reply: ReplyType) => {
      // const redirect = "http://auth-srv:3000/api/users/get_token/callback";
      const scope = "read:user,user:email";
      const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scope}`;
      reply.redirect(url);
    }
  );

  app.get(
    "/api/users/get_token/callback",
    async (request: GithubTokenRequest, reply: ReplyType) => {
      const code = request.query.code;

      const access_token = await getGitAccessToken(code);

      const data = await getGithubUserData(access_token);

      const verifiedData = verifyGithubData(data);

      const existingUser = await User.findOne({ email: verifiedData.email });

      if (existingUser) {
        console.log("User already exists");
        reply.send({});
      }

      const user = await saveGithubData(verifiedData);
      console.log("Creating new User");

      reply.status(201).send(user);
    }
  );

  done();
}

async function saveGithubData(data: GithubData) {
  const user = new User({
    email: data.email,
    git_id: data.git_id,
    username: data.username,
  });
  await user.save();
  return user;
}

function verifyGithubData(data: GithubData | undefined): GithubData | never {
  const errors: ValidationError[] = [];
  if (!data) {
    throw new Error();
  }
  if (!isEmail(data.email)) {
    errors.push({
      param: "email",
      msg: "Invalid Email",
      value: data.email,
    });
  }
  if (!isGithubUsername(data.username)) {
    errors.push({
      param: "username",
      msg: "Invalid Username",
      value: data.username,
    });
  }
  if (errors.length) throw new RequestValidationError(errors);
  return data as GithubData;
}

async function getGithubEmail(
  access_token: string
): Promise<string | undefined> {
  const email = await axios.get("https://api.github.com/user/emails", {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-us",
      Authorization: `token ${access_token}`,
    },
  });
  return email.data[0].email;
}

async function getGitAccessToken(code: string): Promise<string | never> {
  const res = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code,
    },
    {
      headers: {
        Accept: "application/json",
      },
    }
  );
  const { access_token } = res.data;

  if (!access_token) {
    throw new RequestValidationError([
      {
        param: "access_token",
        value: undefined,
        msg: "Invalid access token",
      },
    ]);
  }
  return access_token;
}

async function getGithubUserData(
  access_token: string
): Promise<{ git_id: number; username: string; email: string } | undefined> {
  const email = await getGithubEmail(access_token);
  const { data } = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: "token " + access_token,
    },
  });
  if (!data.id || !data.login || !email) {
    return undefined;
  }
  return {
    git_id: data.id,
    username: data.login,
    email: email,
  };
}

type GithubTokenRequest = FastifyRequest<{ Querystring: { code: string } }>;

type GithubData = { username: string; email: string; git_id: number };

module.exports = githubRouter;
