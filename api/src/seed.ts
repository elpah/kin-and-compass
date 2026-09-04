import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { products } from "./data/products.js";
import { env, requireEnv } from "./env.js";
import { Product } from "./models/Product.js";
import { User } from "./models/User.js";

async function seed() {
  requireEnv();
  if (!env.adminEmail || !env.adminPassword) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local");
  }
  await mongoose.connect(env.mongoUri);
  const passwordHash = await bcrypt.hash(env.adminPassword, 10);
  await User.findOneAndUpdate(
    { email: env.adminEmail.toLowerCase() },
    {
      name: "Admin",
      email: env.adminEmail.toLowerCase(),
      passwordHash,
      role: "admin",
    },
    { upsert: true },
  );
  for (const product of products) {
    await Product.findOneAndUpdate({ slug: product.slug }, product, { upsert: true });
  }
  console.log(`Seeded admin ${env.adminEmail} and ${products.length} products.`);
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
