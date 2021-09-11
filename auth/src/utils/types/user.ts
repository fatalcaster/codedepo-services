import { FastifyRequest } from "fastify";

export type GithubTokenRequest = FastifyRequest<{
  Querystring: { code: string };
}>;

export type UserData = {
  username: string;
  email: string;
  git_id: string;
};
