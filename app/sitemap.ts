import type { MetadataRoute } from "next";
import { absoluteUrl } from "../lib/seo";

export const dynamic = "force-static";

const indexedRoutes = [
  "/",
  "/services",
  "/services/stablecoin-payment-rails",
  "/services/rwa-tokenization",
  "/services/security-engineering",
  "/how-we-work",
  "/about",
  "/contact",
  "/insights",
  "/insights/stablecoin-payment-state-reconciliation",
  "/insights/rwa-tokenization-asset-lifecycle",
  "/insights/security-reviews-architecture-problems",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return indexedRoutes.map((path) => ({
    url: absoluteUrl(path),
  }));
}
