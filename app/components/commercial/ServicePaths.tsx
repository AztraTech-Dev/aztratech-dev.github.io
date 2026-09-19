import Link from "next/link";
import { siteConfig } from "../../../lib/site-config";

const services = [
  {
    index: "01",
    title: "Stablecoin Payment Rails",
    body:
      "Payment state, provider integrations, settlement, reconciliation and treasury workflows.",
    href: siteConfig.routes.stablecoin,
    linkLabel: "Explore Stablecoin Payment Rails",
  },
  {
    index: "02",
    title: "RWA Tokenization",
    body:
      "Investor eligibility, ownership state, transfer controls, servicing and redemption across the asset lifecycle.",
    href: siteConfig.routes.rwa,
    linkLabel: "Explore RWA Tokenization",
  },
  {
    index: "03",
    title: "Security Engineering",
    body:
      "Threat modeling, security architecture, release controls, remediation and technical readiness.",
    href: siteConfig.routes.security,
    linkLabel: "Explore Security Engineering",
  },
] as const;

export default function ServicePaths() {
  return (
    <div className="service-paths">
      {services.map((service) => (
        <article className="service-path" key={service.title}>
          <div className="service-path__topline">
            <span>{service.index}</span>
            <span className="service-path__signal" aria-hidden="true" />
          </div>
          <h3>{service.title}</h3>
          <p>{service.body}</p>
          <Link href={service.href} className="service-path__link">
            {service.linkLabel}
          </Link>
        </article>
      ))}
    </div>
  );
}
