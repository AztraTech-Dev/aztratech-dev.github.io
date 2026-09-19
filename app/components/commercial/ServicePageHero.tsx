import ButtonLink from "../ui/ButtonLink";
import Container from "../ui/Container";
import { siteConfig } from "../../../lib/site-config";

type ServicePageHeroProps = {
  eyebrow: string;
  title: string;
  lead: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  signals: readonly string[];
};

export default function ServicePageHero({
  eyebrow,
  title,
  lead,
  secondaryLabel = "View all services",
  secondaryHref = siteConfig.routes.services,
  signals,
}: ServicePageHeroProps) {
  return (
    <section className="service-hero">
      <Container variant="wide">
        <div className="service-hero__grid">
          <div className="service-hero__copy">
            <p className="service-hero__eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="service-hero__lead">{lead}</p>
            <div className="service-hero__actions">
              <ButtonLink href={siteConfig.calendlyUrl}>
                Book a 30-minute discovery call
              </ButtonLink>
              <ButtonLink href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>

          <aside className="service-hero__signals" aria-label="Service scope">
            <span className="service-hero__signals-label">ENGINEERING SCOPE</span>
            <div>
              {signals.map((signal, index) => (
                <p key={signal}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {signal}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
