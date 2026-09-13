import { Router } from "express";
import { requireAdmin } from "../auth.js";
import { parseProductFields } from "../parse-product.js";
import { getProductBySlug, listFeaturedProducts, listProducts, serializeProduct } from "../products.js";
import { Product } from "../models/Product.js";
import { MAX_GALLERY_IMAGES } from "@kincompass/shared";
import { assertGalleryLimit, upload, uploadManyToCloudinary, uploadToCloudinary } from "../uploads.js";
import { routeParam } from "../route-param.js";

export const productRouter = Router();

const files = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "gallery", maxCount: MAX_GALLERY_IMAGES },
]);

productRouter.get("/", async (_req, res) => {
  try {
    res.json({ products: await listProducts() });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load products" });
  }
});

productRouter.get("/featured", async (req, res) => {
  const parsed = Number(req.query.limit ?? 4);
  const limit = Number.isFinite(parsed) ? Math.min(24, Math.max(1, Math.floor(parsed))) : 4;
  try {
    res.json({ products: await listFeaturedProducts(limit) });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load products" });
  }
});

productRouter.get("/:slug", async (req, res) => {
  try {
    const product = await getProductBySlug(routeParam(req.params.slug));
    if (!product) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const related = (await listProducts())
      .filter((item) => item.category === product.category && item.slug !== product.slug)
      .slice(0, 3);
    res.json({ product, related });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Failed to load product" });
  }
});

productRouter.post("/", requireAdmin, files, async (req, res) => {
  try {
    const fields = parseProductFields(req.body ?? {});
    const uploaded = req.files as Record<string, Express.Multer.File[]> | undefined;
    const extraFiles = uploaded?.gallery ?? [];
    assertGalleryLimit((uploaded?.image?.[0] ? 1 : 0) + extraFiles.length);
    const cover = await uploadToCloudinary(uploaded?.image?.[0], "store");
    const image = cover?.linkUrl ?? "";
    if (!image) {
      res.status(400).json({ error: "A product image is required" });
      return;
    }
    const extra = await uploadManyToCloudinary(extraFiles, "store");
    const gallery = [image, ...extra.map((item) => item.linkUrl)];
    assertGalleryLimit(gallery.length);
    const existing = await Product.findOne({ slug: fields.slug });
    if (existing) {
      res.status(409).json({ error: "A product with this name already exists" });
      return;
    }
    const created = await Product.create({
      ...fields,
      image,
      gallery,
      rating: 0,
      reviewCount: 0,
      reviews: [],
    });
    res.status(201).json({ product: serializeProduct(created.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create product" });
  }
});

productRouter.put("/:slug", requireAdmin, files, async (req, res) => {
  try {
    const current = await Product.findOne({ slug: routeParam(req.params.slug) });
    if (!current) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    const fields = parseProductFields(req.body ?? {});
    const uploaded = req.files as Record<string, Express.Multer.File[]> | undefined;
    const keepGallery = String(req.body.keepGallery ?? "")
      .split(",")
      .map((item: string) => item.trim())
      .filter(Boolean);
    const extraFiles = uploaded?.gallery ?? [];
    assertGalleryLimit(keepGallery.length + (uploaded?.image?.[0] ? 1 : 0) + extraFiles.length);
    const extra = await uploadManyToCloudinary(extraFiles, "store");
    const cover = await uploadToCloudinary(uploaded?.image?.[0], "store");
    const nextImage = cover?.linkUrl ?? "";
    const extraUrls = extra.map((item) => item.linkUrl);
    const image = nextImage || keepGallery[0] || (current.image as string);
    const gallery = [...(nextImage ? [nextImage, ...keepGallery] : keepGallery), ...extraUrls].filter(
      (item, index, list) => item && list.indexOf(item) === index,
    );
    assertGalleryLimit(gallery.length);
    if (!image || !gallery.length) {
      res.status(400).json({ error: "A product image is required" });
      return;
    }

    current.set({ ...fields, slug: current.slug, image, gallery });
    await current.save();
    res.json({ product: serializeProduct(current.toObject()) });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update product" });
  }
});

productRouter.delete("/:slug", requireAdmin, async (req, res) => {
  const deleted = await Product.findOneAndDelete({ slug: routeParam(req.params.slug) });
  if (!deleted) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ok: true });
});
