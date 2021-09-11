import { NotFoundError } from "@milovicvtickets/common";
import { FastifyInstance, FastifyReply } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { Post } from "../models/post";
import { ShowIndividualPostRequestType } from "../types/types";

function showPostRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/posts/:id",
    async (request: ShowIndividualPostRequestType, reply: FastifyReply) => {
      const post = await Post.findById(request.params.id);

      if (!post) {
        throw new NotFoundError();
      }
      reply.send(post);
    }
  );
  done();
}

export { showPostRouter };
