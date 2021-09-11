import mongoose from "mongoose";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await app.inject({
    method: "GET",
    url: `/api/posts/${id}`,
  });
  expect(response.statusCode).toEqual(404);
});
