const rows = [
  ["Payment intent", "Canonical identifier and expected movement"],
  ["State mapping", "Internal states mapped to provider and network states"],
  ["Reconciliation rule", "Expected records, timing and mismatch handling"],
  ["Exception path", "Ownership and action when the normal flow stops"],
] as const;

export default function PaymentStateReconciliationSpec() {
  return (
    <figure className="service-artifact" aria-labelledby="payment-spec-title">
      <div className="service-artifact__header">
        <div>
          <span>ILLUSTRATIVE EXAMPLE</span>
          <figcaption id="payment-spec-title">Payment State & Reconciliation Specification</figcaption>
        </div>
        <span className="service-artifact__mark">AT</span>
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
        <span>SCOPE-SPECIFIC</span>
      </div>
    </figure>
  );
}
