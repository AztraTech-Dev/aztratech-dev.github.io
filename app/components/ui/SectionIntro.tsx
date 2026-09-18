import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow?: string;
  title: string;
  body?: ReactNode;
  className?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  body,
  className = "",
}: SectionIntroProps) {
  const classes = ["section-intro", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-intro__title">{title}</h2>
      {body ? <div className="section-intro__body">{body}</div> : null}
    </div>
  );
}
