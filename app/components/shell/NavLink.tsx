"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

const normalize = (pathname: string | null) =>
  (pathname ?? "").replace(/\/+$/, "") || "/";

/** True when `pathname` is `href` or a route below it, ignoring a trailing slash. */
export function isActivePath(pathname: string | null, href: string) {
  const current = normalize(pathname);
  return current === href || current.startsWith(`${href}/`);
}

/**
 * `"page"` on an exact match, `"true"` when the current route is inside the
 * linked section (for example an article under Insights), otherwise nothing.
 */
export function currentState(
  pathname: string | null,
  href: string,
  exact = false,
): "page" | "true" | undefined {
  if (normalize(pathname) === href) return "page";
  if (!exact && isActivePath(pathname, href)) return "true";
  return undefined;
}

type NavLinkProps = ComponentProps<typeof Link> & {
  href: string;
  /** Only an exact match counts as current, not routes below `href`. */
  exact?: boolean;
};

/**
 * A link that knows whether it points at the current page or section. It is
 * the reason the primary navigation needs a client boundary, so it stays tiny.
 * `aria-current` informs assistive technology, and `data-current` drives the
 * persistent indicator in globals.css.
 */
export default function NavLink({ href, exact, children, ...rest }: NavLinkProps) {
  const current = currentState(usePathname(), href, exact);

  return (
    <Link
      href={href}
      aria-current={current}
      data-current={current ? "true" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
