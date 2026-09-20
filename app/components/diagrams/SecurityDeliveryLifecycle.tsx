const stages = ["DESIGN", "BUILD", "RELEASE", "OPERATE"] as const;
const rails = ["RISK", "CONTROLS", "EVIDENCE"] as const;

export default function SecurityDeliveryLifecycle() {
  return (
    <figure className="service-diagram security-lifecycle" aria-labelledby="security-lifecycle-title">
      <figcaption id="security-lifecycle-title">Security delivery lifecycle</figcaption>
      <div className="security-lifecycle__stages">
        {stages.map((stage, index) => (
          <div className="security-lifecycle__stage" key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
            {stage === "RELEASE" ? <small>RELEASE GATE</small> : null}
          </div>
        ))}
      </div>
      <div className="security-lifecycle__rails">
        {rails.map((rail) => <span key={rail}>{rail}</span>)}
      </div>
      <p className="service-diagram__note">
        Risk, controls and evidence cross the full delivery lifecycle. The release
        gate is one decision point, not the start of security work.
      </p>
    </figure>
  );
}
