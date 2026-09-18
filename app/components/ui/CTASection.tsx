import ButtonLink from "./ButtonLink";
import Container from "./Container";

type CTASectionProps = {
  heading: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTASection({
  heading,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-section__surface">
          <div className="cta-section__copy">
            <h2>{heading}</h2>
            {body ? <p>{body}</p> : null}
          </div>
          <div className="cta-section__actions">
            <ButtonLink href={primaryHref}>{primaryLabel}</ButtonLink>
            {secondaryLabel && secondaryHref ? (
              <ButtonLink href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
