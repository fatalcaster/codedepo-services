import { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ReplyType, RequestType } from "../common/types/types";
import { currentUser } from "../middlewares/current-user";

function currentUserRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/users/currentuser", {preHandler: currentUser},
    async (request: RequestType, reply: ReplyType) => {
     reply.send({currentUser: request.currentUser || null});
    }
  );

  done();
}

module.exports = currentUserRouter;
