import EngineeringProblems from "../components/commercial/EngineeringProblems";
import ServicePaths from "../components/commercial/ServicePaths";
import ButtonLink from "../components/ui/ButtonLink";
import CTASection from "../components/ui/CTASection";
import Container from "../components/ui/Container";
import SectionIntro from "../components/ui/SectionIntro";
import { siteConfig } from "../../lib/site-config";
import JsonLd from "../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Web3 & Fintech Engineering Services | AztraTech",
  description:
    "Engineering services for stablecoin payment rails, RWA tokenization and Web3 security, scoped around the system, integrations and operational requirements.",
  path: "/services",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

const technologyAreas = [
  {
    title: "Smart contracts and blockchain integrations",
    body: "Use on-chain components where they carry a clear system responsibility, then define how they interact with the rest of the product.",
  },
  {
    title: "Backend services, APIs and databases",
    body: "Keep product state, provider translation, workflow logic and operational records explicit outside the chain when that is where they belong.",
  },
  {
    title: "Cloud and operational infrastructure",
    body: "Design deployment, observability, access and recovery around the actual operating model rather than a generic reference stack.",
  },
  {
    title: "Frontend when the workflow needs it",
    body: "Build product and operations interfaces when they are part of the engineering scope, without treating the frontend as the architecture itself.",
  },
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content" className="service-index-page">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="service-index-hero">
        <Container variant="wide">
          <div className="service-index-hero__grid">
            <div>
              <p className="service-index-hero__eyebrow">Services</p>
              <h1>Engineering for stablecoin payments, tokenized assets and security-sensitive fintech systems.</h1>
            </div>
            <div className="service-index-hero__support">
              <p>
                AztraTech works on the infrastructure that coordinates product state,
                external providers, controls and operations. The scope can start with
                one difficult integration or extend across architecture and delivery.
              </p>
              <ButtonLink href={siteConfig.calendlyUrl}>
                Book a 30-minute discovery call
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Core services"
            title="Choose the problem area, then define the engineering scope around the system you already have."
            body={
              <p>
                These are not fixed packages. Each service describes a technical problem
                area and the system boundaries that usually need deliberate engineering.
              </p>
            }
          />
          <ServicePaths />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <div className="service-section__split">
            <SectionIntro
              eyebrow="Shared engineering problems"
              title="Different products often run into the same underlying engineering problems."
              body={
                <p>
                  Payment systems, tokenized assets and security-sensitive products use
                  different components, but many failures begin with unclear state,
                  leaky provider boundaries or operational paths that were never designed.
                </p>
              }
            />
            <EngineeringProblems />
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Technology"
            title="The technology depends on the system."
            body={
              <p>
                We do not force every engagement into one blockchain, cloud or framework.
                The stack follows the product, the existing architecture and the decision
                the team needs to make.
              </p>
            }
          />
          <div className="service-capability-grid">
            {technologyAreas.map((area, index) => (
              <article className="service-capability" key={area.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{area.title}</h2>
                <p>{area.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Start with the system, not a package."
        body="Bring the current architecture, the integration that is creating friction, or the decision that is still open."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="See how we work"
        secondaryHref={siteConfig.routes.howWeWork}
      />
    </main>
  );
}
