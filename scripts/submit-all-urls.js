#!/usr/bin/env node
/**
 * Arthhwise — Full Site Re-Indexing Script
 * Fetches every URL from the live sitemap.xml, cleans them, deduplicates,
 * then fires URL_UPDATED notifications to the Google Indexing API.
 */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SITE_URL = "https://arthhwise.com";
const CREDENTIALS_PATH = path.join(__dirname, "../gsc-credentials.json");
const RATE_LIMIT_MS = 350; // ms between requests to avoid quota spikes

function getAuth() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error("[Error] gsc-credentials.json not found.");
    process.exit(1);
  }
  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  return new google.auth.JWT({
    email: creds.client_email,
    key: creds.private_key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
}

async function fetchSitemapUrls() {
  console.log(`[Info] Fetching ${SITE_URL}/sitemap.xml ...`);
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Sitemap HTTP ${res.status}`);
  const xml = await res.text();

  // Extract all <loc> values, strip all whitespace/CR/LF from each URL
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((m) => m[1].replace(/\s+/g, "").trim())
    .filter((u) => u.startsWith("https://"));

  // Deduplicate
  const unique = [...new Set(urls)];
  console.log(`[Info] Found ${urls.length} raw URLs → ${unique.length} unique after dedup.`);
  return unique;
}

async function submitUrl(indexing, url) {
  try {
    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: "URL_UPDATED" },
    });
    const notifId =
      res.data?.urlNotificationMetadata?.latestUpdate?.notificationId || "ok";
    console.log(`  ✅  ${url}  [${notifId}]`);
    return true;
  } catch (err) {
    const msg = err?.response?.data?.error?.message || err.message;
    console.error(`  ❌  ${url}  → ${msg}`);
    return false;
  }
}

async function run() {
  const auth = getAuth();
  const urls = await fetchSitemapUrls();

  if (urls.length === 0) {
    console.error("[Error] No URLs to submit. Aborting.");
    process.exit(1);
  }

  const indexing = google.indexing({ version: "v3", auth });

  let succeeded = 0;
  let failed = 0;

  console.log(`\n[Info] Submitting ${urls.length} URLs to Google Indexing API...\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    process.stdout.write(`[${i + 1}/${urls.length}] `);
    const ok = await submitUrl(indexing, url);
    if (ok) succeeded++; else failed++;
    // Rate-limit delay
    if (i < urls.length - 1) {
      await new Promise((r) => setTimeout(r, RATE_LIMIT_MS));
    }
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Submission complete:`);
  console.log(`  ✅ Succeeded : ${succeeded}`);
  console.log(`  ❌ Failed    : ${failed}`);
  console.log(`  📋 Total     : ${urls.length}`);
  console.log(`${"=".repeat(60)}\n`);

  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error("[Fatal]", e.message);
  process.exit(1);
});
