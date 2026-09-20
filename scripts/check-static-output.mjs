import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, resolve } from "node:path";

const OUT = resolve("out");
const SITE = "https://aztra.tech";

const indexableRoutes = [
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
];

const publicRoutes = [...indexableRoutes, "/privacy"];
const outputFiles = new Map([
  ["/", "index.html"],
  ["/services", "services.html"],
  ["/services/stablecoin-payment-rails", "services/stablecoin-payment-rails.html"],
  ["/services/rwa-tokenization", "services/rwa-tokenization.html"],
  ["/services/security-engineering", "services/security-engineering.html"],
  ["/how-we-work", "how-we-work.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/insights", "insights.html"],
  [
    "/insights/stablecoin-payment-state-reconciliation",
    "insights/stablecoin-payment-state-reconciliation.html",
  ],
  [
    "/insights/rwa-tokenization-asset-lifecycle",
    "insights/rwa-tokenization-asset-lifecycle.html",
  ],
  [
    "/insights/security-reviews-architecture-problems",
    "insights/security-reviews-architecture-problems.html",
  ],
  ["/privacy", "privacy.html"],
]);

const errors = [];

function fail(message) {
  errors.push(message);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function normalizeRoute(pathname) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

for (const [route, file] of outputFiles) {
  if (!(await exists(join(OUT, file)))) {
    fail(`Missing generated page for ${route}: out/${file}`);
  }
}

for (const required of [
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "CNAME",
  ".nojekyll",
  "og-image.png",
]) {
  if (!(await exists(join(OUT, required)))) {
    fail(`Missing generated file: out/${required}`);
  }
}

const cname = (await readFile(join(OUT, "CNAME"), "utf8")).trim();
if (cname !== "aztra.tech") {
  fail(`Unexpected CNAME value: ${cname}`);
}

const robots = await readFile(join(OUT, "robots.txt"), "utf8");
if (!/User-Agent:\s*\*/i.test(robots) || !/Allow:\s*\//i.test(robots)) {
  fail("robots.txt does not allow normal crawling.");
}
if (!robots.includes(`${SITE}/sitemap.xml`)) {
  fail("robots.txt does not reference the production sitemap.");
}

const sitemap = await readFile(join(OUT, "sitemap.xml"), "utf8");
const sitemapUrls = [
  ...sitemap.matchAll(/<loc>(.*?)<\/loc>/g),
].map((match) => match[1]);
const expectedSitemapUrls = indexableRoutes.map((route) =>
  route === "/" ? `${SITE}/` : `${SITE}${route}`,
);

for (const url of expectedSitemapUrls) {
  if (!sitemapUrls.includes(url)) {
    fail(`Sitemap is missing ${url}`);
  }
}
for (const url of sitemapUrls) {
  if (!expectedSitemapUrls.includes(url)) {
    fail(`Unexpected sitemap URL: ${url}`);
  }
}
if (sitemapUrls.includes(`${SITE}/privacy`)) {
  fail("Privacy is noindex and must not appear in sitemap.xml.");
}

const privacyHtml = await readFile(join(OUT, "privacy.html"), "utf8");
for (const stalePhrase of [
  "Pre-launch data notice",
  "LAUNCH GATE",
  "not a substitute for the final legal privacy policy",
]) {
  if (privacyHtml.includes(stalePhrase)) {
    fail(`Privacy page still contains pre-launch copy: ${stalePhrase}`);
  }
}
if (!privacyHtml.includes("ФОП Владислав Усиченко")) {
  fail("Privacy page does not identify the confirmed controller.");
}
if (!/name="robots" content="[^"]*noindex/i.test(privacyHtml)) {
  fail("Privacy page is expected to remain noindex.");
}

const notFoundHtml = await readFile(join(OUT, "404.html"), "utf8");
if (!notFoundHtml.includes("<title>Page Not Found | AztraTech</title>")) {
  fail("404 page does not have explicit Page Not Found metadata.");
}
if (!/name="robots" content="[^"]*noindex/i.test(notFoundHtml)) {
  fail("404 page is missing noindex metadata.");
}

const og = await readFile(join(OUT, "og-image.png"));
const pngSignature = "89504e470d0a1a0a";
if (og.subarray(0, 8).toString("hex") !== pngSignature) {
  fail("og-image.png is not a valid PNG file.");
} else {
  const width = og.readUInt32BE(16);
  const height = og.readUInt32BE(20);
  if (width !== 1200 || height !== 630) {
    fail(`Unexpected OG dimensions: ${width}x${height}`);
  }
}

for (const starterAsset of [
  "file.svg",
  "globe.svg",
  "next.svg",
  "vercel.svg",
  "window.svg",
]) {
  if (await exists(join(OUT, starterAsset))) {
    fail(`Unused starter asset is still exported: ${starterAsset}`);
  }
}

const knownRoutes = new Set(publicRoutes);

async function collectHtmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(fullPath)));
    } else if (entry.isFile() && extname(entry.name) === ".html") {
      files.push(fullPath);
    }
  }
  return files;
}

for (const htmlPath of await collectHtmlFiles(OUT)) {
  const source = await readFile(htmlPath, "utf8");
  if (/localhost|127\.0\.0\.1/i.test(source)) {
    fail(`Development URL found in ${htmlPath.replace(`${OUT}/`, "out/")}`);
  }

  const hrefs = [...source.matchAll(/href="([^"]+)"/g)].map(
    (match) => match[1],
  );

  for (const href of hrefs) {
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }

    let url;
    try {
      url = new URL(href, SITE);
    } catch {
      fail(`Invalid href in ${htmlPath}: ${href}`);
      continue;
    }

    if (url.origin !== SITE) continue;

    const pathname = decodeURIComponent(url.pathname);
    const route = normalizeRoute(pathname);
    if (knownRoutes.has(route)) continue;

    const assetPath = join(OUT, pathname.replace(/^\/+/, ""));
    if (await exists(assetPath)) continue;

    fail(`Broken internal href in ${htmlPath.replace(`${OUT}/`, "out/")}: ${href}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

console.log("Static output check passed.");
