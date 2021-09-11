import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import jwt from "jsonwebtoken";
import { Privileges } from "@milovicvtickets/common";

declare global {
  var getAuthCookie: () => string;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_ACCESS_TOKEN = "asdfasdf";

  mongo = await MongoMemoryServer.create();

  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
  await app.close();
});

global.getAuthCookie = () => {
  const payload = {
    id: "543534",
    username: "testerica",
    sessionId: "r432r3543",
    privileges: Privileges.basic,
  };

  const token = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN!);

  return token;
};
