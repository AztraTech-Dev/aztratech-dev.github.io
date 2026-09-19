const lifecycle = [
  "Onboarding",
  "Eligibility",
  "Subscription",
  "Issuance",
  "Ownership",
  "Transfers",
  "Servicing",
  "Redemption",
  "Reporting",
] as const;

export default function AssetLifecycleModel() {
  return (
    <figure className="service-diagram asset-lifecycle" aria-labelledby="asset-lifecycle-title">
      <figcaption id="asset-lifecycle-title">Asset lifecycle model</figcaption>
      <div className="asset-lifecycle__track">
        {lifecycle.map((stage, index) => (
          <div
            className={stage === "Issuance" ? "asset-lifecycle__stage asset-lifecycle__stage--issuance" : "asset-lifecycle__stage"}
            key={stage}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
      <p className="asset-lifecycle__note">
        Issuance creates the token. The product still has to manage the asset after that event.
      </p>
    </figure>
  );
}
