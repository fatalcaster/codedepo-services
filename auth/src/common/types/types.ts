import { FastifyReply, FastifyRequest } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server, IncomingMessage, ServerResponse } from "http";

export type ReplyType = FastifyReply<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface,
  unknown
>;

export type RequestType = FastifyRequest<
  RouteGenericInterface,
  Server,
  IncomingMessage
>;

export type ErrorResponseType = {
  errors: Array<{
    message: string;
    field?: string;
  }>;
};

export type ValidationError = {
  param: string;
  value: any;
  msg: any;
  nestedErrors?: unknown[] | undefined;
};
