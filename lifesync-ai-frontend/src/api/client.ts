/**
 * API client — the single seam between this UI and your backend.
 *
 * Toggle VITE_USE_MOCKS=false in .env to call the real endpoints below.
 * Every function documents the HTTP contract the backend should implement.
 */
import { mockDashboard } from "../data/mock";
import type { DashboardData } from "../data/types";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== "false";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include", // send session cookies; remove if you use bearer tokens only
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${getToken()}`,
      ...(init.headers || {}),
    },
    ...init,
  });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      message = body.message || body.detail || message;
    } catch {
      /* non-JSON error body */
    }
    throw new ApiError(message, res.status);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface ActionResult {
  ok: boolean;
  message: string;
}

export const api = {
  /** GET /dashboard → DashboardData */
  async getDashboard(): Promise<DashboardData> {
    if (USE_MOCKS) {
      await wait(350);
      return structuredClone(mockDashboard);
    }
    return request<DashboardData>("/dashboard");
  },

  /** POST /obligations/:id/pay → ActionResult */
  async payObligation(id: string): Promise<ActionResult> {
    if (USE_MOCKS) {
      await wait(600);
      return { ok: true, message: "Payment initiated" };
    }
    return request<ActionResult>(`/obligations/${encodeURIComponent(id)}/pay`, { method: "POST" });
  },

  /** POST /obligations/:id/snooze  body: { days } → ActionResult */
  async snoozeObligation(id: string, days: number): Promise<ActionResult> {
    if (USE_MOCKS) {
      await wait(400);
      return { ok: true, message: `Snoozed for ${days} days` };
    }
    return request<ActionResult>(`/obligations/${encodeURIComponent(id)}/snooze`, {
      method: "POST",
      body: JSON.stringify({ days }),
    });
  },

  /** POST /obligations/:id/delegate  body: { delegate: "ca" } → ActionResult */
  async delegateObligation(id: string): Promise<ActionResult> {
    if (USE_MOCKS) {
      await wait(400);
      return { ok: true, message: "Sent to your CA" };
    }
    return request<ActionResult>(`/obligations/${encodeURIComponent(id)}/delegate`, {
      method: "POST",
      body: JSON.stringify({ delegate: "ca" }),
    });
  },

  /** POST /admin-items/:id/action → ActionResult */
  async runAdminAction(id: string): Promise<ActionResult> {
    if (USE_MOCKS) {
      await wait(500);
      return { ok: true, message: "Done" };
    }
    return request<ActionResult>(`/admin-items/${encodeURIComponent(id)}/action`, { method: "POST" });
  },

  /** POST /insights/:id/apply → ActionResult */
  async applyInsight(id: string): Promise<ActionResult> {
    if (USE_MOCKS) {
      await wait(500);
      return { ok: true, message: "Insight applied" };
    }
    return request<ActionResult>(`/insights/${encodeURIComponent(id)}/apply`, { method: "POST" });
  },

  /** GET /search?q= → { results: {id,title,type,path}[] } */
  async search(q: string): Promise<{ results: { id: string; title: string; type: string; path: string }[] }> {
    if (USE_MOCKS) {
      await wait(200);
      return { results: [] };
    }
    return request(`/search?q=${encodeURIComponent(q)}`);
  },
};
