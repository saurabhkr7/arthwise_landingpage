#!/usr/bin/env node

/**
 * Arthhwise SEO Automation Agent
 * Integrates with Google Search Console API for automated URL inspection,
 * index submission, and daily search performance reporting.
 */

const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const SITE_URL = "https://arthhwise.com";
const GSC_PROPERTY = "sc-domain:arthhwise.com";
const CREDENTIALS_PATH = path.join(__dirname, "../gsc-credentials.json");

// Command-line arguments
const args = process.argv.slice(2);
const command = args[0];

// Help instructions
function showHelp() {
  console.log(`
Arthhwise SEO Agent CLI
======================
Usage:
  node scripts/seo-agent.js <command> [options]

Commands:
  --inspect       Fetch sitemap.xml, check indexation status of all URLs
  --list-sites    List all GSC property domains accessible by this service account
  --submit <url>  Submit a specific URL directly to Google Indexing API
  --auto-submit   Inspect sitemap and automatically request indexing for unindexed URLs
  --report        Fetch Search Console performance metrics for yesterday and save markdown report
  --help          Show this help menu

Setup:
  Make sure 'gsc-credentials.json' is present in the project root.
  `);
}

if (!command || command === "--help" || command === "-h") {
  showHelp();
  process.exit(0);
}

// 1. Authenticate with Google
function getGoogleAuth() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`
[Error] 'gsc-credentials.json' not found.
To configure GSC integration:
1. Create a Service Account Key (JSON) in your Google Cloud Console.
2. Save it as 'gsc-credentials.json' in your project root.
3. Share the client email with your Google Search Console property:
   Go to Search Console > Settings > Users > Add User (as Owner).
   Email: <refer to your gsc-credentials-example.json client_email>
    `);
    process.exit(1);
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
  return new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      "https://www.googleapis.com/auth/webmasters",
      "https://www.googleapis.com/auth/indexing"
    ]
  });
}

// 2. Fetch all URLs from live sitemap
async function fetchSitemapUrls() {
  try {
    console.log(`[Info] Fetching live sitemap from ${SITE_URL}/sitemap.xml...`);
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!res.ok) {
      throw new Error(`Failed to fetch sitemap: ${res.statusText}`);
    }
    const text = await res.text();
    const locRegex = /<loc>(https:\/\/arthhwise\.com[^<]+)<\/loc>/g;
    const urls = [];
    let match;
    while ((match = locRegex.exec(text)) !== null) {
      urls.push(match[1]);
    }
    console.log(`[Success] Found ${urls.length} URLs in sitemap.`);
    return urls;
  } catch (error) {
    console.error("[Error] Sitemap retrieval failed:", error.message);
    return [];
  }
}

// 3. Inspect a single URL using Search Console API
async function inspectUrl(auth, url) {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  try {
    const res = await searchconsole.urlInspection.index.inspect({
      requestBody: {
        inspectionUrl: url,
        siteUrl: GSC_PROPERTY,
      },
    });

    const result = res.data.inspectionResult;
    const status = result.indexStatusResult.verdict; // "INDEXED", "NEUTRAL", etc.
    const coverageState = result.indexStatusResult.coverageState || "Unknown status";

    return {
      url,
      status,
      coverageState,
      isIndexed: status === "INDEXED",
    };
  } catch (error) {
    return {
      url,
      status: "ERROR",
      coverageState: error.message,
      isIndexed: false,
    };
  }
}

// 4. Submit indexing request using Indexing API
async function submitIndexingRequest(auth, url) {
  const indexing = google.indexing({ version: "v3", auth });
  try {
    console.log(`[Info] Submitting indexing request for: ${url}`);
    const res = await indexing.urlNotifications.publish({
      requestBody: {
        url: url,
        type: "URL_UPDATED",
      },
    });
    console.log(`[Success] API Response:`, res.data.urlNotificationMetadata?.latestUpdate?.notifyTime || "Done");
    return true;
  } catch (error) {
    console.error(`[Error] Failed to request indexing for ${url}:`, error.message);
    return false;
  }
}

