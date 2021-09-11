// import { NotAuthorizedError } from "@milovicvtickets/common";
import { NotAuthorizedError, Privileges } from "@milovicvtickets/common";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { getDeviceFingerprint } from "../utils/functions/deviceFingerprint";
import generateJWT from "../utils/functions/jwtGenerator";

function newTokenRouter(
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _options: any,
  done: any
) {
  app.get(
    "/api/users/token",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const old_refresh_token = request.cookies?.refresh_token || "";

      getDeviceFingerprint(request);

      try {
        const payload = jwt.verify(
          old_refresh_token,
          process.env.JWT_REFRESH_TOKEN!
        ) as {
          username: string;
          sessionId: string;
          id: string;
          privileges: Privileges;
        };

        const { refresh_token, access_token } = generateJWT(payload);

        reply.setCookie("access_token", access_token);
        reply.setCookie("refresh_token", refresh_token);
        reply.status(200).send();
      } catch (err) {
        throw new NotAuthorizedError();
      }
    }
  );

  done();
}

export { newTokenRouter };
