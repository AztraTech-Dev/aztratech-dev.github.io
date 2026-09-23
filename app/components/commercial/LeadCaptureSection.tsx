import Container from "../ui/Container";
import LeadForm from "../forms/LeadForm";
import { siteConfig } from "../../../lib/site-config";

/**
 * Server Component: layout, copy and the booking-call alternative.
 * Only LeadForm itself needs interactivity, so it is the sole Client
 * Component boundary in this section.
 */
export default function LeadCaptureSection() {
  return (
    <section className="lead-capture">
      <Container>
        <div className="lead-capture__surface">
          <div className="lead-capture__copy">
            <p className="lead-capture__eyebrow">Project context</p>
            <h2>Send the project context.</h2>
            <p className="lead-capture__intro">
              Describe the system, what is already in place and the decision
              that is still open. We review each message and reply if there
              is a useful next step.
            </p>
            <div className="lead-capture__alt">
              <p>Prefer to talk it through?</p>
              <a
                className="button button--ghost"
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a 30-minute discovery call
              </a>
            </div>
          </div>
          <div className="lead-capture__form-panel">
            <LeadForm source="homepage" />
          </div>
        </div>
      </Container>
    </section>
  );
}
