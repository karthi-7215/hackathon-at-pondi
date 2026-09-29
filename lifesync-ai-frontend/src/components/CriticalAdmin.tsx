import type { AdminItem } from "../data/types";
import { Icon } from "./Icon";

interface Props {
  items: AdminItem[];
  busy: Record<string, boolean>;
  done: Record<string, boolean>;
  onAction: (id: string) => void;
}

export function CriticalAdmin({ items, busy, done, onAction }: Props) {
  return (
    <section className="card panel" aria-labelledby="admin-title">
      <div className="panel__head">
        <div className="panel__title-group">
          <span className="panel__icon">
            <Icon name="bolt" size={14} />
          </span>
          <div>
            <h3 id="admin-title" className="panel__title">Today's Critical Admin</h3>
            <p className="panel__sub">Actionable friction items queued for execution</p>
          </div>
        </div>
        <span className="chip chip--count">{items.length} Actions</span>
      </div>

      <ul className="stack">
        {items.map((item) => {
          const isBusy = busy[`admin:${item.id}`];
          const isDone = done[`admin:${item.id}`];
          return (
            <li className="row" key={item.id}>
              <div className="row__main">
                <span className="row__icon">
                  <Icon name={item.icon === "doctor" ? "medical" : item.icon} size={16} />
                </span>
                <div className="row__text">
                  <div className="row__title-line">
                    <h4 className="row__title">{item.title}</h4>
                    {item.badge && <span className={`badge badge--${item.badge.tone}`}>{item.badge.label}</span>}
                  </div>
                  <p className={`row__meta ${item.metaTone === "danger" ? "row__meta--danger" : ""}`}>
                    {item.amountLabel && (
                      <>
                        <strong>{item.amountLabel}</strong>
                        <span className="sep">•</span>
                      </>
                    )}
                    {item.metaIcon && <Icon name={item.metaIcon} size={11} />}
                    <span>{item.meta}</span>
                  </p>
                </div>
              </div>
              <button
                className={`btn btn--sm ${item.action.variant === "primary" ? "btn--blue" : "btn--chip"}`}
                onClick={() => onAction(item.id)}
                disabled={isBusy || isDone}
              >
                <Icon name={isDone ? "check" : item.action.icon} size={12} />
                {isDone ? "Done" : isBusy ? "Working…" : item.action.label}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
