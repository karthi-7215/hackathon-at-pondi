export type Urgency = "high" | "medium" | "low";

export interface User {
  name: string;
  shortName: string;
  email: string;
  avatarUrl?: string;
}

export interface SyncStatus {
  appsSynced: number;
  lastSyncedLabel: string;
  sourcesCount: number;
}

export interface Metrics {
  cognitiveLoadPct: number;
  cognitiveLoadDeltaPct: number;
  automationHealthPct: number;
  criticalObligations: number;
}

export interface ReasoningStep {
  id: string;
  source: string;
  detail: string;
  tone: "danger" | "indigo" | "violet" | "blue";
}

export interface PriorityObligation {
  id: string;
  urgency: Urgency;
  confidencePct: number;
  detectedLabel: string;
  title: string;
  provider: string;
  reference: string;
  expiryLabel: string;
  amount: number;
  currency: "INR";
  recommendation: string;
  reasoning: ReasoningStep[];
  narrative: { before: string; date1: string; middle: string; date2: string; after: string };
  primaryActionLabel: string;
}

export type AdminIcon = "bolt" | "doctor" | "sparkle";

export interface AdminItem {
  id: string;
  icon: AdminIcon;
  title: string;
  badge?: { label: string; tone: "danger" | "indigo" | "neutral" };
  amountLabel?: string;
  meta: string;
  metaIcon?: "mail" | "calendar" | "trend";
  metaTone?: "muted" | "danger";
  action: { label: string; variant: "primary" | "secondary"; icon: "bolt" | "route" | "review" };
}

export interface UpcomingItem {
  id: string;
  month: string;
  day: string;
  title: string;
  subtitle: string;
  amountLabel?: string;
  status: { label: string; tone: "neutral" | "indigo" | "muted" };
}

export interface LoadDay {
  id: string;
  label: string;
  value?: number;
  heightPx: number;
  tone: "blue" | "indigo" | "danger" | "protected";
}

export interface LoadSummary {
  days: LoadDay[];
  percentHigher: number;
  shiftedTasks: number;
}

export interface Insight {
  id: string;
  kind: "collision" | "subscription" | "document";
  title: string;
  body: string;
  highlight?: string;
  cta: { label: string; kind: "link" | "button" | "external" };
  applied?: boolean;
}

export interface DashboardData {
  user: User;
  sync: SyncStatus;
  metrics: Metrics;
  priority: PriorityObligation;
  adminItems: AdminItem[];
  upcoming: UpcomingItem[];
  upcomingRange: string;
  load: LoadSummary;
  insights: Insight[];
}

export interface NavBadge { label: string; tone: "indigo" | "neutral" | "danger" }
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: NavBadge;
}
export interface NavSection { id: string; label: string; items: NavItem[] }
