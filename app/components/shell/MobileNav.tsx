"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "../../../lib/site-config";
import ButtonLink from "../ui/ButtonLink";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <div className="mobile-navigation">
      <button
        type="button"
        className="mobile-navigation__toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true" className="mobile-navigation__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        id="mobile-navigation-panel"
        className="mobile-navigation__panel"
        data-open={open ? "true" : "false"}
      >
        <details className="mobile-navigation__services">
          <summary>Services</summary>
          <div className="mobile-navigation__service-links">
            {siteConfig.services.map((service) => (
              <Link key={service.href} href={service.href} onClick={close}>
                {service.navLabel}
              </Link>
            ))}
            <Link href={siteConfig.routes.services} onClick={close}>
              View all services
            </Link>
          </div>
        </details>

        <Link href={siteConfig.routes.howWeWork} onClick={close}>
          How We Work
        </Link>
        <Link href={siteConfig.routes.about} onClick={close}>
          About
        </Link>
        <Link href={siteConfig.routes.insights} onClick={close}>
          Insights
        </Link>
        <ButtonLink
          href={siteConfig.calendlyUrl}
          className="mobile-navigation__cta"
        >
          Book a Call
        </ButtonLink>
      </div>
    </div>
  );
}
