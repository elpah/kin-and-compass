import { AddToCart } from "@/components/AddToCart";
import { MediaImage } from "@/components/CloudinaryImage";
import { ProductCard } from "@/components/ProductCard";
import { getProductBySlug } from "@/lib/api";
import { asset } from "@/lib/media";
import { formatMoney } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  return { title: data?.product.name ?? "Product" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();
  const { product, related } = data;

  return (
    <article className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6">
      <p className="text-sm text-muted">
        <Link href="/store" className="hover:text-burgundy">
          Store
        </Link>{" "}
        / {product.category}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          {product.gallery.map((src, index) => (
            <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sand">
              <MediaImage
                src={asset(src)}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={70}
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-crimson">
            {[product.vendor, product.country].filter(Boolean).join(" · ")}
          </p>
          <h1 className="display mt-2 text-4xl text-burgundy sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold">
            {formatMoney(product.price)}
            {product.compareAt && (
              <span className="ml-2 text-base text-muted line-through">
                {formatMoney(product.compareAt)}
              </span>
            )}
          </p>
          <p className="mt-2 text-sm text-muted">
            ★ {product.rating} · {product.reviewCount} reviews · {product.stock} in stock
          </p>
          <p className="mt-6 leading-relaxed text-ink/80">{product.description}</p>
          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted">
            {product.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="mt-8">
            <AddToCart product={product} />
          </div>
          <p className="mt-4 text-xs text-muted">
            Secure checkout · Order tracking from your account · Vendors across Africa welcome.
          </p>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="display text-3xl text-burgundy">Reviews</h2>
          <div className="mt-6 space-y-4">
            {product.reviews.map((r) => (
              <blockquote key={r.author} className="rounded-lg bg-white p-5 ring-1 ring-sand">
                <p className="text-sm font-semibold text-burgundy">
                  {r.author} · {"★".repeat(r.rating)} · {r.date}
                </p>
                <p className="mt-2 text-sm text-muted">{r.text}</p>
              </blockquote>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="display text-3xl text-burgundy">Also from this aisle</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
