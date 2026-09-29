import type { Toast } from "../hooks/useDashboard";
import { Icon } from "./Icon";

export function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div className={`toast toast--${t.tone}`} key={t.id}>
          <Icon name={t.tone === "success" ? "check" : "alert"} size={14} />
          {t.message}
        </div>
      ))}
    </div>
  );
}
