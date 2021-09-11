import { FastifyRequest } from "fastify";

export type CurrentUser = {
  currentUser: {
    git_id: string;
    id: string;
    email: string;
    username: string;
  };
};

export type CreatePostRequestType = FastifyRequest<{
  Body: { title: string; prize: string; body: string };
}> &
  CurrentUser;

export type CreateAnswerRequestType = FastifyRequest<{
  Body: { body: string };
  Params: { id: string };
}> &
  CurrentUser;

export type ShowIndividualPostRequestType = FastifyRequest<{
  Params: { id: string };
}>;
