import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { RequestType, ReplyType } from "../common/types/types";

function signOutRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.post(
    "/api/users/signout",
    async (request: RequestType, reply: ReplyType) => {
      request.session.jwt = null;
      reply.send({});
    }
  );

  done();
}

module.exports = signOutRouter;
