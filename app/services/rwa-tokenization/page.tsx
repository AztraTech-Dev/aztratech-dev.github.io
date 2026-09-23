import AssetLifecycleTransferControlModel from "../../components/artifacts/AssetLifecycleTransferControlModel";
import ServiceBoundary from "../../components/commercial/ServiceBoundary";
import ServicePageHero from "../../components/commercial/ServicePageHero";
import AssetLifecycleModel from "../../components/diagrams/AssetLifecycleModel";
import AssetStateAuthorityModel from "../../components/diagrams/AssetStateAuthorityModel";
import CTASection from "../../components/ui/CTASection";
import Container from "../../components/ui/Container";
import SectionIntro from "../../components/ui/SectionIntro";
import { siteConfig } from "../../../lib/site-config";
import JsonLd from "../../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "RWA Tokenization Engineering | AztraTech",
  description:
    "Engineering for tokenized asset products across investor eligibility, ownership state, transfer controls, servicing, redemption and system boundaries.",
  path: "/services/rwa-tokenization",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "RWA Tokenization", path: "/services/rwa-tokenization" },
]);

const transferChecks = [
  {
    title: "Eligibility",
    body: "Determine which verified product state and external requirements must be satisfied before the action can continue.",
  },
  {
    title: "Permissions",
    body: "Define which actor can initiate, approve, block or recover a sensitive lifecycle action.",
  },
  {
    title: "State transition",
    body: "Keep on-chain and off-chain records coordinated when a transfer changes ownership, servicing or operational state.",
  },
] as const;

export default function RwaTokenizationPage() {
  return (
    <main id="main-content" className="service-detail-page">
      <JsonLd data={breadcrumbJsonLd} />
      <ServicePageHero
        eyebrow="RWA Tokenization"
        title="Build a tokenized asset product that can operate after issuance."
        lead="The smart contract matters, but it is only one component of the product. Much of the difficult work sits in the lifecycle around investor eligibility, ownership, transfers, servicing, redemption and the boundary between on-chain and off-chain state."
        signals={["Asset lifecycle", "Ownership state", "Transfer controls", "On-chain / off-chain boundaries"]}
      />

      <section className="service-section">
        <Container>
          <SectionIntro
            eyebrow="Lifecycle"
            title="Issuance is usually the simplest part of the lifecycle."
            body={
              <p>
                Deploying a token creates an on-chain object. The product still needs to
                onboard participants, decide eligibility, manage ownership and transfers,
                service the asset, support redemption and maintain operational records.
              </p>
            }
          />
          <AssetLifecycleModel />
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="After issuance"
            title="The system has to keep working long after the token exists."
            body={
              <p>
                Every lifecycle event can touch identity, permissions, product records,
                smart contracts and external operators. The architecture needs to define
                those interactions before they become manual exceptions.
              </p>
            }
          />
          <div className="service-feature-grid service-feature-grid--three">
            <article className="service-feature-card">
              <span>01</span>
              <div>
                <h3>Participant state</h3>
                <p>Qualification, identity references, permissions and account relationships change over time.</p>
              </div>
            </article>
            <article className="service-feature-card">
              <span>02</span>
              <div>
                <h3>Asset operations</h3>
                <p>Corporate actions, servicing events, freezes, corrections and redemptions need controlled workflows.</p>
              </div>
            </article>
            <article className="service-feature-card">
              <span>03</span>
              <div>
                <h3>Operational records</h3>
                <p>Teams still need a coherent record of actions, approvals and exceptions across systems.</p>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <SectionIntro
            eyebrow="Transfer controls"
            title="A technically valid transfer may still be a transfer the product should reject."
            body={
              <p>
                Blockchain validity answers only part of the question. Product rules can
                require eligibility, permissions, approvals or other agreed conditions before
                a transfer is accepted as a valid product action.
              </p>
            }
          />
          <div className="service-feature-grid service-feature-grid--three">
            {transferChecks.map((item, index) => (
              <article className="service-feature-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="State authority"
            title="The product needs one clear answer to a simple question: who owns the asset?"
            body={
              <p>
                The answer can depend on the product model and applicable legal structure.
                Engineering should therefore make the authority of each record explicit instead
                of assuming that one database or one blockchain answers every ownership question.
              </p>
            }
          />
          <AssetStateAuthorityModel />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <ServiceBoundary
            eyebrow="System boundary"
            title="Not everything belongs on-chain. The boundary still has to be deliberate."
            body={
              <p>
                Identity data, legal records, servicing information and operational workflow
                often sit outside the chain. The architecture should define what is stored where,
                what can be derived and which system is authoritative for each decision.
              </p>
            }
            items={[
              "Keep sensitive or operational data off-chain when the product does not need it on-chain.",
              "Define references and synchronization between on-chain and off-chain records.",
              "Make recovery, correction and exception paths part of the lifecycle design.",
            ]}
          />
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <div className="service-section__split service-section__split--artifact">
            <div>
              <SectionIntro
                eyebrow="Servicing and exit"
                title="An asset continues to create work after issuance."
                body={
                  <p>
                    Servicing, reporting, transfer restrictions, corrections and investor
                    changes remain part of the product. The lifecycle also needs an exit path,
                    including redemption, burn or another agreed terminal state.
                  </p>
                }
              />
              <div className="service-inline-note">
                <span>LIFECYCLE REQUIREMENT</span>
                <p>
                  The product should define how an asset leaves active circulation before the
                  first token is issued, not after an exception forces the decision.
                </p>
              </div>
            </div>
            <AssetLifecycleTransferControlModel />
          </div>
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <ServiceBoundary
            eyebrow="Responsibility"
            title="Legal and regulatory interpretation stays with qualified specialists."
            body={
              <p>
                AztraTech implements technical behavior from agreed requirements. We do not
                define the legal meaning of ownership, investor eligibility or regulatory status.
              </p>
            }
            items={[
              "Client and qualified advisers define authoritative legal and regulatory requirements.",
              "AztraTech translates agreed requirements into technical rules, controls and system behavior.",
              "Unresolved legal questions remain explicit dependencies instead of hidden engineering assumptions.",
            ]}
          />
        </Container>
      </section>

      <CTASection
        heading="Bring the asset lifecycle, not only the token contract."
        body="We can start with ownership state, transfer controls, lifecycle operations or the on-chain and off-chain boundary that still needs a decision."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="View all services"
        secondaryHref={siteConfig.routes.services}
      />
    </main>
  );
}
