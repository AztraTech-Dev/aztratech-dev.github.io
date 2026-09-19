const columns = [
  {
    label: "CONTROL",
    title: "What should be true",
    items: ["Privileged action needs approval", "Sensitive paths are restricted", "Release conditions are explicit"],
  },
  {
    label: "IMPLEMENTATION",
    title: "How the system enforces it",
    items: ["Authorization policy", "Technical boundary", "Automated and manual checks"],
  },
  {
    label: "EVIDENCE",
    title: "What proves it happened",
    items: ["Test result", "Configuration record", "Change and approval history"],
  },
] as const;

export default function ControlImplementationEvidence() {
  return (
    <figure className="control-evidence-model" aria-labelledby="control-evidence-title">
      <figcaption id="control-evidence-title">Control, Implementation, Evidence</figcaption>
      <div className="control-evidence-model__grid">
        {columns.map((column, index) => (
          <section className="control-evidence-model__column" key={column.label}>
            <div className="control-evidence-model__heading">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{column.label}</p>
            </div>
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="control-evidence-model__note">
        A review is easier when the control, the implementation and the evidence describe the same system behavior.
      </p>
    </figure>
  );
}
