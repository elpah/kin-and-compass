import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { dbConnect } from "./db.js";
import { env, requireEnv } from "./env.js";
import { adminRouter } from "./routes/admin.js";
import { productRouter } from "./routes/products.js";
import { uploadDir } from "./uploads.js";

requireEnv();

const app = express();
app.use(
  cors({
    origin: [env.websiteUrl, env.adminUrl],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/products", productRouter);
app.use("/admin", adminRouter);

async function start() {
  await dbConnect();
  app.listen(env.port, () => {
    console.log(`API listening on http://localhost:${env.port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
