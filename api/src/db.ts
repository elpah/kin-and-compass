import mongoose from "mongoose";
import { env } from "./env.js";

export async function dbConnect() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(env.mongoUri, { bufferCommands: false });
  await dropObsoleteSlugIndexes();
}

async function dropObsoleteSlugIndexes() {
  const db = mongoose.connection.db;
  if (!db) return;
  for (const name of ["packaged_tours", "custom_tours", "deleted_packaged_tours", "deleted_custom_tours"]) {
    try {
      await db.collection(name).dropIndex("slug_1");
    } catch {
      /* index may already be gone */
    }
  }
}
