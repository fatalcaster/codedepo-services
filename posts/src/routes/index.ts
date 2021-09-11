import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Post } from "../models/post";

function indexPostRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/posts",
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const post = await Post.find({});

      reply.status(200).send(post);
    }
  );
  done();
}

export { indexPostRouter };
