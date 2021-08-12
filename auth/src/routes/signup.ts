import { FastifyInstance, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import { ReplyType, ValidationError } from "../common/types/types";
import { isEmail, isGithubUsername } from "../common/validation";
import { RequestValidationError } from "../common/errors/request-validation-error";
import { DataBaseConnectionError } from "../common/errors/database-connection-error";
import { signUpOpts } from "../common/types/schemas";

function signUpRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.post(
    "/api/users/signup",
    {
      schema: signUpOpts,
      preValidation: signUpValidation,
    },
    async (_request: RequestType, _reply: ReplyType) => {
      throw new DataBaseConnectionError();
    }
  );

  done();
}

const signUpValidation = (
  request: RequestType,
  _reply: ReplyType,
  done: any
) => {
  const { username, email } = request.body;
  const errors: ValidationError[] = [];

  if (!isEmail(email)) {
    errors.push({
      param: "email",
      msg: "Invalid Email",
      value: email,
    });
  }

  if (!isGithubUsername(username)) {
    errors.push({
      param: "username",
      msg: "Invalid Username",
      value: username,
    });
  }

  if (errors.length) {
    throw new RequestValidationError(errors);
  }

  done(undefined);
};

type BodyType = {
  username: string;
  email: string;
};
type RequestType = FastifyRequest<{ Body: BodyType }>;

module.exports = signUpRouter;
