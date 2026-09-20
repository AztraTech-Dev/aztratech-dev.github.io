const rows = [
  ["Lifecycle states", "Events and transitions the product must support"],
  ["Eligibility rules", "Inputs that determine whether an action can proceed"],
  ["Transfer controls", "Technical checks, approvals and exception handling"],
  ["State authority", "Which system answers each ownership and servicing decision"],
] as const;

export default function AssetLifecycleTransferControlModel() {
  return (
    <figure className="service-artifact" aria-labelledby="asset-control-title">
      <div className="service-artifact__header">
        <div>
          <span>ILLUSTRATIVE EXAMPLE</span>
          <figcaption id="asset-control-title">Asset Lifecycle & Transfer Control Model</figcaption>
        </div>
        <span className="service-artifact__meta">SCOPE-SPECIFIC</span>
      </div>
      <div className="service-artifact__rows">
        {rows.map(([title, body], index) => (
          <div key={title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p><strong>{title}</strong><small>{body}</small></p>
          </div>
        ))}
      </div>
      <div className="service-artifact__footer">
        <span>TECHNICAL WORKING MATERIAL</span>
        <span>ASSET LIFECYCLE & TRANSFER CONTROL</span>
      </div>
    </figure>
  );
}
