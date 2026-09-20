const coreStates = [
  "Payment Intent",
  "Transaction State",
  "Provider Routing",
  "Settlement State",
  "Exception State",
] as const;

const externalSystems = [
  "Bank",
  "Payment Provider",
  "Custody / Wallet",
  "Liquidity / FX",
  "Blockchain",
] as const;

export default function PaymentInfrastructureArchitecture() {
  return (
    <figure className="service-diagram payment-architecture" aria-labelledby="payment-architecture-title">
      <figcaption id="payment-architecture-title">
        Payment infrastructure architecture
      </figcaption>

      <div className="payment-architecture__product">
        <span>PRODUCT</span>
        <strong>Product experience and business logic</strong>
      </div>

      <div className="payment-architecture__middle">
        <div className="payment-architecture__side">
          <span>CONTROLS</span>
          <p>Permissions</p>
          <p>Approvals</p>
          <p>Policy rules</p>
        </div>

        <div className="payment-architecture__core">
          <span>PAYMENT CORE</span>
          {coreStates.map((state) => (
            <div key={state}>{state}</div>
          ))}
        </div>

        <div className="payment-architecture__side">
          <span>OPERATIONS</span>
          <p>Reconciliation</p>
          <p>Treasury</p>
          <p>Manual review</p>
        </div>
      </div>

      <div className="payment-architecture__external">
        <span>EXTERNAL INFRASTRUCTURE</span>
        <div>
          {externalSystems.map((system) => (
            <p key={system}>{system}</p>
          ))}
        </div>
      </div>

      <p className="service-diagram__note">
        Provider-specific behavior stays at the integration boundary instead of
        leaking into product logic.
      </p>
    </figure>
  );
}
