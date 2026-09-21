"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import { siteConfig } from "../../../lib/site-config";
import { currentState } from "./NavLink";

/** Intent delays: ignore a pointer that only crosses the trigger, and forgive a brief exit. */
const OPEN_DELAY_MS = 70;
const CLOSE_DELAY_MS = 160;

/**
 * `pinned` menus were opened deliberately (click, tap, Enter, Space, ArrowDown),
 * so the pointer leaving does not close them. Hover-opened menus are not pinned.
 */
type MenuState = { pinned: boolean } | null;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ServicesDropdown() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<MenuState>(null);
  const [menuPath, setMenuPath] = useState(pathname);
  const open = menu !== null;

  // A route change closes the menu. Adjusting state during render is the
  // supported way to reset state when an input (here, the pathname) changes.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenu(null);
  }

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const pointerDownRef = useRef(false);
  const focusFirstRef = useRef(false);

  const clearTimer = () => window.clearTimeout(timerRef.current);
  const schedule = (next: MenuState, delay: number) => {
    clearTimer();
    timerRef.current = window.setTimeout(() => setMenu(next), delay);
  };

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // While open: outside pointer press and Escape close the menu.
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const hadFocus = rootRef.current?.contains(document.activeElement);
      setMenu(null);
      if (hadFocus) triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // ArrowDown opens the menu and moves focus to the first link once it is visible.
  useEffect(() => {
    if (open && focusFirstRef.current) {
      focusFirstRef.current = false;
      rootRef.current?.querySelector<HTMLAnchorElement>(".services-dropdown__item")?.focus();
    }
  }, [open]);

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    if (!open) schedule({ pinned: false }, OPEN_DELAY_MS);
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    clearTimer();
    if (menu && !menu.pinned) schedule(null, CLOSE_DELAY_MS);
  };

  // Safari does not focus a link or button on click, so a pointer press inside
  // the menu must not be mistaken for focus leaving it.
  const onPointerDownInside = () => {
    pointerDownRef.current = true;
    window.addEventListener(
      "pointerup",
      () => window.setTimeout(() => (pointerDownRef.current = false), 0),
      { once: true },
    );
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (pointerDownRef.current) return;
    const next = event.relatedTarget as Node | null;
    if (next && rootRef.current?.contains(next)) return;
    clearTimer();
    setMenu(null);
  };

  const toggle = () => {
    clearTimer();
    setMenu(menu?.pinned ? null : { pinned: true });
  };

  const servicesState = currentState(pathname, siteConfig.routes.services);

  return (
    <>
      <div
        ref={rootRef}
        className="services-dropdown"
        data-open={open ? "true" : "false"}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDownInside}
        onBlur={onBlur}
      >
        <button
          ref={triggerRef}
          type="button"
          className="services-dropdown__trigger"
          aria-expanded={open}
          aria-controls="services-menu"
          aria-current={servicesState ? "true" : undefined}
          data-current={servicesState ? "true" : undefined}
          onClick={toggle}
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown") return;
            event.preventDefault();
            focusFirstRef.current = true;
            setMenu({ pinned: true });
          }}
        >
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
        </button>

        <div id="services-menu" className="services-dropdown__panel">
          <div className="services-dropdown__intro">
            <p className="services-dropdown__eyebrow">Services</p>
            <p className="services-dropdown__lede">
              Infrastructure for complex Web3 and fintech systems.
            </p>
            <Link
              href={siteConfig.routes.services}
              className="services-dropdown__all"
              aria-current={servicesState === "page" ? "page" : undefined}
              onClick={() => setMenu(null)}
            >
              <span>View all services</span>
              <ArrowIcon className="services-dropdown__all-arrow" />
            </Link>
          </div>

          <ul className="services-dropdown__list" role="list">
            {siteConfig.services.map((service) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className="services-dropdown__item"
                  aria-current={currentState(pathname, service.href, true)}
                  onClick={() => setMenu(null)}
                >
                  <span className="services-dropdown__text">
                    <span className="services-dropdown__label">{service.label}</span>
                    <span className="services-dropdown__description">
                      {service.menuDescription}
                    </span>
                  </span>
                  <ArrowIcon className="services-dropdown__arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Dims the page under the open menu. It is a sibling of the menu root, not a child, so
          the pointer moving onto it counts as leaving the menu. Pressing it closes the menu
          through the outside-press handler above. It is decorative and never focusable. */}
      <div
        className="services-dropdown__backdrop"
        data-open={open ? "true" : "false"}
        aria-hidden="true"
      />
    </>
  );
}
