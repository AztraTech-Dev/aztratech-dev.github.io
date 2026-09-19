import Container from "../components/ui/Container";

const currentDataPoints = [
  ["Static website", "The current Website V2 build is designed as a static site. It does not add a custom contact form or newsletter in this batch."],
  ["Scheduling", "The website links to Calendly for booking. When you follow that link, the third-party service operates under its own privacy terms and data practices."],
  ["Direct contact", "The site exposes corporate email and external company or social links. Data you send through those services is handled through the service you choose to use."],
  ["Analytics and cookies", "Analytics, non-essential cookies and consent tooling are not being introduced as part of this implementation batch. Their use must be reviewed before launch if that changes."],
] as const;

export default function PrivacyPage() {
  return (
    <main id="main-content" className="supporting-page privacy-page">
      <section className="privacy-hero">
        <Container variant="editorial">
          <p className="supporting-hero__eyebrow">Privacy</p>
          <h1>Privacy and site data.</h1>
          <p>This page documents the current pre-launch Website V2 data model. It is not a substitute for the final legal privacy policy, which must be completed against the actual deployed data flows before launch.</p>
          <div className="privacy-status"><span>STATUS</span><strong>Pre-launch data notice</strong></div>
        </Container>
      </section>

      <section className="privacy-content">
        <Container variant="editorial">
          <div className="privacy-section">
            <h2>Current website baseline</h2>
            <p>The implementation is intentionally simple while the final hosting, analytics, cookie and lead-handling setup is being confirmed.</p>
            <div className="privacy-data-list">
              {currentDataPoints.map(([title, body]) => (
                <div key={title}><h3>{title}</h3><p>{body}</p></div>
              ))}
            </div>
          </div>

          <div className="privacy-section">
            <h2>What must be verified before launch</h2>
            <p>The final policy should follow the real website architecture rather than make assumptions in advance. The launch review needs to verify the controller or legal identity, hosting and data flows, Calendly, email, analytics, cookies or local storage, any CRM or forms, retention, processors and target jurisdictions.</p>
          </div>

          <div className="privacy-section">
            <h2>Third-party destinations</h2>
            <p>Links can take you to external services such as Calendly, LinkedIn, GitHub or Telegram. Those services are outside the AztraTech website and may process information under their own terms and policies.</p>
          </div>

          <div className="privacy-section privacy-section--note">
            <span>LAUNCH GATE</span>
            <p>This page must be reviewed and replaced or finalized before Website V2 is merged for production if the deployed data architecture differs from the baseline described here.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
