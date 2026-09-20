const outputs = [
  ["01", "Current-state map", "Systems, integrations and boundaries that already exist."],
  ["02", "Decision register", "Important choices, assumptions and unresolved trade-offs."],
  ["03", "Architecture boundaries", "Responsibilities between product logic, integrations and operations."],
  ["04", "Open technical questions", "Unknowns that can materially change scope or implementation."],
  ["05", "Recommended next step", "Build, revise, investigate further or stop before larger spend."],
] as const;

export default function ArchitectureDiagnosticOutput() {
  return (
    <aside className="diagnostic-output" aria-label="Illustrative architecture diagnostic output">
      <div className="diagnostic-output__header">
        <div>
          <span>ILLUSTRATIVE EXAMPLE</span>
          <strong>Architecture Diagnostic Output</strong>
        </div>
        <span className="diagnostic-output__status">DIAGNOSTIC</span>
      </div>
      <div className="diagnostic-output__body">
        {outputs.map(([index, title, body]) => (
          <div className="diagnostic-output__row" key={title}>
            <span>{index}</span>
            <div>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="diagnostic-output__footer">
        <span>TECHNICAL WORKING MATERIAL</span>
        <span>DIAGNOSTIC OUTPUT</span>
      </div>
    </aside>
  );
}
