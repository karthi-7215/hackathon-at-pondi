import type { UpcomingItem } from "../data/types";
import { Icon } from "./Icon";

export function Upcoming({ items, range }: { items: UpcomingItem[]; range: string }) {
  return (
    <section className="card panel" aria-labelledby="upcoming-title">
      <div className="panel__head">
        <div className="panel__title-group">
          <span className="panel__icon">
            <Icon name="calendar" size={14} />
          </span>
          <div>
            <h3 id="upcoming-title" className="panel__title">Upcoming This Week</h3>
            <p className="panel__sub">Synthesized timeline for pre-trip stability</p>
          </div>
        </div>
        <span className="panel__range">{range}</span>
      </div>

      <ul className="stack stack--tight">
        {items.map((u) => (
          <li className="row row--soft" key={u.id}>
            <div className="row__main row__main--center">
              <span className="date-tile">
                <span className="date-tile__month">{u.month}</span>
                <span className="date-tile__day">{u.day}</span>
              </span>
              <div className="row__text">
                <h4 className="row__title">{u.title}</h4>
                <p className="row__meta row__meta--soft">
                  {u.amountLabel && <strong>{u.amountLabel}</strong>}
                  <span>{u.subtitle}</span>
                </p>
              </div>
            </div>
            <span className={`status status--${u.status.tone}`}>{u.status.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
