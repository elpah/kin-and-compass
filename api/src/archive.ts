import type { Model } from "mongoose";

export async function moveToArchive(live: Model<unknown>, archive: Model<unknown>, query: object) {
  const doc = await live.findOne(query);
  if (!doc) return null;
  const data = (doc as { toObject: () => Record<string, unknown> }).toObject();
  const id = (doc as { _id: unknown })._id;
  delete data._id;
  await archive.create({ ...data, deletedAt: new Date() });
  await live.deleteOne({ _id: id } as object);
  return doc;
}
