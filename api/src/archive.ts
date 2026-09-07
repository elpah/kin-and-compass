import type { Model } from "mongoose";

export async function moveToArchive<T>(
  live: Model<T>,
  archive: Model<T>,
  query: Record<string, unknown>,
) {
  const doc = await live.findOne(query);
  if (!doc) return null;
  const data = doc.toObject() as Record<string, unknown>;
  delete data._id;
  await archive.create({ ...data, deletedAt: new Date() });
  await live.deleteOne({ _id: doc._id });
  return doc;
}
