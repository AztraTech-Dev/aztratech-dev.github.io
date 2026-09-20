import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export const DEFAULT_TITLE = "Web3 & Fintech Infrastructure Engineering | AztraTech";
export const DEFAULT_DESCRIPTION =
  "AztraTech designs and builds infrastructure for stablecoin payments, RWA tokenization and Web3 security engineering across fintech products.";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "AztraTech Web3 and fintech infrastructure engineering",
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
  openGraphType?: "website" | "article";
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ArticleJsonLdInput = {
  headline: string;
  description: string;
  path: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  openGraphType = "website",
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: {
      index,
      follow: true,
    },
    openGraph: {
      type: openGraphType,
      locale: "en_US",
      siteName: siteConfig.name,
      url: canonical,
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd({
  headline,
  description,
  path,
}: ArticleJsonLdInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    author: {
      "@type": "Person",
      name: "Vladislav Usichenko",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-icon.png"),
      },
    },
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
  };
}

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-icon.png"),
      },
      description: DEFAULT_DESCRIPTION,
      founder: {
        "@type": "Person",
        name: "Vladislav Usichenko",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      publisher: {
        "@id": `${siteConfig.siteUrl}/#organization`,
      },
    },
  ],
};
