import mongoose from "mongoose";
import { app } from "./app";

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_ACCESS_TOKEN) {
    throw new Error("JWT_ACCESS_TOKEN must be defined");
  }

  if (!process.env.JWT_REFRESH_TOKEN) {
    throw new Error("JWT_REFRESH_TOKEN must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
