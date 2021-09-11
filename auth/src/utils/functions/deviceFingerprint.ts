import { FastifyRequest } from "fastify";
import crypto from "crypto";

export function getDeviceFingerprint(request: FastifyRequest) {
  const p = {
    remoteAddress:
      request.headers["x-forwarded-for"] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress,
    referrer: request.headers["referer"],
    user_agent: request.headers["user-agent"],
  };
  const hash = getSHA256(JSON.stringify(p));
  return hash;
}

function getSHA256(data: string) {
  const hash = crypto.createHash("sha256");
  const d = hash.update(data, "utf-8");
  const gen_hash = d.digest("hex");
  return gen_hash;
}
