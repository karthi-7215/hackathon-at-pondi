import { useState } from "react";
import { useDashboard } from "./hooks/useDashboard";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Greeting } from "./components/Greeting";
import { PriorityCard } from "./components/PriorityCard";
import { CriticalAdmin } from "./components/CriticalAdmin";
import { Upcoming } from "./components/Upcoming";
import { LoadChart } from "./components/LoadChart";
import { Insights } from "./components/Insights";
import { Toasts } from "./components/Toasts";

export default function App() {
  const d = useDashboard();
  const [navOpen, setNavOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  if (d.error) {
    return (
      <div className="state">
        <h1 className="state__title">Couldn't load your dashboard</h1>
        <p className="state__text">{d.error}</p>
        <button className="btn btn--blue" onClick={d.reload}>Try again</button>
      </div>
    );
  }

  if (d.loading || !d.data) {
    return (
      <div className="state" aria-busy="true">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--hero" />
        <div className="skeleton skeleton--row" />
      </div>
    );
  }

  const { user, sync, metrics, priority, adminItems, upcoming, upcomingRange, load, insights } = d.data;

  // TODO: wire these to your routes / modals once the backend and other screens exist.
  const todo = (label: string) => () => console.info(`[TODO] ${label}`);

  return (
    <div className="shell">
      <Sidebar
        user={user}
        activeId={active}
        open={navOpen}
        onNavigate={(id) => {
          setActive(id);
          setNavOpen(false);
        }}
        onClose={() => setNavOpen(false)}
      />

      <div className="main">
        <Header
          user={user}
          sync={sync}
          onMenu={() => setNavOpen(true)}
          onAsk={todo("open AI assistant")}
          onQuickAdd={todo("open quick-add dialog")}
        />

        <main className="content">
          <div className="aura" aria-hidden="true">
            <span className="aura__a" />
            <span className="aura__b" />
          </div>

          <Greeting user={user} metrics={metrics} sync={sync} />

          <PriorityCard
            item={priority}
            paying={!!d.busy[`pay:${priority.id}`]}
            paid={!!d.done[`pay:${priority.id}`]}
            onPay={() => d.pay(priority.id)}
            onInspect={todo("open relationship graph")}
            onSnooze={() => d.snooze(priority.id, 2)}
            onDelegate={() => d.delegate(priority.id)}
          />

          <div className="workspace">
            <div className="workspace__col workspace__col--main">
              <CriticalAdmin items={adminItems} busy={d.busy} done={d.done} onAction={d.adminAction} />
              <Upcoming items={upcoming} range={upcomingRange} />
            </div>
            <div className="workspace__col workspace__col--side">
              <LoadChart load={load} />
              <Insights items={insights} busy={d.busy} done={d.done} onApply={d.applyInsight} />
            </div>
          </div>
        </main>
      </div>

      <Toasts toasts={d.toasts} />
    </div>
  );
}
