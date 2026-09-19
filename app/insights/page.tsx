import Link from "next/link";
import Container from "../components/ui/Container";
import CTASection from "../components/ui/CTASection";
import { siteConfig } from "../../lib/site-config";

const articles = [
  {
    category: "Stablecoin Payments",
    title: "When a Stablecoin Transfer Works but the Payment Still Doesn't",
    summary:
      "A successful on-chain transfer can still leave product state, provider state, settlement and operational records out of agreement.",
    href: "/insights/stablecoin-payment-state-reconciliation",
  },
  {
    category: "RWA & Tokenization",
    title: "Token Issuance Is One Event. The Asset Lifecycle Is the System.",
    summary:
      "The difficult part of a tokenized asset product often sits around eligibility, ownership, transfers, servicing and redemption after issuance.",
    href: "/insights/rwa-tokenization-asset-lifecycle",
  },
  {
    category: "Security Engineering",
    title: "Why Enterprise Security Reviews Expose Architecture Problems, Not Just Missing Documents",
    summary:
      "Late reviews frequently surface unclear trust boundaries, privileged paths and control ownership that documentation alone cannot fix.",
    href: "/insights/security-reviews-architecture-problems",
  },
] as const;

export default function InsightsPage() {
  return (
    <main id="main-content" className="insights-index-page">
      <section className="insights-index-hero">
        <Container variant="wide">
          <div className="insights-index-hero__grid">
            <div>
              <p className="insights-index-hero__eyebrow">Insights</p>
              <h1>Technical notes on stablecoin payments, tokenized assets and Web3 security.</h1>
            </div>
            <div className="insights-index-hero__support">
              <p>
                Practical writing on system state, integrations, controls and the operational decisions that appear when Web3 and fintech products move beyond the first technical proof.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="insights-index-section">
        <Container>
          <div className="insights-index-heading">
            <p>Launch collection</p>
            <h2>Three recurring infrastructure problems.</h2>
          </div>
          <div className="insights-card-grid">
            {articles.map((article, index) => (
              <article className="insights-card" key={article.href}>
                <div className="insights-card__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{article.category}</p>
                </div>
                <h2>
                  <Link href={article.href}>{article.title}</Link>
                </h2>
                <p>{article.summary}</p>
                <Link className="insights-card__link" href={article.href}>
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Bring the technical question that is still open."
        body="The first conversation can start with one payment flow, asset lifecycle, security boundary or architecture decision."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="View services"
        secondaryHref={siteConfig.routes.services}
      />
    </main>
  );
}
