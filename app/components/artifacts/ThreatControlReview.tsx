const rows = [
  ["Threat", "Privileged action can bypass the intended approval path"],
  ["Control", "Explicit authorization rule plus enforced approval policy"],
  ["Implementation", "Policy check at the sensitive execution boundary"],
  ["Evidence", "Test result, configuration and change record"],
] as const;

export default function ThreatControlReview() {
  return (
    <figure className="service-artifact" aria-labelledby="threat-review-title">
      <div className="service-artifact__header">
        <div>
          <span>ILLUSTRATIVE EXAMPLE</span>
          <figcaption id="threat-review-title">Threat & Control Review</figcaption>
        </div>
        <span className="service-artifact__meta">SCOPE-SPECIFIC</span>
      </div>
      <div className="service-artifact__rows service-artifact__rows--flow">
        {rows.map(([title, body], index) => (
          <div key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p><strong>{title}</strong><small>{body}</small></p>
          </div>
        ))}
      </div>
      <div className="service-artifact__footer">
        <span>TECHNICAL WORKING MATERIAL</span>
        <span>THREAT & CONTROL REVIEW</span>
      </div>
    </figure>
  );
}
