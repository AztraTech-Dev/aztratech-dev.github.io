import ArticleHeader from "../../components/editorial/ArticleHeader";
import ArticleServiceBridge from "../../components/editorial/ArticleServiceBridge";
import ArticleSources from "../../components/editorial/ArticleSources";
import AssetLifecycleModel from "../../components/diagrams/AssetLifecycleModel";
import Container from "../../components/ui/Container";
import { siteConfig } from "../../../lib/site-config";

const sources = [
  {
    label: "Assets API",
    publisher: "Tokeny Docs",
    href: "https://docs.tokeny.com/docs/assets-apis-copy",
  },
  {
    label: "Asset-Agnostic Tokenization Platform",
    publisher: "Taurus-CAPITAL",
    href: "https://www.taurushq.com/capital/",
  },
] as const;

export default function RwaAssetLifecycleArticle() {
  return (
    <main id="main-content" className="article-page">
      <ArticleHeader
        category="RWA & Tokenization"
        title="Token Issuance Is One Event. The Asset Lifecycle Is the System."
        lead="The smart contract matters, but it is only one component of the product. Much of the difficult work sits in the lifecycle around it."
      />

      <article className="article-body">
        <Container variant="editorial">
          <p className="article-body__opening">
            Deploying a token creates an on-chain object. The product still has to onboard participants, decide eligibility, record ownership, control transfers, service the asset, handle exceptions and support an exit path. Those decisions continue after the issuance transaction is finished.
          </p>

          <section className="article-section">
            <h2>Issuance is usually the simplest part of the lifecycle.</h2>
            <p>
              A tokenized asset product has to coordinate several representations of the same underlying relationship. There may be investor identity and eligibility data, a legal record, an on-chain token balance, servicing data and operational records. The product has to define which of those records answers which question.
            </p>
            <p>
              Public tokenization platforms expose the same reality. Tokeny’s APIs cover investor eligibility, ownership, compliance rules and transfer behavior in addition to token deployment. Taurus describes issuance together with lifecycle management and asset servicing. These are provider implementations, but they make the broader system boundary visible.
            </p>
          </section>
        </Container>

        <Container variant="wide" className="article-wide">
          <AssetLifecycleModel />
        </Container>

        <Container variant="editorial">
          <section className="article-section">
            <h2>Eligibility is a system decision, not a wallet property.</h2>
            <p>
              A wallet address does not by itself explain whether an investor is allowed to receive an asset. Eligibility can depend on identity, jurisdiction, investor classification, product rules and decisions made by qualified legal or compliance specialists.
            </p>
            <p>
              Engineering turns those agreed requirements into technical behavior. That can include onboarding state, qualification records, transfer checks, approval paths and exception handling. The legal interpretation remains outside the engineering role, but the system still needs an explicit way to enforce the resulting rules.
            </p>
          </section>

          <section className="article-section">
            <h2>A technically valid transfer may still be a transfer the product should reject.</h2>
            <p>
              Token standards can allow a transfer while the product has additional conditions to satisfy. Tokeny documents conditional transfers, whitelisting and limits as examples of controls around token movement. The important architectural decision is not which vendor feature to copy. It is where the product defines transfer authority and how every execution path respects it.
            </p>
            <p>
              A bypass path is especially dangerous when administrative tools, direct contract calls and application workflows do not share the same control model. Transfer rules should be visible before an exception forces the team to discover which path is authoritative.
            </p>
          </section>

          <section className="article-section">
            <h2>The product needs one clear answer to a simple question: who owns the asset?</h2>
            <p>
              There is no universal answer that applies to every tokenized asset or jurisdiction. In one product, an on-chain balance may be the operational ownership record. In another, a legal register, transfer agent record or other off-chain system may carry authority for a particular decision.
            </p>
            <p>
              The engineering job is to make that authority explicit. The product should know which record answers ownership, eligibility, servicing and reporting questions, how those records stay synchronized and what happens when they do not agree.
            </p>
          </section>

          <section className="article-section">
            <h2>An asset continues to create work after issuance.</h2>
            <p>
              Servicing can include reporting, distributions, corporate actions, changes to investor data, corrections and transfer restrictions. Taurus describes tokenization as issuance and servicing across the asset lifecycle rather than as a one-time deployment step. That operating model is closer to the real engineering problem.
            </p>
            <p>
              The lifecycle also needs an exit path. Redemption, burn or another agreed terminal state should be designed before the first token is issued. Otherwise the product can be technically capable of creating an asset without having a controlled way to finish its lifecycle.
            </p>
          </section>

          <section className="article-section article-section--closing">
            <h2>The token is one component. The lifecycle is the product.</h2>
            <p>
              A durable tokenization architecture connects identity, eligibility, ownership, transfers, servicing and redemption into one operating model. The on-chain and off-chain boundary can vary. What should not vary is whether the product knows where each decision belongs.
            </p>
          </section>

          <ArticleServiceBridge
            eyebrow="RWA Tokenization"
            title="Define the lifecycle before issuance becomes the architecture."
            body="AztraTech can work on asset lifecycle design, ownership state, transfer controls and the boundary between on-chain and off-chain systems."
            serviceHref={siteConfig.routes.rwa}
            serviceLabel="View RWA Tokenization"
            callHref={siteConfig.calendlyUrl}
          />

          <ArticleSources sources={sources} />
        </Container>
      </article>
    </main>
  );
}
