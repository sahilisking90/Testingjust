'use strict';

// ─────────────────────────────────────────────
//  tg-sync.js  —  Auto DB → Telegram + Upload
//  Sends SQLite DB file to your Telegram chat
//  every N minutes, and on every redeploy.
// ─────────────────────────────────────────────

const fs     = require('fs');
const path   = require('path');
const axios  = require('axios');
const FormData = require('form-data');

const BOT_TOKEN = process.env.TG_BOT_TOKEN || '8688463787:AAHP38b3fDM0H4_VS1fGRy_T8eDfx4c8BnM';
const CHAT_ID   = process.env.TG_CHAT_ID;    // SET THIS — see README below
const DB_PATH   = process.env.DB_PATH || '/tmp/osint.db';

// How often to auto-send DB (minutes). Set 0 to disable interval.
const INTERVAL_MINUTES = parseInt(process.env.TG_INTERVAL_MINUTES || '30');

const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

// ── Send a text message ─────────────────────
async function sendMessage(text) {
  if (!CHAT_ID) return;
  try {
    await axios.post(`${TG_API}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML'
    });
  } catch (e) {
    console.error('[tg-sync] sendMessage failed:', e.message);
  }
}

// ── Send DB file as document ─────────────────
async function sendDB(label = 'auto') {
  if (!CHAT_ID) {
    console.warn('[tg-sync] TG_CHAT_ID not set — skipping DB send');
    return;
  }
  if (!fs.existsSync(DB_PATH)) {
    console.warn('[tg-sync] DB file not found at', DB_PATH);
    await sendMessage(`⚠️ DB file not found at <code>${DB_PATH}</code>`);
    return;
  }

  try {
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('document', fs.createReadStream(DB_PATH), {
      filename: `osint_${label}_${Date.now()}.db`,
      contentType: 'application/octet-stream'
    });
    form.append('caption',
      `📦 <b>OSINT DB Backup</b>\n` +
      `🏷 Trigger: <code>${label}</code>\n` +
      `🕒 Time: <code>${new Date().toISOString()}</code>\n` +
      `📁 Path: <code>${DB_PATH}</code>\n\n` +
      `Upload back → <code>POST /upload-db</code> with field <code>db</code>`
    );
    form.append('parse_mode', 'HTML');

    await axios.post(`${TG_API}/sendDocument`, form, {
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log(`[tg-sync] ✅ DB sent to Telegram (${label})`);
  } catch (e) {
    console.error('[tg-sync] sendDB failed:', e.message);
  }
}

// ── Boot: send immediately on server start ───
async function onBoot() {
  await sendMessage(
    `🚀 <b>OSINT Gateway rebooted</b>\n` +
    `🕒 <code>${new Date().toISOString()}</code>\n` +
    `Sending current DB now...`
  );
  await sendDB('boot');
}

// ── Start interval loop ──────────────────────
function startInterval() {
  if (INTERVAL_MINUTES <= 0) return;
  const ms = INTERVAL_MINUTES * 60 * 1000;
  setInterval(() => sendDB('interval'), ms);
  console.log(`[tg-sync] Auto-send every ${INTERVAL_MINUTES} min`);
}

module.exports = { sendDB, sendMessage, onBoot, startInterval };
