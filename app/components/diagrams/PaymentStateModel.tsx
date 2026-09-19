const states = [
  ["YOUR PRODUCT", "PROCESSING"],
  ["PROVIDER", "COMPLETED"],
  ["BLOCKCHAIN", "CONFIRMED"],
  ["PAYOUT RAIL", "PENDING"],
] as const;

export default function PaymentStateModel() {
  return (
    <figure className="service-diagram payment-state-model" aria-labelledby="payment-state-title">
      <figcaption id="payment-state-title">One payment. Several states.</figcaption>
      <div className="payment-state-model__flow">
        {states.map(([system, state], index) => (
          <div className="payment-state-model__node" key={system}>
            <span>{system}</span>
            <strong>{state}</strong>
            {index < states.length - 1 ? (
              <i aria-hidden="true" className="payment-state-model__connector" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="payment-state-model__result">
        <span>RECONCILIATION</span>
        <strong>REQUIRED</strong>
        <p>The system still needs a deliberate answer when the records disagree.</p>
      </div>
    </figure>
  );
}
