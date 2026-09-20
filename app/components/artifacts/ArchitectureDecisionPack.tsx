const items = [
  ["01", "Target architecture", "System boundaries and the intended operating model"],
  ["02", "State & control model", "Ownership, transitions, permissions and exception paths"],
  ["03", "Integration contracts", "Provider boundaries, interfaces and failure behavior"],
  ["04", "Decision register", "Chosen approaches, assumptions and explicit trade-offs"],
  ["05", "Implementation backlog", "Sequenced engineering work required to move forward"],
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
        <span className="decision-pack__meta">SCOPE-SPECIFIC</span>
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
        <span>DELIVERY DECISION PACK</span>
      </div>
    </figure>
  );
}
