import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  newTab?: boolean;
};

function isExternalHref(href: string) {
  return /^(https?:\/\/|mailto:|tel:)/.test(href);
}

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  newTab,
}: ButtonLinkProps) {
  const classes = ["button", `button--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  if (isExternalHref(href)) {
    const openInNewTab = newTab ?? /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={classes}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
