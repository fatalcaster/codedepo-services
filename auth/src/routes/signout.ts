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
    async (_request: RequestType, reply: ReplyType) => {
      console.log("Test");
      reply.send({});
    }
  );

  done();
}

module.exports = signOutRouter;
