// Vercel Serverless Function: LifeSync AI Backend API
// Compatible with Node.js 18+ and Vercel Serverless Functions

let dashboardState = {
  user: { name: "Arun V.", shortName: "Arun", email: "arun@lifesync.ai", avatarUrl: "" },
  sync: { appsSynced: 6, lastSyncedLabel: "Just now", sourcesCount: 6 },
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

function parseBody(req) {
  return new Promise((resolve) => {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
}

module.exports = async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  let pathname = url.pathname.replace(/^\/api/, "");
  if (!pathname.startsWith("/")) pathname = "/" + pathname;

  const method = req.method?.toUpperCase() || "GET";
  const body = method === "POST" || method === "PUT" ? await parseBody(req) : {};

  res.setHeader("Content-Type", "application/json");

  // Route: GET /dashboard
  if (pathname === "/dashboard" || pathname === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      return res.end(JSON.stringify(dashboardState));
    }
  }

  // Route: POST /obligations/:id/pay
  const payMatch = pathname.match(/^\/obligations\/([^/]+)\/pay$/);
  if (payMatch && method === "POST") {
    const id = decodeURIComponent(payMatch[1]);
    dashboardState.metrics.criticalObligations = Math.max(0, dashboardState.metrics.criticalObligations - 1);
    dashboardState.metrics.cognitiveLoadPct = Math.max(20, dashboardState.metrics.cognitiveLoadPct - 15);
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      message: `Payment initiated for obligation ${id} (₹${dashboardState.priority.amount})`,
    }));
  }

  // Route: POST /obligations/:id/snooze
  const snoozeMatch = pathname.match(/^\/obligations\/([^/]+)\/snooze$/);
  if (snoozeMatch && method === "POST") {
    const days = body.days || 2;
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      message: `Obligation postponed by ${days} days`,
    }));
  }

  // Route: POST /obligations/:id/delegate
  const delegateMatch = pathname.match(/^\/obligations\/([^/]+)\/delegate$/);
  if (delegateMatch && method === "POST") {
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      message: "Delegated securely to your Chartered Accountant with attached ledger context",
    }));
  }

  // Route: POST /admin-items/:id/action
  const adminMatch = pathname.match(/^\/admin-items\/([^/]+)\/action$/);
  if (adminMatch && method === "POST") {
    const id = decodeURIComponent(adminMatch[1]);
    const item = dashboardState.adminItems.find((a) => a.id === id);
    const actionName = item ? item.action.label : "Action";
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      message: `Completed: ${actionName} for "${item ? item.title : id}"`,
    }));
  }

  // Route: POST /insights/:id/apply
  const insightMatch = pathname.match(/^\/insights\/([^/]+)\/apply$/);
  if (insightMatch && method === "POST") {
    const id = decodeURIComponent(insightMatch[1]);
    const item = dashboardState.insights.find((i) => i.id === id);
    if (item) item.applied = true;
    res.statusCode = 200;
    return res.end(JSON.stringify({
      ok: true,
      message: `Applied proactive recommendation: "${item ? item.title : id}"`,
    }));
  }

  // Route: GET /search?q=
  if (pathname === "/search" && method === "GET") {
    const q = (url.searchParams.get("q") || "").toLowerCase().trim();
    if (!q) {
      res.statusCode = 200;
      return res.end(JSON.stringify({ results: [] }));
    }
    const pool = [
      { id: "ob_insurance_001", title: dashboardState.priority.title, type: "Priority Obligation", path: "/" },
      ...dashboardState.adminItems.map((a) => ({ id: a.id, title: a.title, type: "Critical Admin", path: "/" })),
      ...dashboardState.upcoming.map((u) => ({ id: u.id, title: u.title, type: "Upcoming Event", path: "/timeline" })),
      ...dashboardState.insights.map((i) => ({ id: i.id, title: i.title, type: "AI Insight", path: "/insights" })),
      { id: "app_gmail", title: "Google Workspace & Gmail Sync", type: "Connected App", path: "/apps" },
      { id: "app_vahan", title: "Vahan Vehicle Ledger", type: "Connected App", path: "/apps" },
      { id: "app_hdfc", title: "HDFC Netbanking Integration", type: "Payment Source", path: "/payments" },
    ];
    const results = pool.filter((item) => item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q));
    res.statusCode = 200;
    return res.end(JSON.stringify({ results }));
  }

  // Route: POST /ask (AI Assistant query)
  if (pathname === "/ask" && method === "POST") {
    const prompt = body.prompt || body.query || "";
    const answer = `Based on your synchronized calendar and obligations, ${
      prompt ? `regarding "${prompt}": ` : ""
    }LifeSync has optimized your upcoming schedule. Vehicle insurance renewal is scheduled for Oct 11 to avoid road trip conflicts on Oct 17.`;
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, response: answer }));
  }

  // Route: POST /quick-add
  if (pathname === "/quick-add" && method === "POST") {
    const { title, type = "admin", amount } = body;
    if (title) {
      dashboardState.adminItems.unshift({
        id: "adm_" + Date.now(),
        icon: "sparkle",
        title: title,
        badge: { label: "New", tone: "indigo" },
        amountLabel: amount ? `₹${amount}` : undefined,
        meta: "Added manually via Quick Add",
        action: { label: "Review", variant: "primary", icon: "review" },
      });
      dashboardState.metrics.criticalObligations += 1;
    }
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true, message: `Added "${title}" to your queue` }));
  }

  // Health check
  if (pathname === "/health") {
    res.statusCode = 200;
    return res.end(JSON.stringify({ status: "healthy", timestamp: new Date().toISOString() }));
  }

  // 404 Not Found
  res.statusCode = 404;
  return res.end(JSON.stringify({ error: `Not found: ${method} ${pathname}` }));
};
