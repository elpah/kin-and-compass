import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./db.js";
import { env, requireEnv } from "./env.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { tourRouter } from "./routes/tours.js";
import { experienceRouter } from "./routes/experiences.js";
import { productRouter } from "./routes/products.js";
import { uploadDir } from "./uploads.js";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const app = express();
app.use(
  cors({
    origin: [env.websiteUrl, env.adminUrl],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
app.use(express.static(publicDir));
app.get("/", (_req, res) => res.json({ ok: true }));
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use(async (_req, _res, next) => {
  try {
    requireEnv();
    await dbConnect();
    next();
  } catch (error) {
    next(error);
  }
});
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(uploadDir));
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/experiences", experienceRouter);
app.use("/tours", tourRouter);
app.use("/admin", adminRouter);
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const message = error instanceof Error ? error.message : "Server error";
  res.status(500).json({ error: message });
});

export default app;

if (!process.env.VERCEL) {
  requireEnv();
  dbConnect()
    .then(() => {
      app.listen(env.port, () => {
        console.log(`API listening on http://localhost:${env.port}`);
      });
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
