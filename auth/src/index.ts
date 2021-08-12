import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./common/errors/not-found-error";
import mongoose from "mongoose";
const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
});

app.register(require("./routes/current-user"));
app.register(require("./routes/signin"));
app.register(require("./routes/signout"));
app.register(require("./routes/signup"));
app.register(require("./routes/github-testing"));

app.setErrorHandler(errorHandler);

const PORT = 3000;

app.all("*", async () => {
  throw new NotFoundError();
});

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