// 5. Query metrics and save markdown report
async function queryPerformanceReport(auth) {
  const searchconsole = google.searchconsole({ version: "v1", auth });
  
  // Calculate yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = yesterday.toISOString().split("T")[0];

  try {
    console.log(`[Info] Fetching search metrics for: ${formattedDate}...`);
    
    // Core metrics call
    const res = await searchconsole.searchanalytics.query({
      siteUrl: GSC_PROPERTY,
      requestBody: {
        startDate: formattedDate,
        endDate: formattedDate,
        dimensions: ["query", "page"],
        rowLimit: 10,
      },
    });

    const rows = res.data.rows || [];
    
    // Sort and compile top keywords and landing pages
    const keywords = {};
    const pages = {};
    
    let totalClicks = 0;
    let totalImpressions = 0;

    rows.forEach(row => {
      const query = row.keys[0];
      const page = row.keys[1];
      
      totalClicks += row.clicks;
      totalImpressions += row.impressions;

      if (!keywords[query]) keywords[query] = { clicks: 0, impressions: 0 };
      keywords[query].clicks += row.clicks;
      keywords[query].impressions += row.impressions;

      if (!pages[page]) pages[page] = { clicks: 0, impressions: 0 };
      pages[page].clicks += row.clicks;
      pages[page].impressions += row.impressions;
    });

    // Format Markdown Report
    const reportDir = path.join(__dirname, "../artifacts");
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportPath = path.join(reportDir, `seo_daily_report_${formattedDate}.md`);
    
    const sortedKeywords = Object.entries(keywords)
      .sort((a, b) => b[1].clicks - a[1].clicks)
      .slice(0, 5);

    const sortedPages = Object.entries(pages)
      .sort((a, b) => b[1].clicks - a[1].clicks)
      .slice(0, 5);

    const markdownContent = `
# GSC Daily Search Performance Report (${formattedDate})

Yesterday's summary report for **https://arthhwise.com**.

## Overview Metrics
- **Total Clicks**: ${totalClicks}
- **Total Impressions**: ${totalImpressions}
- **Average CTR**: ${totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) + "%" : "0%"}

---

## Top 5 Search Queries (Keywords)
| Keyword | Clicks | Impressions |
|---------|--------|-------------|
${sortedKeywords.map(([kw, data]) => `| ${kw} | ${data.clicks} | ${data.impressions} |`).join("\n")}

---

## Top 5 Performing Landing Pages
| Page URL | Clicks | Impressions |
|----------|--------|-------------|
${sortedPages.map(([pg, data]) => `| [${pg.replace(SITE_URL, "")}](${pg}) | ${data.clicks} | ${data.impressions} |`).join("\n")}

*Auto-generated daily by Arthhwise SEO Agent.*
`;

    fs.writeFileSync(reportPath, markdownContent.trim(), "utf8");
    console.log(`[Success] Daily Report generated successfully at: ${reportPath}`);

  } catch (error) {
    console.error("[Error] Failed to fetch metrics:", error.message);
  }
}

// Execution block
async function run() {
  const auth = getGoogleAuth();
  
  // Set auth globally for all Google API calls
  google.options({ auth });
  
  if (command === "--inspect") {
    const urls = await fetchSitemapUrls();
    if (urls.length === 0) return;
    
    console.log("[Info] Starting URL inspection audits...");
    for (const url of urls) {
      const inspect = await inspectUrl(auth, url);
      console.log(`- [${inspect.status}] ${url} (${inspect.coverageState})`);
      // Sleep to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } 
  
  else if (command === "--list-sites") {
    const searchconsole = google.searchconsole({ version: "v1", auth });
    try {
      console.log("[Info] Querying Google Search Console properties...");
      const res = await searchconsole.sites.list();
      const sites = res.data.siteEntry || [];
      if (sites.length === 0) {
        console.log("[Warning] No verified properties found for this service account.");
        console.log(`Please make sure you have added the service account email (${auth.email}) as an Owner in your Google Search Console settings.`);
      } else {
        console.log(`[Success] Found ${sites.length} verified property/properties:`);
        sites.forEach(s => {
          console.log(`- ${s.siteUrl} (Permission: ${s.permissionLevel})`);
        });
      }
    } catch (error) {
      console.error("[Error] Failed to retrieve properties list:", error.message);
    }
  }
  
  else if (command === "--submit") {
    const targetUrl = args[1];
    if (!targetUrl) {
      console.error("[Error] Missing URL parameter. Usage: node scripts/seo-agent.js --submit <url>");
      process.exit(1);
    }
    await submitIndexingRequest(auth, targetUrl);
  } 
  
  else if (command === "--auto-submit") {
    const urls = await fetchSitemapUrls();
    if (urls.length === 0) return;

    console.log("[Info] Analyzing and auto-submitting unindexed URLs...");
    let submittedCount = 0;
    
    for (const url of urls) {
      const inspect = await inspectUrl(auth, url);
      if (!inspect.isIndexed) {
        console.log(`[Pending] Unindexed page: ${url} (${inspect.coverageState})`);
        const success = await submitIndexingRequest(auth, url);
        if (success) submittedCount++;
        // Google Indexing API limit is 100/day for default tier
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.log(`[Indexed] Verified: ${url}`);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    console.log(`[Success] Auto-submit completed. Requested indexing for ${submittedCount} URLs.`);
  } 
  
  else if (command === "--report") {
    await queryPerformanceReport(auth);
  } 
  
  else {
    showHelp();
  }
}

run().catch(err => {
  console.error("[Fatal Error]", err);
  process.exit(1);
});
