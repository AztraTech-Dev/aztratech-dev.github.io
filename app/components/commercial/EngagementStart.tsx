const paths = [
  {
    title: "Product & Technical Discovery",
    signal: "The problem is real, but important decisions are still open.",
    body:
      "Clarify the product context, constraints and the questions that need technical answers before a larger scope is defined.",
  },
  {
    title: "Architecture & Diagnostic",
    signal: "A system exists and the team needs a focused technical review.",
    body:
      "Review architecture, state boundaries, integrations and risks, then turn findings into concrete decisions and next steps.",
  },
  {
    title: "Technical Delivery",
    signal: "The scope is understood well enough to build.",
    body:
      "Take ownership of an agreed engineering outcome and deliver it with the client's product, engineering and provider teams.",
  },
  {
    title: "Scale & Continued Engineering",
    signal: "The system is live and new operational or technical pressure is appearing.",
    body:
      "Extend integrations, harden controls, resolve architectural friction and support continued engineering as the product evolves.",
  },
] as const;

export default function EngagementStart() {
  return (
    <div className="engagement-paths">
      {paths.map((path, index) => (
        <article className="engagement-path" key={path.title}>
          <span className="engagement-path__index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3>{path.title}</h3>
          <p className="engagement-path__signal">{path.signal}</p>
          <p>{path.body}</p>
        </article>
      ))}
    </div>
  );
}
