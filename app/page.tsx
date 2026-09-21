import ArchitectureDecisionPack from "./components/artifacts/ArchitectureDecisionPack";
import EngineeringProblems from "./components/commercial/EngineeringProblems";
import EngagementStart from "./components/commercial/EngagementStart";
import ServicePaths from "./components/commercial/ServicePaths";
import InfrastructureSystemMap from "./components/diagrams/InfrastructureSystemMap";
import SystemCoordinationModel from "./components/diagrams/SystemCoordinationModel";
import AztraTechInfrastructureCore from "./components/visuals/AztraTechInfrastructureCore";
import ButtonLink from "./components/ui/ButtonLink";
import CTASection from "./components/ui/CTASection";
import Container from "./components/ui/Container";
import SectionIntro from "./components/ui/SectionIntro";
import { siteConfig } from "../lib/site-config";
import JsonLd from "./components/seo/JsonLd";
import { buildMetadata, homeJsonLd } from "../lib/seo";

export const metadata = buildMetadata({
  title: "Web3 & Fintech Infrastructure Engineering | AztraTech",
  description:
    "AztraTech designs and builds infrastructure for stablecoin payments, RWA tokenization and Web3 security engineering across fintech products.",
  path: "/",
});

const insightTopics = [
  {
    category: "Stablecoin Payments",
    title: "When a Stablecoin Transfer Works but the Payment Still Doesn't",
  },
  {
    category: "RWA & Tokenization",
    title: "Token Issuance Is One Event. The Asset Lifecycle Is the System.",
  },
  {
    category: "Web3 Security",
    title:
      "Why Enterprise Security Reviews Expose Architecture Problems, Not Just Missing Documents",
  },
];

