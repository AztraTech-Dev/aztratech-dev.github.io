const layers = [
  ["PRODUCT", "User and business actions"],
  ["APPLICATION STATE", "Canonical internal state"],
  ["INTEGRATION LAYER", "Provider-specific translation"],
  ["EXTERNAL INFRASTRUCTURE", "Networks and service providers"],
  ["OPERATIONS", "Exceptions and reconciliation"],
] as const;

export default function SystemCoordinationModel() {
  return (
    <figure className="coordination-model" aria-labelledby="coordination-model-title">
      <figcaption id="coordination-model-title">System coordination model</figcaption>

      <div className="coordination-model__layers">
        {layers.map(([title, body], index) => (
          <div
            className={`coordination-layer${
              title === "EXTERNAL INFRASTRUCTURE" ? " coordination-layer--external" : ""
            }`}
            key={title}
          >
            <span className="coordination-layer__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{title}</strong>
            <small>{body}</small>
          </div>
        ))}
      </div>

      <div className="coordination-model__rail">
        <span>SECURITY</span>
        <span>CONTROLS</span>
        <span>OBSERVABILITY</span>
      </div>

      <div className="state-mismatch" aria-label="Illustrative state mismatch">
        <span className="state-mismatch__label">ILLUSTRATIVE STATE MISMATCH</span>
        <div>
          <span>Internal state</span>
          <strong>SETTLED</strong>
        </div>
        <div>
          <span>Provider state</span>
          <strong>PROCESSING</strong>
        </div>
        <p>STATE MISMATCH</p>
      </div>
    </figure>
  );
}
