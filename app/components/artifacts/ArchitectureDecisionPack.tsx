const items = [
  ["01", "Current-state map", "Systems, actors and trust boundaries"],
  ["02", "Decision register", "Chosen approaches and their tradeoffs"],
  ["03", "Integration boundaries", "State ownership and provider contracts"],
  ["04", "Open questions", "Risks that still need an explicit decision"],
] as const;

export default function ArchitectureDecisionPack() {
  return (
    <figure className="decision-pack" aria-labelledby="decision-pack-title">
      <div className="decision-pack__header">
        <div>
          <span>ILLUSTRATIVE EXAMPLE</span>
          <figcaption id="decision-pack-title">
            Architecture & Technical Decision Pack
          </figcaption>
        </div>
        <span className="decision-pack__mark" aria-hidden="true">AT</span>
      </div>

      <div className="decision-pack__body">
        {items.map(([index, title, body]) => (
          <div className="decision-pack__row" key={title}>
            <span>{index}</span>
            <div>
              <strong>{title}</strong>
              <small>{body}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="decision-pack__footer">
        <span>TECHNICAL WORKING MATERIAL</span>
        <span>SCOPE-SPECIFIC</span>
      </div>
    </figure>
  );
}
