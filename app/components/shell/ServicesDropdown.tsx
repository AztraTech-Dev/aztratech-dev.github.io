import Link from "next/link";
import { siteConfig } from "../../../lib/site-config";

export default function ServicesDropdown() {
  return (
    <details className="services-dropdown">
      <summary className="services-dropdown__trigger">
        <span>Services</span>
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="services-dropdown__panel">
        {siteConfig.services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="services-dropdown__item"
          >
            <span className="services-dropdown__label">{service.label}</span>
            <span className="services-dropdown__description">
              {service.description}
            </span>
          </Link>
        ))}
        <Link
          href={siteConfig.routes.services}
          className="services-dropdown__all"
        >
          View all services
        </Link>
      </div>
    </details>
  );
}
