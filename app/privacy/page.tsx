import Container from "../components/ui/Container";
import { buildMetadata } from "../../lib/seo";
import { siteConfig } from "../../lib/site-config";

export const metadata = buildMetadata({
  title: "Privacy Notice | AztraTech",
  description:
    "Privacy notice for the AztraTech website, including hosting, scheduling and direct business communications.",
  path: "/privacy",
  index: false,
});

const currentDataPoints = [
  [
    "Website hosting",
    "AztraTech is published as a static website through GitHub Pages. AztraTech does not add its own analytics or advertising tracking to the site. GitHub may process technical request data, including visitor IP addresses, for hosting and security purposes under its own privacy terms.",
  ],
  [
    "Scheduling",
    "The site links to Calendly for booking a discovery call. If you choose to schedule, the information you provide there is processed through Calendly and made available to AztraTech for scheduling and follow-up.",
  ],
  [
    "Direct contact",
    "If you contact AztraTech by email, LinkedIn, Telegram, GitHub or another linked channel, AztraTech receives the information you choose to send and uses it to respond, evaluate the inquiry and manage the resulting business relationship.",
  ],
  [
    "Cookies and tracking",
    "AztraTech does not currently use website analytics, advertising pixels, marketing cookies, embedded CRM forms or newsletter tracking on aztra.tech. External services you choose to open may use their own cookies or similar technologies under their own policies.",
  ],
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="supporting-page privacy-page">
      <section className="privacy-hero">
        <Container variant="editorial">
          <p className="supporting-hero__eyebrow">Privacy</p>
          <h1>Privacy and site data.</h1>
          <p>
            This notice explains how personal data can be processed when you
            visit aztra.tech, book a call or contact AztraTech through a linked
            communication channel.
          </p>
          <div className="privacy-status">
            <span>EFFECTIVE</span>
            <strong>20 September 2026</strong>
          </div>
        </Container>
      </section>

      <section className="privacy-content">
        <Container variant="editorial">
          <div className="privacy-section">
            <h2>Who is responsible for the data</h2>
            <p>
              The controller for personal data received directly by AztraTech
              through this website and its business channels is ФОП Владислав
              Усиченко / AztraTech. Privacy questions can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>

          <div className="privacy-section">
            <h2>What can be processed</h2>
            <div className="privacy-data-list">
              {currentDataPoints.map(([title, body]) => (
                <div key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="privacy-section">
            <h2>Why AztraTech uses contact data</h2>
            <p>
              Information received through scheduling or direct communication
              is used to respond to requests, arrange meetings, assess mutual
              fit, prepare or manage an engagement, maintain business records,
              protect systems and comply with applicable legal obligations.
              Where data protection law requires a legal basis, processing may
              rely on steps requested before a contract, performance of a
              contract, legitimate business interests, legal obligations or
              consent where consent is required.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Third-party services</h2>
            <p>
              GitHub provides the hosting infrastructure for this website.
              Calendly provides the external scheduling service. Links can also
              take you to LinkedIn, Telegram, GitHub or other third-party
              destinations. These providers may process data in different
              countries and apply their own privacy, security and retention
              practices. AztraTech does not control those independent practices.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Retention and your choices</h2>
            <p>
              The AztraTech website itself does not maintain a database of form
              submissions, analytics profiles or advertising identifiers.
              Scheduling records and business correspondence may remain in the
              services used to manage those communications for as long as they
              are needed for the relationship, operational records or applicable
              legal obligations. Depending on the law that applies to you, you
              may have rights to request access, correction, deletion,
              restriction or objection regarding personal data controlled by
              AztraTech. Contact AztraTech by email to make a request.
            </p>
          </div>

          <div className="privacy-section privacy-section--note">
            <span>CHANGES TO THIS NOTICE</span>
            <p>
              This notice will be updated if the website begins using analytics,
              advertising technology, embedded forms, CRM integrations or other
              data-processing features that materially change the current model.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
