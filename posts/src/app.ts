import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { currentUser, errorHandler } from "@milovicvtickets/common";
import { NotFoundError } from "@milovicvtickets/common";
import cookie, { FastifyCookieOptions } from "fastify-cookie";
import { createPostRouter } from "./routes/new";
import { showPostRouter } from "./routes/show";
import { indexPostRouter } from "./routes";

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
  trustProxy: true,
});

app.register(createPostRouter);
app.register(showPostRouter);
app.register(indexPostRouter);
app.register(cookie, {
  secret: "my-secret", // for cookies signature
  parseOptions: {}, // options for parsing cookies
} as FastifyCookieOptions);
app.addHook("onRequest", currentUser);
app.setErrorHandler(errorHandler);

app.all("*", async () => {
  throw new NotFoundError();
});

export { app };
