export default function EngagementDecisionModel() {
  return (
    <figure className="engagement-decision" aria-labelledby="engagement-decision-title">
      <figcaption className="engagement-decision__header">
        <span>ENGAGEMENT DECISION MODEL</span>
        <strong id="engagement-decision-title">Start where the uncertainty is.</strong>
      </figcaption>

      <div className="engagement-decision__body">
        <div className="engagement-decision__node engagement-decision__node--start">
          <span>01</span>
          <strong>Current state</strong>
          <p>Product, architecture and operating context already known.</p>
        </div>

        <div className="engagement-decision__question">
          <span>QUESTION</span>
          <strong>What still needs a decision?</strong>
        </div>

        <div className="engagement-decision__routes">
          <div className="engagement-decision__node">
            <span>02A</span>
            <strong>Product &amp; Technical Discovery</strong>
            <p>Use when the product, workflow or technical problem is still under-defined.</p>
          </div>
          <div className="engagement-decision__node">
            <span>02B</span>
            <strong>Architecture &amp; Diagnostic</strong>
            <p>Use when a system exists but important architecture or integration decisions remain open.</p>
          </div>
        </div>

        <div className="engagement-decision__gate">
          <span>DECISION GATE</span>
          <div>
            <strong>BUILD</strong>
            <strong>REVISE</strong>
            <strong>STOP</strong>
          </div>
          <p>A useful diagnostic can reduce scope or stop a larger engagement before unnecessary spend.</p>
        </div>

        <div className="engagement-decision__node engagement-decision__node--delivery">
          <span>03</span>
          <strong>Technical Delivery</strong>
          <p>Build against agreed boundaries, decisions and responsibilities.</p>
        </div>
      </div>
    </figure>
  );
}
