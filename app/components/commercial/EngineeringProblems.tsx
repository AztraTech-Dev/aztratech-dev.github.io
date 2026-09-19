const problems = [
  {
    title: "State ownership",
    body:
      "Define which system is authoritative for each decision instead of letting provider responses become product state by accident.",
  },
  {
    title: "Provider boundaries",
    body:
      "Keep vendor-specific APIs and terminology behind an integration layer so the rest of the product stays coherent.",
  },
  {
    title: "Exceptions and reconciliation",
    body:
      "Design for pending, partial and conflicting states, then give operations a way to identify and resolve them.",
  },
  {
    title: "Controls and privileged paths",
    body:
      "Make sensitive actions, approvals and operational access explicit before they become release or incident problems.",
  },
] as const;

export default function EngineeringProblems() {
  return (
    <div className="engineering-problems">
      {problems.map((problem, index) => (
        <article className="engineering-problem" key={problem.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{problem.title}</h3>
            <p>{problem.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
