import type { PriorityObligation } from "../data/types";
import { formatINR } from "../utils/format";
import { Icon } from "./Icon";

interface Props {
  item: PriorityObligation;
  paying: boolean;
  paid: boolean;
  onPay: () => void;
  onInspect: () => void;
  onSnooze: () => void;
  onDelegate: () => void;
}

const URGENCY_LABEL = { high: "High Urgency", medium: "Medium Urgency", low: "Low Urgency" } as const;

export function PriorityCard({ item, paying, paid, onPay, onInspect, onSnooze, onDelegate }: Props) {
  const n = item.narrative;
  return (
    <section className="hero card" aria-labelledby="priority-title">
      <span className="hero__glow" aria-hidden="true" />
      <span className="hero__edge" aria-hidden="true" />

      <div className="hero__body">
        <div className="hero__meta">
          <div className="hero__badges">
            <span className="chip chip--urgent">
              <span className="dot dot--pink" />
              Priority #1 • {URGENCY_LABEL[item.urgency]}
            </span>
            <span className="chip chip--confidence">
              <Icon name="sparkle" size={12} />
              {item.confidencePct}% AI Confidence
            </span>
          </div>
          <span className="hero__detected">
            <Icon name="calendar" size={12} />
            {item.detectedLabel}
          </span>
        </div>

        <div className="hero__head">
          <div className="hero__titles">
            <h2 id="priority-title" className="hero__title">
              {item.title}
            </h2>
            <div className="hero__sub">
              <span className="tag">{item.provider}</span>
              <span className="sep">•</span>
              <span className="mono">{item.reference}</span>
              <span className="sep">•</span>
            </div>
            <p className="hero__expiry">
              <Icon name="alert" size={13} />
              {item.expiryLabel}
            </p>
          </div>

          <div className="hero__price">
            <p className="eyebrow">Premium Payable</p>
            <p className="hero__amount">{formatINR(item.amount)}</p>
            <p className="hero__recommend">
              <Icon name="bolt" size={12} />
              {item.recommendation}
            </p>
          </div>
        </div>

        <div className="reasoning">
          <p className="eyebrow eyebrow--icon">
            <Icon name="graph" size={13} />
            Causal Reasoning Graph
          </p>
          <ul className="reasoning__flow">
            {item.reasoning.map((step, i) => (
              <li className="reasoning__step" key={step.id}>
                <span className="flow-tag">
                  <span className={`dot dot--${step.tone}`} />
                  <span className="flow-tag__src">{step.source}</span>
                  <span className="flow-tag__detail">{step.detail}</span>
                </span>
                {i < item.reasoning.length - 1 && <Icon name="arrow" size={12} className="reasoning__arrow" />}
              </li>
            ))}
          </ul>
          <p className="reasoning__narrative">
            {n.before}
            <strong>{n.date1}</strong>
            {n.middle}
            <strong className="accent">{n.date2}</strong>
            {n.after}
          </p>
        </div>

        <div className="hero__actions">
          <div className="hero__primary">
            <button className="btn btn--lg btn--soft-blue" onClick={onPay} disabled={paying || paid}>
              <Icon name={paid ? "check" : "lock"} size={14} />
              {paid ? "Payment initiated" : paying ? "Processing…" : `${item.primaryActionLabel} • Pay ${formatINR(item.amount)}`}
            </button>
            <button className="btn btn--lg btn--chip" onClick={onInspect}>
              <Icon name="graph" size={15} />
              Inspect Relationship Graph
            </button>
          </div>
          <div className="hero__secondary">
            <button className="btn btn--text" onClick={onSnooze}>
              <Icon name="snooze" size={14} />
              Snooze 2 Days
            </button>
            <button className="btn btn--text" onClick={onDelegate}>
              <Icon name="delegate" size={14} />
              Delegate to CA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
