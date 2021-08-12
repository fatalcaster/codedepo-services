import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ReplyType, RequestType } from "../common/types/types";

function currentUserRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/users/currentuser",
    async (_request: RequestType, reply: ReplyType) => {
      console.log("Test");
      reply.send({});
    }
  );

  done();
}

module.exports = currentUserRouter;
