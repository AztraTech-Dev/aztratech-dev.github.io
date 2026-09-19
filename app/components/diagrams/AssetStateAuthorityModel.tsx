const onchain = ["Token balances", "Transfer events", "Contract permissions"] as const;
const offchain = ["Investor identity", "Legal records", "Eligibility", "Servicing data", "Operational records"] as const;

export default function AssetStateAuthorityModel() {
  return (
    <figure className="service-diagram asset-authority" aria-labelledby="asset-authority-title">
      <figcaption id="asset-authority-title">On-chain / off-chain state and ownership model</figcaption>
      <div className="asset-authority__grid">
        <section className="asset-authority__side">
          <span>ON-CHAIN STATE</span>
          {onchain.map((item) => <p key={item}>{item}</p>)}
        </section>

        <div className="asset-authority__center">
          <span>STATE AUTHORITY</span>
          <strong>Define which record answers each product decision.</strong>
          <small>Authority can differ by decision and jurisdiction.</small>
        </div>

        <section className="asset-authority__side">
          <span>OFF-CHAIN STATE</span>
          {offchain.map((item) => <p key={item}>{item}</p>)}
        </section>
      </div>
    </figure>
  );
}
