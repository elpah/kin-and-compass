import type { Model } from "mongoose";

function asDoc(doc: unknown) {
  return doc as { _id: unknown; toObject: () => Record<string, unknown> };
}

export async function moveToArchive(live: Model<unknown>, archive: Model<unknown>, query: object) {
  const doc = await live.findOne(query);
  if (!doc) return null;
  const row = asDoc(doc);
  const data = row.toObject();
  delete data._id;
  await archive.create({ ...data, deletedAt: new Date() });
  await live.deleteOne({ _id: row._id } as object);
  return doc;
}

export async function restoreFromArchive(archive: Model<unknown>, live: Model<unknown>, query: object) {
  const doc = await archive.findOne(query);
  if (!doc) return null;
  const row = asDoc(doc);
  const data = row.toObject();
  delete data._id;
  delete data.__v;
  delete data.deletedAt;
  const restored = await live.create(data);
  await archive.deleteOne({ _id: row._id } as object);
  return restored;
}

export async function hardDeleteFromArchive(archive: Model<unknown>, query: object) {
  const result = await archive.deleteOne(query);
  return (result.deletedCount ?? 0) > 0;
}
