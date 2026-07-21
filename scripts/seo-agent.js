#!/usr/bin/env node

/**
 * Arthhwise SEO Automation Agent
 * Inspects Search Console coverage and creates accurate rolling performance reports.
 */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SITE_URL = "https://arthhwise.com";
const GSC_PROPERTY = "sc-domain:arthhwise.com";
const CREDENTIALS_PATH = path.join(__dirname, "../gsc-credentials.json");
const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
Arthhwise SEO Agent CLI
=======================
Usage:
  node scripts/seo-agent.js <command>

Commands:
  --inspect       Fetch sitemap.xml and inspect indexed URLs
  --list-sites    List Search Console properties available to the service account
  --report        Create a rolling 28-day report from complete Search Console data
  --help          Show this help menu
`);
}

function getGoogleAuth() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error("[Error] gsc-credentials.json not found in the project root.");
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/webmasters"],
  });
}

async function fetchSitemapUrls() {
  try {
    console.log(`[Info] Fetching ${SITE_URL}/sitemap.xml...`);
    const response = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!response.ok) throw new Error(`Sitemap returned ${response.status}`);

    const sitemap = await response.text();
    const urls = [...sitemap.matchAll(/<loc>(https:\/\/arthhwise\.com[^<]+)<\/loc>/g)]
      .map((match) => match[1]);
    console.log(`[Success] Found ${urls.length} sitemap URLs.`);
    return urls;
  } catch (error) {
    console.error("[Error] Sitemap retrieval failed:", error.message);
    return [];
  }
}

async function inspectUrl(auth, url) {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  try {
    const response = await searchconsole.urlInspection.index.inspect({
      requestBody: { inspectionUrl: url, siteUrl: GSC_PROPERTY },
    });
    const status = response.data.inspectionResult.indexStatusResult;
    return {
      status: status.verdict,
      coverageState: status.coverageState || "Unknown status",
    };
  } catch (error) {
    return { status: "ERROR", coverageState: error.message };
  }
}

function formatPercent(value) {
  return `${((value || 0) * 100).toFixed(2)}%`;
}

async function queryPerformanceReport(auth) {
  const searchconsole = google.searchconsole({ version: "v1", auth });

  // Search Console data can take several days to settle. A rolling window is
  // materially more useful than treating an incomplete single day as zero.
  const endDate = new Date();
  endDate.setUTCDate(endDate.getUTCDate() - 3);
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - 27);
  const toDateString = (date) => date.toISOString().slice(0, 10);
  const startDateString = toDateString(startDate);
  const endDateString = toDateString(endDate);
  const baseRequest = {
    startDate: startDateString,
    endDate: endDateString,
    rowLimit: 5,
  };

  try {
    console.log(`[Info] Fetching complete metrics for ${startDateString} to ${endDateString}...`);
    const [totalResponse, queryResponse, pageResponse] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl: GSC_PROPERTY,
        requestBody: baseRequest,
      }),
      searchconsole.searchanalytics.query({
        siteUrl: GSC_PROPERTY,
        requestBody: { ...baseRequest, dimensions: ["query"] },
      }),
      searchconsole.searchanalytics.query({
        siteUrl: GSC_PROPERTY,
        requestBody: { ...baseRequest, dimensions: ["page"] },
      }),
    ]);

    const totals = totalResponse.data.rows?.[0] || {
      clicks: 0,
      impressions: 0,
      ctr: 0,
      position: 0,
    };
    const queries = queryResponse.data.rows || [];
    const pages = pageResponse.data.rows || [];
    const reportDir = path.join(__dirname, "../artifacts");
    const reportPath = path.join(reportDir, `seo_rolling_report_${endDateString}.md`);

    if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });

    const markdown = `
# GSC Rolling Search Performance Report (${startDateString} to ${endDateString})

Latest complete 28-day summary for **${SITE_URL}**.

## Overview Metrics
- **Total Clicks**: ${totals.clicks}
- **Total Impressions**: ${totals.impressions}
- **Average CTR**: ${formatPercent(totals.ctr)}
- **Average Position**: ${(totals.position || 0).toFixed(1)}

## Top Search Queries
| Keyword | Clicks | Impressions | CTR | Position |
|---------|--------|-------------|-----|----------|
${queries.map((row) => `| ${row.keys[0]} | ${row.clicks} | ${row.impressions} | ${formatPercent(row.ctr)} | ${row.position.toFixed(1)} |`).join("\n")}

## Top Landing Pages
| Page URL | Clicks | Impressions | CTR | Position |
|----------|--------|-------------|-----|----------|
${pages.map((row) => `| [${row.keys[0].replace(SITE_URL, "")}](${row.keys[0]}) | ${row.clicks} | ${row.impressions} | ${formatPercent(row.ctr)} | ${row.position.toFixed(1)} |`).join("\n")}

*Auto-generated from Search Console data that is at least three days old.*
`;

    fs.writeFileSync(reportPath, markdown.trim(), "utf8");
    console.log(`[Success] Rolling report generated at: ${reportPath}`);
  } catch (error) {
    console.error("[Error] Failed to fetch metrics:", error.message);
  }
}

async function run() {
  if (!command || command === "--help" || command === "-h") {
    showHelp();
    return;
  }

  const auth = getGoogleAuth();

  if (command === "--inspect") {
    const urls = await fetchSitemapUrls();
    for (const url of urls) {
      const inspection = await inspectUrl(auth, url);
      console.log(`- [${inspection.status}] ${url} (${inspection.coverageState})`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return;
  }

  if (command === "--list-sites") {
    const searchconsole = google.searchconsole({ version: "v1", auth });
    const response = await searchconsole.sites.list();
    for (const site of response.data.siteEntry || []) {
      console.log(`- ${site.siteUrl} (Permission: ${site.permissionLevel})`);
    }
    return;
  }

  if (command === "--report") {
    await queryPerformanceReport(auth);
    return;
  }

  showHelp();
}

run().catch((error) => {
  console.error("[Fatal Error]", error);
  process.exit(1);
});
