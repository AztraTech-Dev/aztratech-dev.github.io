# AztraTech Website V2

Production website for AztraTech, a technical partner focused on Web3 and fintech infrastructure.

Production:
https://aztra.tech

## Core Areas

- Stablecoin Payment Rails
- RWA Tokenization
- Web3 Security Engineering

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Static export
- GitHub Pages
- GitHub Actions

## Local Development

Requirements:
- Node.js 20+
- npm

Commands:

```bash
npm ci
npm run dev
```

Local development URL: http://localhost:3000

## Quality Gates

- `npm run copy:check` — validates public-copy constraints
- `npm run lint` — runs ESLint
- `npm run build` — creates the static Next.js export
- `npm run site:check` — validates the generated static output
- `npm audit` — checks dependency vulnerabilities

## Production Build

`next.config.ts` uses static export. Production output is generated into:

```
out/
```

This output is static and is served directly by GitHub Pages; it does not run on a Node server.

## Deployment

- Production branch: `main`
- A push to `main` triggers `.github/workflows/deploy.yml`
- The workflow runs, in order:
  - `npm ci`
  - `npm run copy:check`
  - `npm run lint`
  - `npm run build`
  - `npm run site:check`
- The resulting `./out` directory is uploaded and deployed through GitHub Pages
- Production custom domain: https://aztra.tech

## SEO & Indexing

- Robots: https://aztra.tech/robots.txt
- Sitemap: https://aztra.tech/sitemap.xml
- A Google Search Console Domain property is configured for aztra.tech
- The sitemap is submitted to Search Console
- The Privacy page intentionally uses `noindex, follow`

## Privacy & Measurement

The production site currently does not add:
- website analytics
- advertising pixels
- marketing cookies
- embedded CRM forms
- newsletter tracking

External services such as GitHub Pages and Calendly operate under their own policies.

Any future analytics, CRM, tracking, or embedded form integration must be reviewed together with the Privacy Notice before release.

## Repository Notes

- Public website language is English.
- Core production changes should pass all quality gates before being merged to `main`.
- Do not publish unsupported client claims, performance figures, certifications, or operational capabilities.
- Technical diagrams and artifacts that are not client evidence are labelled as illustrative examples.
