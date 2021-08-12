import { FastifyReply, FastifyRequest } from "fastify";
import { CustomError } from "../common/errors/custom-error";

export const errorHandler = (
  err: Error,
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  console.log("Something went wrong", err);

  if (err instanceof CustomError) {
    return reply.status(err.statusCode).send(err.serializeErrors());
  }

  return reply
    .status(400)
    .send({ errors: [{ message: "Something went wrong" }] });
};
