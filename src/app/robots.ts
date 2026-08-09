import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://carex.auto";

// Only allow indexing on production; preview deployments stay noindex.
const isProduction = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
