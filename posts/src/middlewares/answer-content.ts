import {
  ValidationError,
  RequestValidationError,
} from "@milovicvtickets/common";
import { FastifyReply } from "fastify";
import { CreateAnswerRequestType } from "../types/types";
import { validBody } from "./common";

export function createAnswerContentValidation(
  request: CreateAnswerRequestType,
  _reply: FastifyReply,
  done: any
) {
  const errors: ValidationError[] = [];
  if (!validBody(request.body.body)) {
    errors.push({
      param: "body",
      value: request.body.body,
      msg: "Valid body is required",
    });
  }
  if (errors.length) throw new RequestValidationError(errors);
  done();
}
