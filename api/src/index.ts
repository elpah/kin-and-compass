import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./db.js";
import { env, requireEnv, corsOrigins } from "./env.js";
import { inquiryRouter } from "./routes/inquiries.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin.js";
import { tourRouter } from "./routes/tours.js";
import { experienceRouter } from "./routes/experiences.js";
import { specialTourCategoryRouter } from "./routes/special-tour-categories.js";
import { specialTourRouter } from "./routes/special-tours.js";
import { productRouter } from "./routes/products.js";
import { uploadDir } from "./uploads.js";

function publicFile(name: string) {
  const candidates = [
    join(dirname(fileURLToPath(import.meta.url)), "..", "public", name),
    join(process.cwd(), "public", name),
  ];
  return candidates.find((path) => existsSync(path));
}

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const app = express();
app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});
app.use(
  cors({
    origin: corsOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);
app.options(/.*/, cors({ origin: corsOrigins, credentials: true }));
app.use(express.static(publicDir));
app.get("/favicon.ico", (_req, res) => {
  const file = publicFile("favicon.ico");
  if (!file) {
    res.status(404).end();
    return;
  }
  res.type("image/x-icon").sendFile(file);
});
app.get("/", (_req, res) => {
  res.type("html").send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Kin and Compass API</title>
    <link rel="icon" href="/favicon.ico" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  </head>
  <body>
    <p>{"ok":true}</p>
  </body>
</html>`);
});
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use(async (req, _res, next) => {
  if (req.method === "OPTIONS") {
    next();
    return;
  }
  try {
    requireEnv();
    await dbConnect();
    next();
  } catch (error) {
    next(error);
  }
});
app.use(cookieParser());
app.use(express.json({ limit: "64kb" }));
app.use("/uploads", express.static(uploadDir));
app.use("/inquiries", inquiryRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/experiences", experienceRouter);
app.use("/special-tour-categories", specialTourCategoryRouter);
app.use("/special-tours", specialTourRouter);
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
