import type { ReactNode } from "react";

type ContainerVariant = "wide" | "standard" | "editorial";

type ContainerProps = {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
};

export default function Container({
  children,
  variant = "standard",
  className = "",
}: ContainerProps) {
  const classes = ["site-container", `site-container--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
