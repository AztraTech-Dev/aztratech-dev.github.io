"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "../../../lib/site-config";
import ButtonLink from "../ui/ButtonLink";
import NavLink, { currentState } from "./NavLink";

const CLOSED = { open: false, services: false } as const;

export default function MobileNav() {
  const pathname = usePathname();
  const [state, setState] = useState<{ open: boolean; services: boolean }>(CLOSED);
  const [statePath, setStatePath] = useState(pathname);
  const { open, services } = state;
  const inServices = currentState(pathname, siteConfig.routes.services) !== undefined;

  // A route change closes the panel and collapses the Services accordion, so
  // neither is stale when the panel is next opened.
  if (statePath !== pathname) {
    setStatePath(pathname);
    setState(CLOSED);
  }

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = () => setState(CLOSED);

  // While open, Escape closes the panel and returns focus to the hamburger
  // when focus was inside the navigation.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const active = document.activeElement;
      const hadFocus =
        active === toggleRef.current || !!panelRef.current?.contains(active);
      setState(CLOSED);
      if (hadFocus) toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button
        ref={toggleRef}
        type="button"
        className="mobile-navigation__toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation-panel"
        onClick={() => setState(open ? CLOSED : { open: true, services: false })}
      >
        <span aria-hidden="true" className="mobile-navigation__icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      <nav
        ref={panelRef}
        id="mobile-navigation-panel"
        className="mobile-navigation__panel"
        aria-label="Mobile navigation"
        data-open={open ? "true" : "false"}
      >
        <button
          type="button"
          className="mobile-navigation__services-toggle"
          aria-expanded={services}
          aria-controls="mobile-services-links"
          aria-current={inServices ? "true" : undefined}
          data-current={inServices ? "true" : undefined}
          onClick={() => setState({ open: true, services: !services })}
        >
          <span>Services</span>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3.5 5.25L7 8.75L10.5 5.25"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          id="mobile-services-links"
          className="mobile-navigation__service-links"
          hidden={!services}
        >
          {siteConfig.services.map((service) => (
            <NavLink key={service.href} href={service.href} onClick={close}>
              {service.label}
            </NavLink>
          ))}
          <NavLink href={siteConfig.routes.services} exact onClick={close}>
            View all services
          </NavLink>
        </div>

        <NavLink href={siteConfig.routes.howWeWork} onClick={close}>
          How We Work
        </NavLink>
        <NavLink href={siteConfig.routes.about} onClick={close}>
          About
        </NavLink>
        <NavLink href={siteConfig.routes.insights} onClick={close}>
          Insights
        </NavLink>
        <ButtonLink
          href={siteConfig.calendlyUrl}
          className="mobile-navigation__cta"
        >
          Book a Call
        </ButtonLink>
      </nav>
    </div>
  );
}
