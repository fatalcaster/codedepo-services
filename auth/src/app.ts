import fastify, { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./common/errors/not-found-error";
import fastifySession from "@fastify/session";
import mongoose from "mongoose";

// import mongoose from "mongoose";
const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: true,
  trustProxy: true
});



app.register(require("./routes/current-user"));
app.register(require("./routes/signout"));
app.register(require("./routes/github-login"));
app.register(require('fastify-cookie'));
app.register(fastifySession, { cookieName:"my-cookie", secret: "lnIfJiSNLLuYB6zoXTeVo8wozDMxiUhW", cookie: { secure: false } });


app.setErrorHandler(errorHandler);



app.all("*", async () => {
  throw new NotFoundError();
});

const PORT = 3000;


const start = async () => {

  if(!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

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

export {app};