# LifeSync AI — Fullstack Dashboard (Vercel & Local Ready)

A full-stack, intelligent personal dashboard with complete backend APIs, causal reasoning graphs, load strain computation, and proactive AI insights.

---

## 🚀 How to Host on Vercel (2 Easy Options)

### Option 1: Drag & Drop (Instant Deployment)
1. Go to **[vercel.com](https://vercel.com)** and log in.
2. Drag and drop the `lifesync-ai-frontend` folder or `index.html` directly into the Vercel dashboard.
3. Your live URL will be ready immediately!

### Option 2: Deploy with Git / Vercel CLI
1. Push this folder to a GitHub repository.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Vercel automatically detects the static frontend and the Serverless backend in `api/` via `vercel.json`.
4. Click **Deploy**!

---

## 💻 Running Locally on Windows

You can run the full backend & frontend immediately using Python (no Node/npm installation required):

```powershell
py server.py
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

Or double-click `index.html` to run it directly in your browser.

---

## 📡 Live Backend API Endpoints

The backend is implemented as Vercel Serverless Functions in `api/index.js` (and locally via `server.py`):

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard` | Returns current user profile, cognitive load metrics, priority obligation, critical admin queue, upcoming events, load projection, and AI insights. |
| `POST` | `/api/obligations/:id/pay` | Executes payment transaction, updates cognitive load, and triggers confirmation. |
| `POST` | `/api/obligations/:id/snooze` | Postpones obligation by specified days. |
| `POST` | `/api/obligations/:id/delegate` | Forwards obligation context to Chartered Accountant. |
| `POST` | `/api/admin-items/:id/action` | Executes friction admin action (BESCOM Quick Pay, Doctor Consultation prep, Figma Plan review). |
| `POST` | `/api/insights/:id/apply` | Applies proactive schedule optimization or triggers audit. |
| `GET` | `/api/search?q=query` | Live search through obligations, connected apps, and documents. |
| `POST` | `/api/ask` | Interactive conversational query engine for LifeSync AI assistant. |
| `POST` | `/api/quick-add` | Dynamically appends a new obligation to the critical admin queue. |
| `GET` | `/api/health` | Healthcheck endpoint. |

---

## 📁 Project Architecture

```
lifesync-ai-frontend/
├── index.html          # Standalone, interactive React UI with Figma tokens & design
├── vercel.json         # Vercel deployment routing (APIs + Static Frontend)
├── server.py           # Zero-dependency local backend & static HTTP server
├── api/
│   ├── index.js        # Vercel Serverless Function handling all /api/* routes
│   └── dashboard.js    # Vercel Serverless endpoint for /api/dashboard
├── src/                # Modular React + TypeScript source code
│   ├── api/client.ts   # API client seam
│   ├── components/     # Header, Sidebar, PriorityCard, CriticalAdmin, Insights, etc.
│   ├── styles/         # Figma design tokens & stylesheet
│   └── data/           # Types & mock data
└── README.md
```
