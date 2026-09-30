const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'database.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Read DB helper
function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading database.json:', err);
  }
  return null;
}

// Save DB helper
function saveDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error saving database.json:', err);
    return false;
  }
}

// REST API Endpoints
app.get('/api/dashboard', (req, res) => {
  const db = readDb();
  if (db) {
    return res.json(db);
  }
  res.status(404).json({ error: 'Database not initialized on server. Client will seed.' });
});

app.post('/api/sync', (req, res) => {
  const data = req.body;
  if (!data) return res.status(400).json({ error: 'No data provided' });
  const ok = saveDb(data);
  res.json({ ok, message: 'Device database synced successfully' });
});

app.post('/api/obligations/:id/pay', (req, res) => {
  const db = readDb();
  if (!db) return res.status(500).json({ error: 'No database' });
  db.priority.completed = true;
  db.metrics.criticalObligations = Math.max(0, db.metrics.criticalObligations - 1);
  db.metrics.cognitiveLoadPct = Math.max(10, db.metrics.cognitiveLoadPct - 24);
  db.transactions.unshift({
    id: 'tx_' + Date.now(),
    title: 'Vehicle Insurance Renewal (HDFC ERGO)',
    amount: db.priority.amount,
    date: 'Today',
    status: 'Paid',
    category: 'Automotive'
  });
  saveDb(db);
  res.json({ ok: true, message: 'Payment of ₹8,420 processed and logged to ledger' });
});

app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const db = readDb();
  if (!db || !q) return res.json({ results: [] });
  
  const results = [];
  if (db.priority.title.toLowerCase().includes(q)) {
    results.push({ id: db.priority.id, title: db.priority.title, type: 'Priority Obligation' });
  }
  db.adminItems.forEach(i => {
    if (i.title.toLowerCase().includes(q)) results.push({ id: i.id, title: i.title, type: 'Admin Task' });
  });
  db.vaultDocuments.forEach(d => {
    if (d.name.toLowerCase().includes(q)) results.push({ id: d.id, title: d.name, type: 'Vault Document' });
  });
  res.json({ results });
});

app.listen(PORT, () => {
  console.log('🚀 LifeSync AI Device Server running on http://localhost:' + PORT);
  console.log('📱 Local Device Database: ' + DB_FILE);
});
