import { FastifySchema } from "fastify";
import { ErrorSchema } from "./primitive-schemas";

export const signUpOpts: FastifySchema = {
  body: {
    type: "object",
    required: ["username", "email"],
    properties: {
      username: {
        type: "string",
      },
      email: {
        type: "string",
      },
    },
  },
  response: {
    200: {
      type: "object",
    },
    400: ErrorSchema,
  },
};
