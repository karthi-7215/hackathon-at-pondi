import type { LoadSummary } from "../data/types";
import { Icon } from "./Icon";

export function LoadChart({ load }: { load: LoadSummary }) {
  return (
    <section className="card panel" aria-labelledby="load-title">
      <div className="panel__head">
        <div>
          <h3 id="load-title" className="panel__title">Obligation Load &amp; Strain</h3>
          <p className="panel__sub">Computational projection across next 7 days</p>
        </div>
        <Icon name="chartSearch" size={20} className="panel__head-icon" />
      </div>

      <div className="chart">
        <div className="chart__bars" role="img" aria-label="Weekly obligation load, highest on Thursday">
          {load.days.map((d) => {
            const isProtected = d.tone === "protected";
            const isSpike = d.tone === "danger";
            return (
              <div
                className={`bar bar--${d.tone} ${isSpike ? "bar--spike" : ""}`}
                key={d.id}
                tabIndex={isProtected ? -1 : 0}
              >
                <span className="bar__value">{isProtected ? "Protected" : d.value}</span>
                <span className="bar__col" style={{ height: d.heightPx }}>
                  {isProtected && <Icon name="lock" size={11} />}
                </span>
                <span className="bar__label">{d.label}</span>
              </div>
            );
          })}
        </div>

        <p className="chart__note">
          <Icon name="sparkle" size={12} />
          <span>
            Your administrative load is <strong>{load.percentHigher}% higher than last week</strong> due to trip
            preparation deadlines. LifeSync shifted {load.shiftedTasks} low-priority tasks to next week.
          </span>
        </p>
      </div>
    </section>
  );
}
