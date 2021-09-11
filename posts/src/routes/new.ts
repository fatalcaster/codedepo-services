import { NotFoundError, requireAuth } from "@milovicvtickets/common";
import { FastifyInstance, FastifyReply } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { createAnswerContentValidation } from "../middlewares/answer-content";
import { createPostContentValidation } from "../middlewares/post-content";
import { Answer } from "../models/answer";
import { Post } from "../models/post";
import { CreateAnswerRequestType, CreatePostRequestType } from "../types/types";

function createPostRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.post(
    "/api/posts",
    {
      preValidation: requireAuth,
      preHandler: createPostContentValidation,
    },
    async (request: CreatePostRequestType, reply: FastifyReply) => {
      const { title, prize, body } = request.body;
      const post = Post.build({
        title: [title],
        prize: prize,
        body: [body],
        modifiedAt: new Date(),
        authorId: request.currentUser.id,
      });

      await post.save();

      const res = {
        body: post.body[0],
        authorId: post.authorId,
        title: post.title[0],
        prize: post.prize,
      };

      reply.status(201).send(res);
    }
  );

  app.post(
    "/api/posts/:id",
    {
      preValidation: requireAuth,
      preHandler: createAnswerContentValidation,
    },
    async (request: CreateAnswerRequestType, reply: FastifyReply) => {
      const { body } = request.body;

      const post = await Post.findById(request.params.id);

      console.log(`\n\n${JSON.stringify(post)}\n\n`);

      if (!post) {
        throw new NotFoundError();
      }

      const answer = Answer.build({
        body: [body],
        authorId: request.currentUser.id,
        postId: request.params.id,
      });

      await answer.save();

      const answerRes = {
        body: answer.body[0],
        authorId: answer.authorId,
        postId: answer.postId,
      };

      reply.status(201).send(answerRes);
    }
  );

  done();
}

export { createPostRouter };