const faqItems = [
  {
    question: "When should we bring AztraTech into a project?",
    answer:
      "When a real technical decision is blocking progress. That can be early architecture, an integration problem, a security concern, or a system that is already in production and becoming difficult to operate.",
  },
  {
    question: "Do you replace payment, custody or infrastructure providers?",
    answer:
      "No. We design the system around the providers your product needs, define the boundaries between them and keep provider-specific logic from spreading through the rest of the product.",
  },
  {
    question: "Can you work with an existing engineering team?",
    answer:
      "Yes. The scope can be architecture and technical decisions, a specific delivery stream, remediation work, or continued engineering alongside the client's team.",
  },
  {
    question: "Do you provide legal or regulatory advice?",
    answer:
      "No. Legal and regulatory interpretation should come from the client's qualified specialists. We translate agreed requirements into technical rules, controls and system behavior within the engineering scope.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <JsonLd data={homeJsonLd} />
      <section className="home-hero">
        <Container variant="wide">
          <div className="home-hero__grid">
            <div className="home-hero__copy">
              <p className="home-hero__eyebrow">Web3 & Fintech Infrastructure Engineering</p>
              <h1>We build the infrastructure behind Web3 and fintech products.</h1>
              <p className="home-hero__lead">
                Stablecoin payments, tokenized assets and security-sensitive
                products get harder when they have to coordinate providers,
                internal state, controls and day-to-day operations. AztraTech
                designs and builds that infrastructure.
              </p>
              <div className="home-hero__actions">
                <ButtonLink href={siteConfig.calendlyUrl}>
                  Book a 30-minute discovery call
                </ButtonLink>
                <ButtonLink href="#services" variant="ghost">
                  See what we work on
                </ButtonLink>
              </div>
              <p className="home-hero__note">
                No sales presentation required. Start with the current system and what is blocked.
              </p>
            </div>

            <AztraTechInfrastructureCore />
          </div>
        </Container>
      </section>

      <section id="services" className="home-section home-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Where we usually help"
            title="Three areas where product complexity quickly becomes infrastructure complexity."
            body={
              <p>
                Each service starts with the system you already have. The work
                can be focused on one integration or span architecture,
                implementation and operational readiness.
              </p>
            }
          />
          <ServicePaths />
        </Container>
      </section>

      <section className="home-section">
        <Container>
          <div className="home-two-column home-two-column--problem">
            <SectionIntro
              eyebrow="What gets difficult in production"
              title="The transaction is only one part of the system."
              body={
                <p>
                  Products become difficult to operate when different systems
                  can describe the same payment, asset or permission in
                  different ways. The engineering problem is deciding which
                  state matters, how it changes and what happens when systems
                  disagree.
                </p>
              }
            />
            <EngineeringProblems />
          </div>
        </Container>
      </section>

      <section className="home-section home-section--surface">
        <Container>
          <div className="home-two-column home-two-column--system-map">
            <SectionIntro
              eyebrow="Infrastructure view"
              title="A production system has more than one source of state."
              body={
                <p>
                  The product, its providers and the networks underneath each
                  hold part of the record of what happened. Controls define
                  and enforce what is allowed, and operations has to reconcile
                  the differences. Architecture starts by deciding which record
                  is authoritative and where the others are checked against it.
                </p>
              }
            />
            <InfrastructureSystemMap />
          </div>
        </Container>
      </section>

      <section className="home-section home-section--surface">
        <Container>
          <SectionIntro
            eyebrow="System-level architecture"
            title="Keep product state, integrations and operations coordinated."
            body={
              <p>
                A useful architecture makes boundaries explicit. Product logic
                should not depend on terminology from every provider, and an
                external success response should not silently become the only
                record of what happened.
              </p>
            }
          />
          <SystemCoordinationModel />
        </Container>
      </section>

      <section className="home-section">
        <Container>
          <div className="home-two-column home-two-column--artifact">
            <div>
              <SectionIntro
                eyebrow="What the client gets"
                title="Decisions that can be implemented, reviewed and operated."
                body={
                  <p>
                    The output depends on the scope. Architecture work should
                    still leave the team with concrete decisions, boundaries
                    and unresolved questions, not a deck of generic advice.
                  </p>
                }
              />
              <div className="home-artifact-copy">
                <p>
                  We use lightweight technical artifacts to make important
                  decisions visible to engineering, product and operations.
                  These are working materials, not decorative deliverables.
                </p>
              </div>
            </div>
            <ArchitectureDecisionPack />
          </div>
        </Container>
      </section>

      <section className="home-section home-section--surface">
        <Container>
          <SectionIntro
            eyebrow="How an engagement starts"
            title="Start with what still needs a decision."
            body={
              <p>
                The first useful step depends on how much is already known.
                Discovery is not a disguised build proposal, and delivery does
                not need to restart work the team has already done.
              </p>
            }
          />
          <EngagementStart />
          <div className="home-section__link-row">
            <ButtonLink href={siteConfig.routes.howWeWork} variant="ghost">
              See how we work
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="home-section home-responsibility">
        <Container>
          <SectionIntro
            eyebrow="Responsibility"
            title="Clear ownership matters before delivery starts."
          />
          <div className="responsibility-grid">
            <article className="responsibility-card">
              <p className="responsibility-card__label">AztraTech owns</p>
              <h3>The technical outcome inside the agreed scope.</h3>
              <p>
                Architecture, implementation, integration behavior, technical
                controls and engineering decisions defined in the engagement.
              </p>
            </article>
            <article className="responsibility-card">
              <p className="responsibility-card__label">Client and specialists own</p>
              <h3>The business outcome and authoritative legal interpretation.</h3>
              <p>
                Product economics, commercial decisions and legal or regulatory
                conclusions remain with the client and its qualified advisers.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="home-section home-section--surface">
        <Container>
          <div className="home-section-heading-row">
            <SectionIntro
              eyebrow="Insights"
              title="Technical notes from the problems we work on."
              body={
                <p>
                  Practical writing on payment state, tokenized asset lifecycles
                  and security architecture.
                </p>
              }
            />
            <ButtonLink href={siteConfig.routes.insights} variant="ghost">
              View insights
            </ButtonLink>
          </div>
          <div className="insight-preview-grid">
            {insightTopics.map((item) => (
              <article className="insight-preview" key={item.title}>
                <p>{item.category}</p>
                <h3>{item.title}</h3>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section">
        <Container>
          <div className="home-two-column home-two-column--faq">
            <SectionIntro
              eyebrow="FAQ"
              title="A few things that are useful to settle early."
            />
            <div className="faq-list">
              {faqItems.map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Bring the technical problem."
        body="A 30-minute conversation is enough to understand the current state, what is blocked and whether there is a useful next step."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="How we work"
        secondaryHref={siteConfig.routes.howWeWork}
      />
    </main>
  );
}
