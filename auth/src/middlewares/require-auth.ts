import { FastifyReply, FastifyRequest } from "fastify";
import { NotAuthorizedError } from "../common/errors/not-authorized-error";

export const requireAuth = (request: FastifyRequest, _reply: FastifyReply, next: any) => {
    if(!request.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
}