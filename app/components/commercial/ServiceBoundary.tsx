import type { ReactNode } from "react";

type ServiceBoundaryProps = {
  eyebrow?: string;
  title: string;
  body: ReactNode;
  items: readonly string[];
  note?: ReactNode;
};

export default function ServiceBoundary({
  eyebrow = "Boundary",
  title,
  body,
  items,
  note,
}: ServiceBoundaryProps) {
  return (
    <div className="service-boundary">
      <div className="service-boundary__copy">
        <p className="service-boundary__eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="service-boundary__body">{body}</div>
        {note ? <div className="service-boundary__note">{note}</div> : null}
      </div>
      <div className="service-boundary__items">
        {items.map((item, index) => (
          <div key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
