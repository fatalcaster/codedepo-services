import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

function signOutRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.post(
    "/api/users/signout",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie("refresh_token", { path: "/" });
      reply.clearCookie("access_token", { path: "/" });
      reply.send({});
    }
  );

  done();
}

export { signOutRouter };
