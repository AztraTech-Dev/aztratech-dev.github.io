import ArchitectureDiagnosticOutput from "../components/artifacts/ArchitectureDiagnosticOutput";
import EngagementDecisionModel from "../components/diagrams/EngagementDecisionModel";
import ButtonLink from "../components/ui/ButtonLink";
import CTASection from "../components/ui/CTASection";
import Container from "../components/ui/Container";
import SectionIntro from "../components/ui/SectionIntro";
import { siteConfig } from "../../lib/site-config";

const entryPaths = [
  {
    index: "01",
    title: "Product & Technical Discovery",
    body: "Use this when the product, workflow or technical problem is still under-defined. The work can cover problem framing, system flows, technical feasibility and the decisions needed before delivery.",
    signal: "Product or workflow uncertainty",
  },
  {
    index: "02",
    title: "Architecture & Diagnostic",
    body: "Use this when a system already exists but architecture, integration boundaries, state ownership or operational paths need a focused technical review.",
    signal: "Architecture or integration uncertainty",
  },
  {
    index: "03",
    title: "Technical Delivery",
    body: "Use this when the problem and scope are sufficiently clear to build. Delivery can cover the agreed system boundary rather than forcing a separate discovery phase first.",
    signal: "Ready to build",
  },
  {
    index: "04",
    title: "Scale & Continued Engineering",
    body: "Use this when a live system benefits from retained technical context across new providers, controls, operating requirements or the next delivery scope.",
    signal: "Live system with continuing change",
  },
] as const;

const responsibilities = [
  {
    label: "CLIENT",
    title: "Business vision and outcome",
    body: "The client owns the commercial objective, product priorities and business decisions around the engagement.",
  },
  {
    label: "AZTRATECH",
    title: "Agreed technical scope",
    body: "AztraTech owns the quality and execution of the technical work that sits inside the agreed scope.",
  },
  {
    label: "SHARED",
    title: "Requirements and trade-offs",
    body: "Some decisions require both business context and engineering judgment. Those trade-offs should be explicit rather than hidden inside implementation.",
  },
] as const;

export default function HowWeWorkPage() {
  return (
    <main id="main-content" className="supporting-page how-we-work-page">
      <section className="supporting-hero supporting-hero--how-we-work">
        <Container variant="wide">
          <div className="supporting-hero__grid">
            <div className="supporting-hero__copy">
              <p className="supporting-hero__eyebrow">How We Work</p>
              <h1>Start with what still needs a decision.</h1>
              <p className="supporting-hero__lead">
                A technical engagement should begin at the point of real uncertainty. If the product is already clear, do not buy discovery again. If the architecture is still unclear, do not rush into a larger build.
              </p>
              <div className="supporting-hero__actions">
                <ButtonLink href={siteConfig.calendlyUrl}>Book a 30-minute discovery call</ButtonLink>
                <ButtonLink href={siteConfig.routes.services} variant="ghost">View services</ButtonLink>
              </div>
            </div>
            <aside className="supporting-hero__aside" aria-label="Engagement principles">
              <span>ENGAGEMENT PRINCIPLES</span>
              <div>
                <p><strong>01</strong> Start from the current state</p>
                <p><strong>02</strong> Make open decisions visible</p>
                <p><strong>03</strong> Commit in stages when uncertainty is material</p>
                <p><strong>04</strong> Keep responsibility explicit</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Entry points"
            title="The engagement type follows the problem that is still open."
            body={<p>These are entry paths, not fixed packages. A project can start later in the sequence when earlier decisions are already sound.</p>}
          />
          <div className="engagement-entry-grid">
            {entryPaths.map((path) => (
              <article className="engagement-entry-card" key={path.title}>
                <div className="engagement-entry-card__top"><span>{path.index}</span><small>{path.signal}</small></div>
                <h2>{path.title}</h2>
                <p>{path.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <div className="supporting-call-boundary">
            <div>
              <p className="supporting-kicker">30-MINUTE DISCOVERY CALL</p>
              <h2>The first call establishes context and fit.</h2>
              <p>We discuss the current state, the blocker, what is already known and whether there is a useful next step.</p>
            </div>
            <div>
              <p className="supporting-kicker">PRODUCT &amp; TECHNICAL DISCOVERY</p>
              <h2>A discovery engagement is actual project work.</h2>
              <p>When the product or technical problem needs definition, that work has a scope, deliverables and the specialists required to do it properly.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <div className="supporting-split supporting-split--diagram">
            <SectionIntro
              eyebrow="Decision model"
              title="Larger spend should follow sufficient clarity."
              body={<p>A diagnostic is useful when it changes a decision. Build, revise or stop can all be valid outcomes if they reduce technical and commercial uncertainty before delivery.</p>}
            />
            <EngagementDecisionModel />
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <div className="supporting-split supporting-split--artifact">
            <div>
              <SectionIntro
                eyebrow="Tangible output"
                title="Discovery and diagnostic work should leave implementation material behind."
                body={<p>The exact output depends on scope, but the work should make decisions, boundaries and unresolved risks easier for the delivery team to use.</p>}
              />
              <div className="supporting-inline-note">
                <span>EXAMPLES</span>
                <p>Target architecture, system or integration maps, assumptions, technical risks, prioritized decisions, backlog and a recommended next scope.</p>
              </div>
            </div>
            <ArchitectureDiagnosticOutput />
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <SectionIntro eyebrow="Responsibility" title="Clear ownership makes technical delivery easier to buy and easier to run." />
          <div className="responsibility-model-grid">
            {responsibilities.map((item) => (
              <article key={item.label} className="responsibility-model-card">
                <span>{item.label}</span>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <div className="continuity-note">
            <span>CONTINUED ENGINEERING</span>
            <p>Ongoing work is useful when retained technical context creates more value than rebuilding that context with a new team. It does not automatically imply 24/7 operations or an SLA.</p>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Start with the decision that is still open."
        body="Bring the current system, the blocker and the context you already have. The first call is for fit and next-step clarity, not a free architecture workshop."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="View services"
        secondaryHref={siteConfig.routes.services}
      />
    </main>
  );
}
