import { useCallback, useEffect, useState } from "react";
import { api, type ActionResult } from "../api/client";
import type { DashboardData } from "../data/types";

export type Toast = { id: number; message: string; tone: "success" | "error" };

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [toasts, setToasts] = useState<Toast[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await api.getDashboard());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const pushToast = useCallback((message: string, tone: Toast["tone"]) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  const run = useCallback(
    async (key: string, fn: () => Promise<ActionResult>, markDone = false) => {
      setBusy((b) => ({ ...b, [key]: true }));
      try {
        const res = await fn();
        pushToast(res.message, res.ok ? "success" : "error");
        if (res.ok && markDone) setDone((d) => ({ ...d, [key]: true }));
      } catch (e) {
        pushToast(e instanceof Error ? e.message : "Action failed", "error");
      } finally {
        setBusy((b) => ({ ...b, [key]: false }));
      }
    },
    [pushToast],
  );

  return {
    data,
    loading,
    error,
    busy,
    done,
    toasts,
    reload: load,
    pay: (id: string) => run(`pay:${id}`, () => api.payObligation(id), true),
    snooze: (id: string, days = 2) => run(`snooze:${id}`, () => api.snoozeObligation(id, days)),
    delegate: (id: string) => run(`delegate:${id}`, () => api.delegateObligation(id)),
    adminAction: (id: string) => run(`admin:${id}`, () => api.runAdminAction(id), true),
    applyInsight: (id: string) => run(`insight:${id}`, () => api.applyInsight(id), true),
  };
}
