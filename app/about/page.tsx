import ButtonLink from "../components/ui/ButtonLink";
import CTASection from "../components/ui/CTASection";
import Container from "../components/ui/Container";
import SectionIntro from "../components/ui/SectionIntro";
import { siteConfig } from "../../lib/site-config";

const principles = [
  ["01", "System before feature", "A feature can work in isolation and still fail inside the complete operating system. We design around the system that has to run after the demo."],
  ["02", "Explicit state and ownership", "Important state should have a clear authority. Provider status, blockchain state and internal records should not compete silently."],
  ["03", "Design failure deliberately", "Retries, exceptions, privileged actions and recovery paths deserve design attention before they become production incidents."],
  ["04", "Connect engineering to economic reason", "Technical choices matter because they affect operations, risk, delivery speed and the cost of changing the system later."],
] as const;

const operatingModel = [
  ["CORE", "Direct accountability", "Commercial conversations, project scoping and client accountability stay close to AztraTech leadership."],
  ["SCOPE", "Expertise follows the work", "Specialists and partners are assembled around the actual technical scope, with responsibilities defined around the work that is required."],
  ["DELIVERY", "One technical system", "Contributors work against explicit boundaries, decisions and responsibilities so the engagement does not become a collection of disconnected contractors."],
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="supporting-page">
      <section className="supporting-hero supporting-hero--about">
        <Container variant="wide">
          <div className="supporting-hero__grid">
            <div className="supporting-hero__copy">
              <p className="supporting-hero__eyebrow">About AztraTech</p>
              <h1>AztraTech builds infrastructure for Web3 and fintech products.</h1>
              <p className="supporting-hero__lead">We work on stablecoin payment infrastructure, RWA tokenization and security-sensitive systems, with particular attention to state, integrations, controls and operations.</p>
              <div className="supporting-hero__actions">
                <ButtonLink href={siteConfig.routes.services}>View services</ButtonLink>
                <ButtonLink href={siteConfig.calendlyUrl} variant="ghost">Book a call</ButtonLink>
              </div>
            </div>
            <aside className="supporting-hero__aside" aria-label="AztraTech focus">
              <span>ENGINEERING FOCUS</span>
              <div>
                <p><strong>01</strong> Stablecoin payment infrastructure</p>
                <p><strong>02</strong> Tokenized asset systems</p>
                <p><strong>03</strong> Security-sensitive delivery</p>
                <p><strong>04</strong> Integration and operational architecture</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <div className="about-thesis">
            <p className="supporting-kicker">WHY AZTRATECH EXISTS</p>
            <h2>Core Web3 functionality is only one part of a product that has to operate.</h2>
            <p>Moving value, issuing a token or deploying a contract can prove that a core mechanism works. Production systems also need product state, provider boundaries, controls, operational paths and clear responsibility when something does not follow the happy path.</p>
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <SectionIntro eyebrow="How we think" title="Engineering principles instead of generic company values." body={<p>These principles shape architecture and delivery across payment, tokenization and security-sensitive work.</p>} />
          <div className="about-principles-grid">
            {principles.map(([index, title, body]) => (
              <article className="about-principle" key={title}>
                <span>{index}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <SectionIntro eyebrow="Operating model" title="Scope determines the expertise around the engagement." body={<p>AztraTech operates with a small accountable core and brings in vetted specialists and partners around the technical scope of each engagement.</p>} />
          <div className="operating-model-grid">
            {operatingModel.map(([label, title, body]) => (
              <article className="operating-model-card" key={label}>
                <span>{label}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <div className="founder-accountability">
            <div>
              <p className="supporting-kicker">FOUNDER &amp; ACCOUNTABILITY</p>
              <h2>Vladislav Usichenko</h2>
              <p className="founder-accountability__role">Founder, AztraTech</p>
            </div>
            <div className="founder-accountability__copy">
              <p>Vladislav remains directly involved in the commercial side of AztraTech, project scoping and client accountability.</p>
              <p>This keeps a clear human point of responsibility close to each technical engagement.</p>
              <div className="founder-accountability__links">
                <ButtonLink href={siteConfig.contact.linkedIn} variant="ghost">LinkedIn</ButtonLink>
                <ButtonLink href={siteConfig.routes.contact} variant="ghost">Contact AztraTech</ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Discuss the system that needs to work in production."
        body="Start with the product, architecture or technical decision that is creating friction."
        primaryLabel="Book a 30-minute discovery call"
        primaryHref={siteConfig.calendlyUrl}
        secondaryLabel="How we work"
        secondaryHref={siteConfig.routes.howWeWork}
      />
    </main>
  );
}
