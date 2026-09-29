import type { Metrics, SyncStatus, User } from "../data/types";
import { Icon } from "./Icon";

interface Props {
  user: User;
  metrics: Metrics;
  sync: SyncStatus;
}

function greeting(date = new Date()) {
  const h = date.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ user, metrics, sync }: Props) {
  return (
    <section className="greeting" aria-labelledby="greeting-title">
      <div className="greeting__copy">
        <span className="chip chip--engine">
          <span className="dot dot--violet" />
          ✦ LifeSync Neural Engine is actively synchronizing {sync.sourcesCount} data sources
        </span>
        <h1 id="greeting-title" className="greeting__title">
          {greeting()}, {user.shortName}.
        </h1>
        <p className="greeting__lead">
          You have <strong>{metrics.criticalObligations} critical obligations</strong> requiring decisive
          attention this week.
        </p>
      </div>

      <div className="metrics">
        <div className="metric">
          <span className="metric__icon">
            <Icon name="brain" size={14} />
          </span>
          <div>
            <p className="metric__label">Cognitive Load</p>
            <p className="metric__value">
              {metrics.cognitiveLoadPct}% <span className="metric__delta">(+{metrics.cognitiveLoadDeltaPct}%)</span>
            </p>
          </div>
        </div>
        <div className="metric">
          <span className="metric__icon">
            <Icon name="shield" size={14} />
          </span>
          <div>
            <p className="metric__label">Automation Health</p>
            <p className="metric__value">{metrics.automationHealthPct}% Guarded</p>
          </div>
        </div>
      </div>
    </section>
  );
}
