import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { UserPayload } from "../common/types/types";

export const currentUser = (request: FastifyRequest, _reply: FastifyReply, next: any) => {
    if(!request.session?.jwt) {
        return next();
    }
    try {
        const payload = jwt.verify(request.session.jwt, process.env.JWT_KEY!) as UserPayload;
        request.currentUser = payload;
    } catch(err) {}
    next();
};