// analytics.js — in-memory analytics store
// Tracks: total requests, per-endpoint, per-IP (hashed), per-hour, status codes, latency

'use strict';

const crypto = require('crypto');

// ─── CONFIG ───────────────────────────────────────────────
const MAX_HOURLY_BUCKETS = 48;  // keep 48 hours of hourly data
const MAX_RECENT_REQUESTS = 200; // rolling log

// ─── STORE ────────────────────────────────────────────────
const store = {
  totalRequests: 0,
  totalSuccess: 0,
  totalError: 0,
  startTime: Date.now(),

  // endpoint -> { hits, success, error, totalLatencyMs, minLatency, maxLatency }
  endpoints: {},

  // hashed-ip -> { hits, lastSeen }
  ips: {},

  // 'YYYY-MM-DDTHH' -> { hits, success, error }
  hourly: {},

  // rolling array of last N requests
  recent: [],

  // status code -> count
  statusCodes: {},

  // referrer source (derived from endpoint category)
  categories: {}
};

// ─── HELPERS ──────────────────────────────────────────────
function hashIp(ip) {
  return crypto.createHash('sha256').update(ip || 'unknown').digest('hex').slice(0, 12);
}

function hourKey(ts) {
  const d = new Date(ts);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth()+1).padStart(2,'0')}-${String(d.getUTCDate()).padStart(2,'0')}T${String(d.getUTCHours()).padStart(2,'0')}`;
}

function pruneHourly() {
  const keys = Object.keys(store.hourly).sort();
  while (keys.length > MAX_HOURLY_BUCKETS) {
    delete store.hourly[keys.shift()];
  }
}

// ─── RECORD ────────────────────────────────────────────────
function record({ endpoint, ip, statusCode, latencyMs, success }) {
  const ts = Date.now();
  const hk = hourKey(ts);

  // totals
  store.totalRequests++;
  if (success) store.totalSuccess++;
  else store.totalError++;

  // endpoint stats
  if (!store.endpoints[endpoint]) {
    store.endpoints[endpoint] = { hits: 0, success: 0, error: 0, totalLatencyMs: 0, minLatency: Infinity, maxLatency: 0 };
  }
  const ep = store.endpoints[endpoint];
  ep.hits++;
  if (success) ep.success++; else ep.error++;
  ep.totalLatencyMs += latencyMs;
  if (latencyMs < ep.minLatency) ep.minLatency = latencyMs;
  if (latencyMs > ep.maxLatency) ep.maxLatency = latencyMs;

  // ip tracking (hashed for privacy)
  const ipHash = hashIp(ip);
  if (!store.ips[ipHash]) store.ips[ipHash] = { hits: 0, lastSeen: ts };
  store.ips[ipHash].hits++;
  store.ips[ipHash].lastSeen = ts;

  // hourly buckets
  if (!store.hourly[hk]) store.hourly[hk] = { hits: 0, success: 0, error: 0 };
  store.hourly[hk].hits++;
  if (success) store.hourly[hk].success++;
  else store.hourly[hk].error++;
  pruneHourly();

  // status codes
  const sc = String(statusCode || 0);
  store.statusCodes[sc] = (store.statusCodes[sc] || 0) + 1;

  // recent log
  store.recent.unshift({
    ts,
    endpoint,
    statusCode,
    latencyMs,
    success,
    ipHash
  });
  if (store.recent.length > MAX_RECENT_REQUESTS) store.recent.length = MAX_RECENT_REQUESTS;
}

// ─── SNAPSHOT ──────────────────────────────────────────────
function snapshot() {
  const uptime = Math.floor((Date.now() - store.startTime) / 1000);
  const uniqueIps = Object.keys(store.ips).length;
  const errorRate = store.totalRequests > 0
    ? ((store.totalError / store.totalRequests) * 100).toFixed(1)
    : '0.0';

  // top 10 endpoints by hits
  const topEndpoints = Object.entries(store.endpoints)
    .map(([name, s]) => ({
      name,
      hits: s.hits,
      success: s.success,
      error: s.error,
      avgLatencyMs: s.hits > 0 ? Math.round(s.totalLatencyMs / s.hits) : 0,
      minLatency: s.minLatency === Infinity ? 0 : s.minLatency,
      maxLatency: s.maxLatency,
      errorRate: s.hits > 0 ? ((s.error / s.hits) * 100).toFixed(1) : '0.0'
    }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 15);

  // hourly chart data — last 24h
  const now = new Date();
  const hourlyChart = [];
  for (let i = 23; i >= 0; i--) {
    const d = new Date(now);
    d.setUTCHours(d.getUTCHours() - i, 0, 0, 0);
    const key = hourKey(d.getTime());
    const bucket = store.hourly[key] || { hits: 0, success: 0, error: 0 };
    hourlyChart.push({
      label: `${String(d.getUTCHours()).padStart(2,'0')}:00`,
      hits: bucket.hits,
      success: bucket.success,
      error: bucket.error
    });
  }

  // status code distribution
  const statusDist = Object.entries(store.statusCodes)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count);

  // recent requests (last 20)
  const recentRequests = store.recent.slice(0, 20).map(r => ({
    time: new Date(r.ts).toISOString(),
    endpoint: r.endpoint,
    statusCode: r.statusCode,
    latencyMs: r.latencyMs,
    success: r.success
  }));

  // avg latency overall
  const allLatencies = Object.values(store.endpoints);
  const totalLatMs = allLatencies.reduce((s, e) => s + e.totalLatencyMs, 0);
  const avgLatency = store.totalRequests > 0 ? Math.round(totalLatMs / store.totalRequests) : 0;

  return {
    uptime,
    totalRequests: store.totalRequests,
    totalSuccess: store.totalSuccess,
    totalError: store.totalError,
    uniqueIps,
    errorRate,
    avgLatency,
    topEndpoints,
    hourlyChart,
    statusDist,
    recentRequests,
    startTime: new Date(store.startTime).toISOString()
  };
}

// ─── MIDDLEWARE ────────────────────────────────────────────
function middleware(req, res, next) {
  // only track /api/:endpoint hits
  const match = req.path.match(/^\/api\/(.+)$/);
  if (!match) return next();

  const endpoint = match[1];
  const start = Date.now();
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';

  res.on('finish', () => {
    const latencyMs = Date.now() - start;
    const statusCode = res.statusCode;
    const success = statusCode >= 200 && statusCode < 400;
    record({ endpoint, ip, statusCode, latencyMs, success });
  });

  next();
}

module.exports = { middleware, record, snapshot };
