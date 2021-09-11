import { Privileges } from "@milovicvtickets/common";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { User } from "../models/user";
import { getDeviceFingerprint } from "../utils/functions/deviceFingerprint";
import generateJWT from "../utils/functions/jwtGenerator";

function testingRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/users/testing",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = await buildUser(request);

      const { access_token, refresh_token } = generateJWT(user, 3);

      // Save jwt hash inside a session

      reply.setCookie("access_token", access_token);
      reply.setCookie("refresh_token", refresh_token);

      reply.status(200).send(user);
    }
  );

  done();
}

async function buildUser(request: FastifyRequest) {
  const user = {
    git_id: "45345435",
    email: "test@test.com",
    username: "testerica",
    privileges: Privileges.basic,
  };
  let userCreated = await User.findOne({
    username: user.username,
  });

  if (!userCreated) {
    userCreated = User.build(user);
    await userCreated.save();
  }
  const data = {
    id: userCreated.id,
    username: userCreated.username,
    privileges: userCreated.privileges,
    sessionId: getDeviceFingerprint(request),
  };
  return data;
}

export { testingRouter };
