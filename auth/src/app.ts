import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { errorHandler } from "@milovicvtickets/common";
import { NotFoundError } from "@milovicvtickets/common";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import { currentUserRouter } from "./routes/current-user";
import { signOutRouter } from "./routes/signout";
import { githubRouter } from "./routes/github-login";
import { newTokenRouter } from "./routes/token";

// import mongoose from "mongoose";
const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
  trustProxy: true,
});

app.register(currentUserRouter);
app.register(signOutRouter);
app.register(githubRouter);
app.register(newTokenRouter);
app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}, // options for parsing cookies
} as FastifyCookieOptions);

app.setErrorHandler(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
