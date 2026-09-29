import type { Insight } from "../data/types";
import { Icon } from "./Icon";

interface Props {
  items: Insight[];
  busy: Record<string, boolean>;
  done: Record<string, boolean>;
  onApply: (id: string) => void;
}

const KIND_ICON = { collision: "alert", subscription: "cloud", document: "passport" } as const;

export function Insights({ items, busy, done, onApply }: Props) {
  return (
    <section className="card panel" aria-labelledby="insights-title">
      <div className="panel__head">
        <div className="panel__title-group">
          <span className="panel__icon">
            <Icon name="sparkle" size={14} />
          </span>
          <div>
            <h3 id="insights-title" className="panel__title">Proactive AI Insights</h3>
            <p className="panel__sub">Contextual cross-domain optimizations</p>
          </div>
        </div>
        <span className="chip chip--live">Live Feed</span>
      </div>

      <ul className="stack">
        {items.map((it) => {
          const isBusy = busy[`insight:${it.id}`];
          const isDone = done[`insight:${it.id}`] || it.applied;
          return (
            <li className="insight" key={it.id}>
              <Icon
                name={KIND_ICON[it.kind]}
                size={16}
                className={`insight__icon ${it.kind === "collision" ? "insight__icon--danger" : ""}`}
              />
              <div className="insight__body">
                <h4 className="insight__title">{it.title}</h4>
                <p className="insight__text">
                  {it.body}
                  {it.highlight && <strong className="accent">{it.highlight}</strong>}
                  {it.highlight && "."}
                </p>

                {it.cta.kind === "link" && (
                  <div className="insight__foot">
                    <span className="insight__applied">{isDone ? "Applied to Timeline" : "Ready to apply"}</span>
                    <span className="sep">•</span>
                    <button className="link-btn" onClick={() => onApply(it.id)} disabled={isBusy}>
                      {it.cta.label}
                    </button>
                  </div>
                )}
                {it.cta.kind === "button" && (
                  <div className="insight__foot">
                    <button className="btn btn--xs btn--chip" onClick={() => onApply(it.id)} disabled={isBusy || isDone}>
                      {isDone ? "Audit started" : isBusy ? "Starting…" : it.cta.label}
                      <Icon name="arrow" size={10} />
                    </button>
                  </div>
                )}
                {it.cta.kind === "external" && (
                  <div className="insight__foot">
                    <button className="link-btn link-btn--indigo" onClick={() => onApply(it.id)} disabled={isBusy}>
                      {it.cta.label}
                      <Icon name="external" size={11} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
