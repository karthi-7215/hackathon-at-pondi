# LifeSync AI — Personal Intelligence & Obligation OS

A fully working personal intelligence dashboard, obligation solver, and causal reasoning OS with local device database storage and celebratory completion popups.

## 🚀 How to Run

### Option 1: Standalone Web App (No Server Needed)
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari).
- Uses persistent client-side device storage (`IndexedDB` + `localStorage`).
- All additions, payments, checklist items, and edits are automatically saved to your device.
- Full offline capability.

### Option 2: Local Device Server (REST API + Local File DB)
Run the bundled Node.js server to persist data directly to `database.json` on your hard drive:
```bash
npm.cmd start
```
Then open your browser to **http://localhost:3000**.

---

## ✨ Features & Activated Capabilities

1. **Local Device Database**:
   - Saves all user inputs, tasks, payments, subscriptions, documents, and settings.
   - Survives browser refreshes and system restarts.
   - Built-in JSON Export & Import in **Settings & Backup** to backup your database anytime.

2. **Celebratory Completion Popups**:
   - **"Objective Completed!" / "Checklist Completed!"** interactive modal triggered when tasks, bills, or checklists are finished.
   - Displays real-time **Cognitive Load Relief (+X%)**, **Ledger Value (₹)**, audio chime synthesis via Web Audio API, and canvas confetti bursts.

3. **Activated Navigation & Views**:
   - **Dashboard**: Live metrics, priority hero card (HDFC ERGO Vehicle Insurance Renewal), critical admin list, upcoming timeline, 7-day strain load chart, proactive AI insights.
   - **Intelligent Timeline**: Chronological event tracker with conflict resolution.
   - **AI Planner & Checklists**: Interactive checklists (Goa Road Trip Prep, October Admin) that trigger checklist completion popups.
   - **Universal Inbox**: 6 categorized feed items with filtering and archive.
   - **Relationship Graph**: Visual causal chain inspector linking Gmail, Vahan, and Calendar.
   - **Automations**: Live toggle switches for utility autopay and travel shield.
   - **Connected Apps**: Ecosystem view with force-sync button.
   - **Payments & Ledger**: Complete ledger tracking transactions and payment recording.
   - **Subscriptions**: SaaS price alerts and duplicate storage optimization.
   - **Document Vault**: Expiry alerts for Passports, RC books, and Driving Licenses.
   - **Notifications**: Actionable real-time alert center.
   - **Settings & Backup**: Editable profile, database JSON export/restore, and reset.

4. **Interactive Controls & Tools**:
   - **Ask LifeSync AI**: Neural assistant that queries and summarizes your actual stored obligations.
   - **Quick Add**: Modal to add custom obligations and bills directly into the device database.
   - **Search Bar (⌘K / Ctrl+K)**: Instant global search across obligations, documents, and subscriptions.
