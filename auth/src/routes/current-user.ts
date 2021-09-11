import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { currentUser } from "@milovicvtickets/common";

function currentUserRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/users/currentuser",
    { preHandler: currentUser },
    async (
      request: FastifyRequest & { currentUser: any },
      reply: FastifyReply
    ) => {
      reply.send({ currentUser: request.currentUser || null });
    }
  );

  done();
}

export { currentUserRouter };
