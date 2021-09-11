import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { testingRouter } from "../routes/testing";

declare global {
  var getAuthCookie: () => Promise<object | undefined>;
}

let mongo: any;
beforeAll(async () => {
  app.register(testingRouter);

  process.env.JWT_ACCESS_TOKEN = "asdfasdf";
  process.env.JWT_REFRESH_TOKEN = "gfgdfgfdg";

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

global.getAuthCookie = async () => {
  const response = await app.inject({
    method: "GET",
    url: "/api/users/testing",
  });
  expect(response.statusCode).toEqual(200);

  const cookie = response.cookies;

  return cookie;
};
