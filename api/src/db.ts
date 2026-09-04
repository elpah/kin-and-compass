import mongoose from "mongoose";
import { env } from "./env.js";

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.mongoUri, { bufferCommands: false });
}
