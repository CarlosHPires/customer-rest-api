import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connect = async (): Promise<Mongoose> =>
  await mongoose.connect(process.env.MONGODB_REMOTE_KEY, {
    autoIndex: true,
    autoCreate: true,
  });
