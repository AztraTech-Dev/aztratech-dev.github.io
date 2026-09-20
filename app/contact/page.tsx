import ButtonLink from "../components/ui/ButtonLink";
import Container from "../components/ui/Container";
import SectionIntro from "../components/ui/SectionIntro";
import { siteConfig } from "../../lib/site-config";
import JsonLd from "../components/seo/JsonLd";
import { buildBreadcrumbJsonLd, buildMetadata } from "../../lib/seo";

export const metadata = buildMetadata({
  title: "Contact AztraTech | Web3 & Fintech Engineering",
  description:
    "Discuss a Web3 or fintech infrastructure problem with AztraTech, including stablecoin payments, tokenized assets, security and system architecture.",
  path: "/contact",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

const conversationPoints = [
  ["01", "Context", "What the product does and where this technical problem sits in the wider system."],
  ["02", "Current state", "What already exists, what has already been decided and which providers or systems are involved."],
  ["03", "Constraint or blocker", "The integration, architecture decision, control or operational problem that is creating friction."],
  ["04", "Fit and next step", "Whether AztraTech is useful here and what the smallest sensible next step would be, if any."],
] as const;

const usefulContext = [
  "A short product or system description",
  "Existing architecture or technical documentation",
  "The blocker or decision that is still open",
  "A critical timeline or external dependency",
] as const;

export default function ContactPage() {
  return (
    <main id="main-content" className="supporting-page contact-page">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="supporting-hero supporting-hero--contact">
        <Container variant="wide">
          <div className="contact-hero__grid">
            <div>
              <p className="supporting-hero__eyebrow">Contact</p>
              <h1>{"Let's look at the technical problem."}</h1>
              <p className="supporting-hero__lead">The first conversation is for context, current state, the blocker and mutual fit. If there is a useful next step, we can define it from there.</p>
            </div>
            <div className="contact-primary-card">
              <span>PRIMARY</span>
              <h2>30-minute discovery call</h2>
              <p>Bring the problem and the context you already have. A sales presentation is not required.</p>
              <ButtonLink href={siteConfig.calendlyUrl}>Book a 30-minute discovery call</ButtonLink>
              <small>This call is not a free architecture workshop.</small>
            </div>
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <SectionIntro eyebrow="First conversation" title="What we usually discuss." body={<p>The first conversation stays focused on the technical problem, the current state and the decisions that still need to be made.</p>} />
          <div className="contact-topic-grid">
            {conversationPoints.map(([index, title, body]) => (
              <article className="contact-topic-card" key={title}>
                <span>{index}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="supporting-section supporting-section--surface">
        <Container>
          <div className="contact-context-grid">
            <div>
              <p className="supporting-kicker">USEFUL CONTEXT IF YOU HAVE IT</p>
              <h2>Nothing here is mandatory before the call.</h2>
              <p>Existing material can help us get to the real constraint faster, but there is no long intake form and no requirement to prepare a complete brief.</p>
            </div>
            <div className="contact-context-list">
              {usefulContext.map((item, index) => (
                <p key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="supporting-section">
        <Container>
          <SectionIntro eyebrow="Direct channels" title="Prefer to start with a message?" body={<p>Use a corporate or external channel that fits the context. No response-time promise is implied.</p>} />
          <div className="contact-channel-grid">
            <a className="contact-channel" href={`mailto:${siteConfig.contact.email}`}>
              <span>EMAIL</span><strong>{siteConfig.contact.email}</strong><small>Corporate email</small>
            </a>
            <a className="contact-channel" href={siteConfig.contact.linkedIn} target="_blank" rel="noopener noreferrer">
              <span>LINKEDIN</span><strong>AztraTech</strong><small>Company profile</small>
            </a>
            <a className="contact-channel" href={siteConfig.contact.telegram} target="_blank" rel="noopener noreferrer">
              <span>TELEGRAM</span><strong>@aztratech</strong><small>Direct channel</small>
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
