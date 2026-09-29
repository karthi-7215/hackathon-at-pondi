import type { DashboardData, NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    id: "core",
    label: "Core",
    items: [
      { id: "dashboard", label: "Dashboard", path: "/", icon: "home" },
      { id: "timeline", label: "Intelligent Timeline", path: "/timeline", icon: "clock" },
      { id: "planner", label: "AI Planner", path: "/planner", icon: "sparkle" },
      { id: "inbox", label: "Universal Inbox", path: "/inbox", icon: "inbox", badge: { label: "8 new", tone: "indigo" } },
    ],
  },
  {
    id: "graph",
    label: "Intelligence & Graph",
    items: [
      { id: "graph", label: "Relationship Graph", path: "/graph", icon: "graph" },
      { id: "automations", label: "Automations", path: "/automations", icon: "refresh" },
    ],
  },
  {
    id: "ecosystem",
    label: "Ecosystem",
    items: [
      { id: "apps", label: "Connected Apps", path: "/apps", icon: "link", badge: { label: "6 active", tone: "neutral" } },
      { id: "payments", label: "Payments & Ledger", path: "/payments", icon: "wallet" },
      { id: "subscriptions", label: "Subscriptions", path: "/subscriptions", icon: "repeat" },
      { id: "vault", label: "Document Vault", path: "/vault", icon: "folder" },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      { id: "notifications", label: "Notifications", path: "/notifications", icon: "bell", badge: { label: "3", tone: "danger" } },
      { id: "analytics", label: "Insights & Analytics", path: "/analytics", icon: "chart" },
    ],
  },
];

export const mockDashboard: DashboardData = {
  user: { name: "Arun V.", shortName: "Arun", email: "arun@lifesync.ai" },
  sync: { appsSynced: 6, lastSyncedLabel: "2m ago", sourcesCount: 6 },
  metrics: {
    cognitiveLoadPct: 68,
    cognitiveLoadDeltaPct: 32,
    automationHealthPct: 100,
    criticalObligations: 3,
  },
  priority: {
    id: "ob_insurance_001",
    urgency: "high",
    confidencePct: 98,
    detectedLabel: "Detected 14m ago from Gmail & Vahan Ledger",
    title: "Vehicle Insurance Renewal",
    provider: "HDFC ERGO Comprehensive",
    reference: "Hyundai Creta KA-01-MJ-4021",
    expiryLabel: "Expires Oct 15, 2026 (6 days away)",
    amount: 8420,
    currency: "INR",
    recommendation: "LifeSync Recommends: Renew by Oct 11",
    reasoning: [
      { id: "r1", source: "Gmail:", detail: "Policy Expiry Detected", tone: "danger" },
      { id: "r2", source: "Calendar:", detail: "Goa Road Trip on Oct 17", tone: "indigo" },
      { id: "r3", source: "Historical Pattern:", detail: "Endorsement takes 2–3 Days", tone: "violet" },
      { id: "r4", source: "User Rule:", detail: "Avoid Weekend Processing", tone: "blue" },
    ],
    narrative: {
      before: "Your road trip begins ",
      date1: "October 17",
      middle: ". Because digital policy endorsement takes 2–3 business days at HDFC ERGO, renewing on ",
      date2: "Friday, October 11",
      after:
        " guarantees active coverage and road hazard assistance before departure without encountering weekend banking freezes.",
    },
    primaryActionLabel: "Handle Now",
  },
  adminItems: [
    {
      id: "adm_bescom",
      icon: "bolt",
      title: "Electricity Bill (BESCOM Bangalore)",
      badge: { label: "Due Tomorrow", tone: "danger" },
      amountLabel: "₹2,340",
      meta: "Discovered via Gmail PDF",
      metaIcon: "mail",
      action: { label: "Quick Pay", variant: "primary", icon: "bolt" },
    },
    {
      id: "adm_doctor",
      icon: "doctor",
      title: "Dr. Sharma Consultation",
      badge: { label: "Today @ 4:30 PM", tone: "indigo" },
      meta: "Apollo Specialty Hospital, Indiranagar",
      metaIcon: "calendar",
      action: { label: "View Directions & Prep", variant: "secondary", icon: "route" },
    },
    {
      id: "adm_figma",
      icon: "sparkle",
      title: "Figma Professional Plan",
      badge: { label: "Renews Tomorrow", tone: "neutral" },
      amountLabel: "₹1,299/mo",
      meta: "Alert: Price increased by ₹200",
      metaIcon: "trend",
      metaTone: "danger",
      action: { label: "Review", variant: "secondary", icon: "review" },
    },
  ],
  upcomingRange: "Oct 12 – Oct 20",
  upcoming: [
    {
      id: "up_service",
      month: "Oct",
      day: "14",
      title: "Vehicle General Service Check",
      subtitle: "Mandatory prep for Goa road trip • Advaith Hyundai",
      status: { label: "Confirmed", tone: "neutral" },
    },
    {
      id: "up_card",
      month: "Oct",
      day: "18",
      title: "HDFC Regalia Credit Card Statement",
      amountLabel: "₹42,850",
      subtitle: "total balance • Auto-debit verified on HDFC Netbanking",
      status: { label: "Auto-Pay Ready", tone: "indigo" },
    },
    {
      id: "up_water",
      month: "Oct",
      day: "20",
      title: "Water Utility Board (BWSSB)",
      amountLabel: "₹680",
      subtitle: "Utility threshold within normal monthly consumption",
      status: { label: "Queued", tone: "muted" },
    },
  ],
  load: {
    percentHigher: 32,
    shiftedTasks: 2,
    days: [
      { id: "mon", label: "Mon", value: 3, heightPx: 56, tone: "blue" },
      { id: "tue", label: "Tue", value: 5, heightPx: 80, tone: "indigo" },
      { id: "wed", label: "Wed", value: 2, heightPx: 40, tone: "blue" },
      { id: "thu", label: "Thu 15", value: 7, heightPx: 112, tone: "danger" },
      { id: "fri", label: "Fri", value: 3, heightPx: 56, tone: "blue" },
      { id: "wknd", label: "Sat/Sun", heightPx: 32, tone: "protected" },
    ],
  },
  insights: [
    {
      id: "in_collision",
      kind: "collision",
      title: "Trip Travel Window Collision",
      body:
        "Insurance renewal window directly collides with your road trip travel day. Pre-authorizing renewal on Oct 11 prevents policy gap while en route.",
      cta: { label: "View Dependency", kind: "link" },
      applied: true,
    },
    {
      id: "in_subs",
      kind: "subscription",
      title: "Subscription Overlap Detected",
      body:
        "2 cloud subscriptions (Google One 2TB & iCloud+ 2TB) possess overlapping storage quotas. Consolidating can save ",
      highlight: "₹1,200/mo",
      cta: { label: "Initiate Cloud Audit", kind: "button" },
    },
    {
      id: "in_passport",
      kind: "document",
      title: "Passport Validity Threshold",
      body:
        "Your Indian Passport expires in 6 months (June 2027). International travel restrictions apply to visas with <6 months validity.",
      cta: { label: "Pre-fill Tatkaal Renewal Form", kind: "external" },
    },
  ],
};
