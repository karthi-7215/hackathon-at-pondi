"""
LifeSync AI - Local Backend & Static Server
Runs a lightweight, zero-dependency Python HTTP server serving both the REST API (/api/*) and static frontend.
Usage:
    py server.py
    Open http://localhost:8000
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import re

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

dashboard_state = {
    "user": {"name": "Arun V.", "shortName": "Arun", "email": "arun@lifesync.ai"},
    "sync": {"appsSynced": 6, "lastSyncedLabel": "2m ago", "sourcesCount": 6},
    "metrics": {
        "cognitiveLoadPct": 68,
        "cognitiveLoadDeltaPct": 32,
        "automationHealthPct": 100,
        "criticalObligations": 3,
    },
    "priority": {
        "id": "ob_insurance_001",
        "urgency": "high",
        "confidencePct": 98,
        "detectedLabel": "Detected 14m ago from Gmail & Vahan Ledger",
        "title": "Vehicle Insurance Renewal",
        "provider": "HDFC ERGO Comprehensive",
        "reference": "Hyundai Creta KA-01-MJ-4021",
        "expiryLabel": "Expires Oct 15, 2026 (6 days away)",
        "amount": 8420,
        "currency": "INR",
        "recommendation": "LifeSync Recommends: Renew by Oct 11",
        "reasoning": [
            {"id": "r1", "source": "Gmail:", "detail": "Policy Expiry Detected", "tone": "danger"},
            {"id": "r2", "source": "Calendar:", "detail": "Goa Road Trip on Oct 17", "tone": "indigo"},
            {"id": "r3", "source": "Historical Pattern:", "detail": "Endorsement takes 2–3 Days", "tone": "violet"},
            {"id": "r4", "source": "User Rule:", "detail": "Avoid Weekend Processing", "tone": "blue"},
        ],
        "narrative": {
            "before": "Your road trip begins ",
            "date1": "October 17",
            "middle": ". Because digital policy endorsement takes 2–3 business days at HDFC ERGO, renewing on ",
            "date2": "Friday, October 11",
            "after": " guarantees active coverage and road hazard assistance before departure without encountering weekend banking freezes.",
        },
        "primaryActionLabel": "Handle Now",
    },
    "adminItems": [
        {
            "id": "adm_bescom",
            "icon": "bolt",
            "title": "Electricity Bill (BESCOM Bangalore)",
            "badge": {"label": "Due Tomorrow", "tone": "danger"},
            "amountLabel": "₹2,340",
            "meta": "Discovered via Gmail PDF",
            "metaIcon": "mail",
            "action": {"label": "Quick Pay", "variant": "primary", "icon": "bolt"},
        },
        {
            "id": "adm_doctor",
            "icon": "doctor",
            "title": "Dr. Sharma Consultation",
            "badge": {"label": "Today @ 4:30 PM", "tone": "indigo"},
            "meta": "Apollo Specialty Hospital, Indiranagar",
            "metaIcon": "calendar",
            "action": {"label": "View Directions & Prep", "variant": "secondary", "icon": "route"},
        },
        {
            "id": "adm_figma",
            "icon": "sparkle",
            "title": "Figma Professional Plan",
            "badge": {"label": "Renews Tomorrow", "tone": "neutral"},
            "amountLabel": "₹1,299/mo",
            "meta": "Alert: Price increased by ₹200",
            "metaIcon": "trend",
            "metaTone": "danger",
            "action": {"label": "Review", "variant": "secondary", "icon": "review"},
        },
    ],
    "upcomingRange": "Oct 12 – Oct 20",
    "upcoming": [
        {
            "id": "up_service",
            "month": "Oct",
            "day": "14",
            "title": "Vehicle General Service Check",
            "subtitle": "Mandatory prep for Goa road trip • Advaith Hyundai",
            "status": {"label": "Confirmed", "tone": "neutral"},
        },
        {
            "id": "up_card",
            "month": "Oct",
            "day": "18",
            "title": "HDFC Regalia Credit Card Statement",
            "amountLabel": "₹42,850",
            "subtitle": "total balance • Auto-debit verified on HDFC Netbanking",
            "status": {"label": "Auto-Pay Ready", "tone": "indigo"},
        },
        {
            "id": "up_water",
            "month": "Oct",
            "day": "20",
            "title": "Water Utility Board (BWSSB)",
            "amountLabel": "₹680",
            "subtitle": "Utility threshold within normal monthly consumption",
            "status": {"label": "Queued", "tone": "muted"},
        },
    ],
    "load": {
        "percentHigher": 32,
        "shiftedTasks": 2,
        "days": [
            {"id": "mon", "label": "Mon", "value": 3, "heightPx": 56, "tone": "blue"},
            {"id": "tue", "label": "Tue", "value": 5, "heightPx": 80, "tone": "indigo"},
            {"id": "wed", "label": "Wed", "value": 2, "heightPx": 40, "tone": "blue"},
            {"id": "thu", "label": "Thu 15", "value": 7, "heightPx": 112, "tone": "danger"},
            {"id": "fri", "label": "Fri", "value": 3, "heightPx": 56, "tone": "blue"},
            {"id": "wknd", "label": "Sat/Sun", "heightPx": 32, "tone": "protected"},
        ],
    },
    "insights": [
        {
            "id": "in_collision",
            "kind": "collision",
            "title": "Trip Travel Window Collision",
            "body": "Insurance renewal window directly collides with your road trip travel day. Pre-authorizing renewal on Oct 11 prevents policy gap while en route.",
            "cta": {"label": "View Dependency", "kind": "link"},
            "applied": True,
        },
        {
            "id": "in_subs",
            "kind": "subscription",
            "title": "Subscription Overlap Detected",
            "body": "2 cloud subscriptions (Google One 2TB & iCloud+ 2TB) possess overlapping storage quotas. Consolidating can save ",
            "highlight": "₹1,200/mo",
            "cta": {"label": "Initiate Cloud Audit", "kind": "button"},
        },
        {
            "id": "in_passport",
            "kind": "document",
            "title": "Passport Validity Threshold",
            "body": "Your Indian Passport expires in 6 months (June 2027). International travel restrictions apply to visas with <6 months validity.",
            "cta": {"label": "Pre-fill Tatkaal Renewal Form", "kind": "external"},
        },
    ],
}


class LifeSyncHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/dashboard"):
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(dashboard_state).encode("utf-8"))
            return

        if path.startswith("/api/search"):
            q_params = urllib.parse.parse_qs(parsed.query)
            q = (q_params.get("q", [""])[0]).lower().strip()
            pool = [
                {"id": "ob_insurance_001", "title": dashboard_state["priority"]["title"], "type": "Priority Obligation", "path": "/"},
                *[{"id": a["id"], "title": a["title"], "type": "Critical Admin", "path": "/"} for a in dashboard_state["adminItems"]],
                *[{"id": u["id"], "title": u["title"], "type": "Upcoming Event", "path": "/timeline"} for u in dashboard_state["upcoming"]],
                *[{"id": i["id"], "title": i["title"], "type": "AI Insight", "path": "/insights"} for i in dashboard_state["insights"]],
            ]
            results = [item for item in pool if q in item["title"].lower() or q in item["type"].lower()] if q else []
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"results": results}).encode("utf-8"))
            return

        if path == "/" or not os.path.exists(os.path.join(BASE_DIR, path.lstrip("/"))):
            self.path = "/index.html"

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        length = int(self.headers.get("Content-Length", 0))
        body_data = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(body_data) if body_data else {}
        except Exception:
            body = {}

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        # /api/obligations/:id/pay
        m_pay = re.match(r"^/api/obligations/([^/]+)/pay$", path)
        if m_pay:
            dashboard_state["metrics"]["criticalObligations"] = max(0, dashboard_state["metrics"]["criticalObligations"] - 1)
            dashboard_state["metrics"]["cognitiveLoadPct"] = max(20, dashboard_state["metrics"]["cognitiveLoadPct"] - 15)
            self.wfile.write(json.dumps({"ok": True, "message": "Payment of ₹8,420 initiated for HDFC ERGO Vehicle Insurance"}).encode("utf-8"))
            return

        # /api/obligations/:id/snooze
        m_snooze = re.match(r"^/api/obligations/([^/]+)/snooze$", path)
        if m_snooze:
            days = body.get("days", 2)
            self.wfile.write(json.dumps({"ok": True, "message": f"Snoozed for {days} days"}).encode("utf-8"))
            return

        # /api/obligations/:id/delegate
        m_del = re.match(r"^/api/obligations/([^/]+)/delegate$", path)
        if m_del:
            self.wfile.write(json.dumps({"ok": True, "message": "Sent to your Chartered Accountant with audit trail"}).encode("utf-8"))
            return

        # /api/admin-items/:id/action
        m_admin = re.match(r"^/api/admin-items/([^/]+)/action$", path)
        if m_admin:
            item_id = m_admin.group(1)
            found = next((x for x in dashboard_state["adminItems"] if x["id"] == item_id), None)
            title = found["title"] if found else item_id
            self.wfile.write(json.dumps({"ok": True, "message": f"Action completed for {title}"}).encode("utf-8"))
            return

        # /api/insights/:id/apply
        m_ins = re.match(r"^/api/insights/([^/]+)/apply$", path)
        if m_ins:
            item_id = m_ins.group(1)
            found = next((x for x in dashboard_state["insights"] if x["id"] == item_id), None)
            if found:
                found["applied"] = True
            self.wfile.write(json.dumps({"ok": True, "message": "Insight applied to schedule"}).encode("utf-8"))
            return

        # /api/ask
        if path == "/api/ask":
            q = body.get("prompt", body.get("query", ""))
            self.wfile.write(json.dumps({
                "ok": True,
                "response": f"LifeSync AI analyzed your 6 data sources: All pending obligations are aligned. Renewing vehicle insurance on Oct 11 guarantees smooth departure for your Oct 17 road trip."
            }).encode("utf-8"))
            return

        # /api/quick-add
        if path == "/api/quick-add":
            title = body.get("title", "New Obligation")
            dashboard_state["adminItems"].insert(0, {
                "id": f"adm_{len(dashboard_state['adminItems']) + 1}",
                "icon": "sparkle",
                "title": title,
                "badge": {"label": "New", "tone": "indigo"},
                "meta": "Added manually",
                "action": {"label": "Review", "variant": "primary", "icon": "review"},
            })
            self.wfile.write(json.dumps({"ok": True, "message": f"Added '{title}' to queue"}).encode("utf-8"))
            return

        self.wfile.write(json.dumps({"ok": True, "message": "OK"}).encode("utf-8"))


if __name__ == "__main__":
    os.chdir(BASE_DIR)
    print(f"======================================================")
    print(f"  LifeSync AI Server running at http://localhost:{PORT}")
    print(f"  Serving static UI and live /api endpoints")
    print(f"  Press Ctrl+C to stop")
    print(f"======================================================")
    with socketserver.TCPServer(("", PORT), LifeSyncHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
