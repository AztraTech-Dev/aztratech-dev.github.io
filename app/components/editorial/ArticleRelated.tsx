import Link from "next/link";

type RelatedArticle = {
  category: string;
  title: string;
  href: string;
};

// The site currently has exactly three published articles. Listed here
// directly rather than shared from app/insights/page.tsx, consistent with
// how the same three-item set is already duplicated for the homepage
// preview -- not a recommendation engine, just the fixed current set.
const allArticles: readonly RelatedArticle[] = [
  {
    category: "Stablecoin Payments",
    title: "When a Stablecoin Transfer Works but the Payment Still Doesn't",
    href: "/insights/stablecoin-payment-state-reconciliation",
  },
  {
    category: "RWA & Tokenization",
    title: "Token Issuance Is One Event. The Asset Lifecycle Is the System.",
    href: "/insights/rwa-tokenization-asset-lifecycle",
  },
  {
    category: "Web3 Security",
    title: "Why Enterprise Security Reviews Expose Architecture Problems, Not Just Missing Documents",
    href: "/insights/security-reviews-architecture-problems",
  },
] as const;

type ArticleRelatedProps = {
  currentHref: string;
};

/** Restrained "read next" links to the other existing articles, so a
 * reader who finishes one piece has somewhere to go besides the commercial
 * CTA or the browser back button. */
export default function ArticleRelated({ currentHref }: ArticleRelatedProps) {
  const related = allArticles.filter((article) => article.href !== currentHref);

  if (related.length === 0) return null;

  return (
    <section className="article-related" aria-labelledby="article-related-heading">
      <h2 id="article-related-heading">More insights</h2>
      <div className="article-related__list">
        {related.map((article) => (
          <Link className="article-related__item" href={article.href} key={article.href}>
            <span>{article.category}</span>
            <strong>{article.title}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
