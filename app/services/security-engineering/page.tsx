import ThreatControlReview from "../../components/artifacts/ThreatControlReview";
import ServiceBoundary from "../../components/commercial/ServiceBoundary";
import ServicePageHero from "../../components/commercial/ServicePageHero";
import SecurityDeliveryLifecycle from "../../components/diagrams/SecurityDeliveryLifecycle";
import ThreatControlModel from "../../components/diagrams/ThreatControlModel";
import CTASection from "../../components/ui/CTASection";
import Container from "../../components/ui/Container";
import SectionIntro from "../../components/ui/SectionIntro";
import { siteConfig } from "../../../lib/site-config";
import JsonLd from "../../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Web3 Security Engineering | AztraTech",
  description:
    "Web3 security engineering with security-by-design across architecture, threat modeling, secure delivery, remediation and external review readiness.",
  path: "/services/security-engineering",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Web3 Security Engineering", path: "/services/security-engineering" },
]);

const architectureRisks = [
  {
    title: "Trust boundaries are implicit",
    body: "Sensitive operations cross services, wallets, provider APIs or administrative paths without one clear model of who can do what.",
  },
  {
    title: "Controls exist only as conventions",
    body: "The team knows an action should require approval, but the architecture does not enforce that requirement at the execution boundary.",
  },
  {
    title: "Recovery is designed after failure",
    body: "Key rotation, emergency actions, incident ownership and rollback paths are left undefined until the system is already under pressure.",
  },
] as const;

const developmentControls = [
  "Turn threat-model findings into explicit engineering requirements.",
  "Attach sensitive changes to tests, approvals and deployment conditions.",
  "Keep privileged paths and configuration changes visible during review.",
  "Record remediation decisions so the same issue does not return through another path.",
] as const;

export default function SecurityEngineeringPage() {
  return (
    <main id="main-content" className="service-detail-page">
      <JsonLd data={breadcrumbJsonLd} />
      <ServicePageHero
        eyebrow="Web3 Security"
        title="Build security into the system before it becomes a release problem."
        lead="Security-by-design for Web3 and fintech systems means treating architecture, trust boundaries, privileged paths and operational controls as engineering decisions before the final review. AztraTech works inside the delivery lifecycle to make those decisions concrete."
        signals={["Security architecture", "Threat modeling", "Secure delivery", "Remediation & readiness"]}
      />

      <section className="service-section">
        <Container>
          <SectionIntro
            eyebrow="Architecture first"
            title="A late security review often finds architecture problems, not just code problems."
            body={
              <p>
                A secure function can still sit inside a system with an unsafe administrative
                path, unclear trust boundary or weak recovery model. Those problems are cheaper
                to address before implementation and release decisions harden around them.
              </p>
            }
          />
          <div className="service-feature-grid service-feature-grid--three">
            {architectureRisks.map((risk, index) => (
              <article className="service-feature-card" key={risk.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{risk.title}</h3>
                <p>{risk.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Delivery lifecycle"
            title="Security has to survive design, build, release and operation."
            body={
              <p>
                Risk, controls and evidence should move with the system as it changes. A
                release gate is useful only when the team already knows which conditions matter
                and how those conditions are verified.
              </p>
            }
          />
          <SecurityDeliveryLifecycle />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <div className="service-section__split service-section__split--diagram">
            <SectionIntro
              eyebrow="Threat modeling"
              title="Threat modeling should happen before the review."
              body={
                <p>
                  Start with assets, trust boundaries, privileged paths and dependencies. Then
                  identify realistic failure or abuse paths and design controls around the risks
                  that matter to this system.
                </p>
              }
            />
            <ThreatControlModel />
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <ServiceBoundary
            eyebrow="Secure development"
            title="Security requirements need to make it into the development process."
            body={
              <p>
                A threat model is useful only when its findings affect design, implementation,
                testing and release. The engineering workflow should make the important controls
                visible where changes are actually made.
              </p>
            }
            items={developmentControls}
          />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <div className="service-section__split service-section__split--artifact">
            <div>
              <SectionIntro
                eyebrow="Release and incident readiness"
                title="Some changes should require more than a successful build."
                body={
                  <p>
                    Sensitive changes can require additional review, evidence, approval or
                    operational preparation. The first security incident should not be the first
                    time the team discusses what to do.
                  </p>
                }
              />
              <div className="service-inline-note">
                <span>READINESS</span>
                <p>
                  Release conditions, remediation ownership and incident procedures can be made
                  explicit without pretending that engineering work is an independent audit.
                </p>
              </div>
            </div>
            <ThreatControlReview />
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <ServiceBoundary
            eyebrow="Assurance boundary"
            title="Independent assurance should stay independent."
            body={
              <p>
                AztraTech can design controls, review architecture, remediate findings and help
                a team prepare technical material for an external review. We do not present our
                own implementation work as an independent audit or certification.
              </p>
            }
            items={[
              "Architecture and threat-model work can happen before an external review.",
              "Remediation can address findings from internal or independent reviewers.",
              "Independent audit, certification and authoritative compliance opinions stay with independent qualified parties.",
            ]}
          />
        </Container>
      </section>

      <CTASection
        heading="Bring the security decision before it becomes a release blocker."
        body="We can start with architecture, a threat model, a sensitive change, remediation work or readiness for an external review."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="View all services"
        secondaryHref={siteConfig.routes.services}
      />
    </main>
  );
}
