import PaymentStateReconciliationSpec from "../../components/artifacts/PaymentStateReconciliationSpec";
import ServiceBoundary from "../../components/commercial/ServiceBoundary";
import ServicePageHero from "../../components/commercial/ServicePageHero";
import PaymentInfrastructureArchitecture from "../../components/diagrams/PaymentInfrastructureArchitecture";
import PaymentStateModel from "../../components/diagrams/PaymentStateModel";
import CTASection from "../../components/ui/CTASection";
import Container from "../../components/ui/Container";
import SectionIntro from "../../components/ui/SectionIntro";
import { siteConfig } from "../../../lib/site-config";
import JsonLd from "../../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../../lib/seo";

export const metadata = buildMetadata({
  title: "Stablecoin Payment Rails Engineering | AztraTech",
  description:
    "Design and build stablecoin payment rails with clear payment state, provider boundaries, settlement, reconciliation and treasury workflows.",
  path: "/services/stablecoin-payment-rails",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Stablecoin Payment Rails", path: "/services/stablecoin-payment-rails" },
]);

const integrationProblems = [
  {
    title: "State starts to fragment",
    body: "The product, provider, blockchain and payout rail can all describe the same payment differently at the same moment.",
  },
  {
    title: "Provider details leak into product logic",
    body: "A second provider becomes expensive when every status, identifier and retry rule is already embedded across the product.",
  },
  {
    title: "Operations inherit the exceptions",
    body: "Pending settlement, partial completion and manual review need a real operating path instead of ad hoc database edits.",
  },
] as const;

const providerBoundaryItems = [
  "Translate provider-specific statuses into an internal payment model.",
  "Keep provider credentials, webhooks and retry behavior inside the integration boundary.",
  "Make replacement or addition of a provider a contained engineering change.",
] as const;

export default function StablecoinPaymentRailsPage() {
  return (
    <main id="main-content" className="service-detail-page">
      <JsonLd data={breadcrumbJsonLd} />
      <ServicePageHero
        eyebrow="Stablecoin Payment Rails"
        title="Add stablecoin payments without rebuilding your operations around every new provider."
        lead="Moving a stablecoin is usually the easy part. The harder work is keeping payment state, providers, settlement, reconciliation and treasury operations consistent across the whole system. AztraTech designs and builds that infrastructure."
        signals={["Payment state", "Provider integrations", "Settlement & reconciliation", "Treasury & controls"]}
      />

      <section className="service-section">
        <Container>
          <SectionIntro
            eyebrow="Where complexity appears"
            title="The first integration is rarely the real problem."
            body={
              <p>
                A single provider can make the first payment flow look simple. The design
                gets harder when the product adds another rail, network, provider or
                settlement path and still needs one coherent operational model.
              </p>
            }
          />
          <div className="service-feature-grid service-feature-grid--three">
            {integrationProblems.map((problem, index) => (
              <article className="service-feature-card" key={problem.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{problem.title}</h3>
                  <p>{problem.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <SectionIntro
            eyebrow="Payment architecture"
            title="The blockchain should not be your entire payment state machine."
            body={
              <p>
                The product needs an internal payment model that survives provider changes,
                asynchronous settlement and operational exceptions. Blockchain state is one
                input to that model, not the whole model by default.
              </p>
            }
          />
          <PaymentInfrastructureArchitecture />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <div className="service-section__split service-section__split--diagram">
            <SectionIntro
              eyebrow="Reconciliation"
              title="Money movement is not finished until the records agree."
              body={
                <p>
                  A successful transfer can still leave the product with a different answer
                  from the provider, network or payout rail. Reconciliation makes those
                  differences visible and gives operations a defined way to resolve them.
                </p>
              }
            />
            <PaymentStateModel />
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <ServiceBoundary
            eyebrow="Integration boundary"
            title="Keep provider logic out of the rest of the product."
            body={
              <p>
                Provider APIs are implementation details. The rest of the product should
                depend on a stable internal contract that expresses what the business needs
                to know about a payment.
              </p>
            }
            items={providerBoundaryItems}
          />
        </Container>
      </section>

      <section className="service-section">
        <Container>
          <div className="service-section__split service-section__split--artifact">
            <div>
              <SectionIntro
                eyebrow="Treasury and settlement"
                title="Settlement creates a treasury problem too."
                body={
                  <p>
                    Once value moves across wallets, providers and fiat rails, the system
                    needs rules for balances, liquidity, conversion, funding and operational
                    ownership. Those decisions belong in the architecture, not in a spreadsheet
                    discovered after launch.
                  </p>
                }
              />
              <div className="service-inline-note">
                <span>WORKING OUTPUT</span>
                <p>
                  State definitions, reconciliation rules and exception ownership can be
                  captured as implementation material for engineering and operations.
                </p>
              </div>
            </div>
            <PaymentStateReconciliationSpec />
          </div>
        </Container>
      </section>

      <section className="service-section service-section--surface">
        <Container>
          <ServiceBoundary
            title="We do not replace your infrastructure providers."
            body={
              <p>
                AztraTech is the engineering partner around the system. Custody, banking,
                payment processing, liquidity and blockchain infrastructure can come from
                the providers that fit the product and operating model.
              </p>
            }
            items={[
              "Use provider capabilities behind clear technical boundaries.",
              "Keep internal product state independent from one vendor vocabulary.",
              "Design controls and operations across the complete payment flow.",
            ]}
          />
        </Container>
      </section>

      <CTASection
        heading="Bring the payment flow that is becoming difficult to operate."
        body="We can start with the current state model, provider architecture, reconciliation path or the integration decision that is still open."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="View all services"
        secondaryHref={siteConfig.routes.services}
      />
    </main>
  );
}
