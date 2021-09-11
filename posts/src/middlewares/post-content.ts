import {
  ValidationError,
  RequestValidationError,
} from "@milovicvtickets/common";
import { FastifyReply } from "fastify";
import { CreatePostRequestType } from "../types/types";
import { validTitle, validPrize, validBody } from "./common";

export function createPostContentValidation(
  request: CreatePostRequestType,
  _reply: FastifyReply,
  done: any
) {
  const errors: ValidationError[] = [];
  if (!validTitle(request.body.title)) {
    errors.push({
      param: "title",
      value: request.body.title,
      msg: "Valid title is required",
    });
  }
  if (!validPrize(request.body.prize)) {
    errors.push({
      param: "prize",
      value: request.body.prize,
      msg: "Valid prize is required",
    });
  }
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
