export default function InfrastructureSystemMap() {
  return (
    <figure className="infrastructure-map" aria-labelledby="infrastructure-map-title">
      <figcaption id="infrastructure-map-title">
        Infrastructure system map
      </figcaption>

      <div className="infrastructure-map__boundary">
        <span>PRODUCT SYSTEM</span>
        <div className="infrastructure-map__network">
          <div className="map-node map-node--top">
            <span className="map-node__meta">ON-CHAIN / OFF-CHAIN</span>
            <strong>Money & assets</strong>
            <small>Value, ownership, settlement state</small>
          </div>

          <div className="map-node map-node--center">
            <span className="map-node__meta">CLIENT</span>
            <strong>Client product</strong>
            <small>Product logic and user experience</small>
          </div>

          <div className="map-node map-node--right">
            <span className="map-node__meta">CONTROL PLANE</span>
            <strong>Controls</strong>
            <small>Permissions, approvals, policy rules</small>
          </div>

          <div className="map-node map-node--bottom">
            <span className="map-node__meta">OPERATIONS</span>
            <strong>Operations</strong>
            <small>Reconciliation, exceptions, monitoring</small>
          </div>

          <span className="map-connector map-connector--vertical" aria-hidden="true" />
          <span className="map-connector map-connector--controls" aria-hidden="true" />
        </div>
      </div>

      <span className="infrastructure-map__external-link" aria-hidden="true" />

      <div className="infrastructure-map__external-boundary">
        <span>EXTERNAL INFRASTRUCTURE</span>
        <strong>Providers, banks, custody and networks</strong>
        <small>
          External dependencies stay outside the product boundary even when the
          product coordinates their state.
        </small>
      </div>

      <p className="infrastructure-map__note">
        The client product coordinates internal state, controls and operations
        while integrations connect that system to external infrastructure.
      </p>
    </figure>
  );
}
