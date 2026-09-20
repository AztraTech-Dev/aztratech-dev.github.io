const inputs = ["Assets", "Trust boundaries", "Privileged paths", "Dependencies"] as const;

export default function ThreatControlModel() {
  return (
    <figure className="service-diagram threat-control" aria-labelledby="threat-control-title">
      <figcaption id="threat-control-title">Threat and control model</figcaption>
      <div className="threat-control__inputs">
        {inputs.map((input, index) => (
          <div key={input}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{input}</strong>
          </div>
        ))}
      </div>
      <div className="threat-control__decision">
        <div>
          <span>THREATS</span>
          <p>What can fail, be abused or be bypassed?</p>
        </div>
        <div>
          <span>CONTROLS</span>
          <p>What prevents, limits, detects or recovers from that failure?</p>
        </div>
      </div>
      <p className="service-diagram__note">
        The model starts with the system and its trust boundaries, then ties
        plausible failure paths to explicit controls.
      </p>
    </figure>
  );
}
