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
    "Project context form",
    "The homepage and the Contact page include a short form for sending a written project context instead of booking a call. The form collects your name, email address, an optional company or project name, the context you write and which page you submitted it from. Submissions are sent to a Cloudflare Worker and stored in a Cloudflare D1 database configured for the EU jurisdiction, which remains the primary record of each submission. After a submission is stored, AztraTech uses Resend, a transactional email service, to send itself an internal notification about it. That notification contains the details you submitted, a submission reference and the time it was received, so this information is transmitted through Resend. It is an operational message to AztraTech only; the form is not used to send marketing email. The notification does not include your IP address or the pseudonymous rate-limiting value described below. AztraTech uses this information only to review the message and reply if there is a useful next step. Do not send private keys, seed phrases, credentials or other secrets through the form.",
  ],
  [
    "Technical abuse prevention on the form",
    "As part of handling the request, Cloudflare receives standard technical request data, including the request's IP address. The backend may use the IP address briefly to apply submission limits and reduce automated abuse of the form. The IP address itself is not stored with your submission. Instead, the system stores a pseudonymous value derived from the IP address with a keyed, one-way function that changes daily, used only to apply short-term submission limits. The browser's User-Agent string is not stored with form submissions, and the form does not collect marketing attribution parameters such as campaign or referrer tracking codes.",
  ],
  [
    "Direct contact",
    "If you contact AztraTech by email, LinkedIn, Telegram, GitHub or another linked channel, AztraTech receives the information you choose to send and uses it to respond, evaluate the inquiry and manage the resulting business relationship.",
  ],
  [
    "Cookies and tracking",
    "AztraTech does not use website analytics, advertising pixels, marketing cookies, advertising identifiers or newsletter tracking on aztra.tech. The project-context form submits directly to AztraTech's own backend and does not load a third-party form embed, CRM widget or marketing script. External services you choose to open may use their own cookies or similar technologies under their own policies.",
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
            visit aztra.tech, book a call, send a message through the
            project-context form or contact AztraTech through a linked
            communication channel.
          </p>
          <div className="privacy-status">
            <span>EFFECTIVE</span>
            <strong>25 September 2026</strong>
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
              Information received through scheduling, the project-context
              form or direct communication is used to respond to requests,
              arrange meetings, assess mutual fit, prepare or manage an
              engagement, maintain business records, protect systems and
              comply with applicable legal obligations. Where data protection
              law requires a legal basis, processing may rely on steps
              requested before a contract, performance of a contract,
              legitimate business interests, legal obligations or consent
              where consent is required.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Third-party services</h2>
            <p>
              GitHub provides the hosting infrastructure for this website.
              The project-context form submits to a Cloudflare Worker, and
              submissions are stored in a Cloudflare D1 database configured
              for the EU jurisdiction; Cloudflare&apos;s network may still
              process the underlying web request at other locations as part
              of ordinary request routing. Resend is used to send AztraTech
              an operational email notification about each new form
              submission. Calendly provides the external
              scheduling service. Links can also take you to LinkedIn,
              Telegram, GitHub or other third-party destinations. These
              providers may process data in different countries and apply
              their own privacy, security and retention practices. AztraTech
              does not control those independent practices.
            </p>
          </div>

          <div className="privacy-section">
            <h2>Retention and your choices</h2>
            <p>
              Lead records submitted through the project-context form,
              scheduling records and business correspondence are kept as
              ordinary business records for as long as they are needed for
              the relationship, operational records or applicable legal
              obligations. AztraTech does not currently run an automated
              process to delete the pseudonymous IP-derived rate-limiting
              value after a fixed period; if an automated retention process
              is added, this notice will be updated to describe it.
              Depending on the law that applies to you, you may have rights
              to request access, correction, deletion, restriction or
              objection regarding personal data controlled by AztraTech.
              Contact AztraTech by email to make a request.
            </p>
          </div>

          <div className="privacy-section privacy-section--note">
            <span>CHANGES TO THIS NOTICE</span>
            <p>
              This notice will be updated if the website begins using
              analytics, advertising technology, a CRM connected to the
              form, a different notification service for the form, or other
              data-processing features that materially change the current
              model.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
