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

          <div className="map-node map-node--left">
            <span className="map-node__meta">EXTERNAL</span>
            <strong>External systems</strong>
            <small>Providers, banks, custody, chains</small>
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
          <span className="map-connector map-connector--horizontal" aria-hidden="true" />
        </div>
      </div>

      <p className="infrastructure-map__note">
        The product coordinates the system. AztraTech designs and builds the
        infrastructure around those boundaries.
      </p>
    </figure>
  );
}
