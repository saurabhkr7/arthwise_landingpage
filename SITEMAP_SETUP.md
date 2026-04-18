# Sitemap Setup & Configuration

## ✅ Status

**Sitemap Generation:** ✅ Live and accessible
- **URL:** `https://arthhwise.com/sitemap.xml`
- **Format:** XML 1.0
- **Revalidation:** Every 1 hour
- **Expiration:** 1 year

---

## 📊 Current Sitemap Contents

### URLs Currently Included

1. **Core Pages** (1 URL)
   - Homepage: `/`

2. **Static Pages** (6 URLs)
   - `/blog` - Blog listing
   - `/contact` - Contact form
   - `/pricing` - Pricing page
   - `/feedback` - Feedback form
   - `/waiting-list` - Waiting list signup
   - `/privacy` - Privacy policy

3. **Blog Posts** (5-100 URLs)
   - `/blog/[slug]` - Individual blog posts
   - Fetched from API
   - Updated monthly

4. **Deep Link Routes** (Conditional - 0-200 URLs)
   - `/post/[id]` - Posts
   - `/contest/[id]` - Contests
   - `/user/[id]` - Users
   - `/course/[id]` - Courses

---

## 🔧 How It Works

The sitemap is generated dynamically at build time and updated periodically:

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static routes
  // 2. Fetch and include blog posts
  // 3. Fetch and include posts
  // 4. Fetch and include contests
  // 5. Fetch and include users
  // 6. Fetch and include courses
}
```

**Generation Process:**
1. ✅ Application builds (`npm run build`)
2. ✅ sitemap.ts is executed during build
3. ✅ Fetches content from API (with 5-second timeout)
4. ✅ Generates XML with all URLs
5. ✅ Cached for 1 hour, expires in 1 year

---

## 📋 Detailed URL Breakdown

### 1. Core Homepage
```xml
<url>
  <loc>https://arthhwise.com</loc>
  <lastmod>2026-04-18T07:50:23.204Z</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1</priority>
</url>
```
- **Priority:** 1.0 (highest)
- **Frequency:** Weekly
- **Last Modified:** Always current (from build time)

### 2. Static Pages
```xml
<url>
  <loc>https://arthhwise.com/blog</loc>
  <lastmod>2026-04-18T07:50:23.204Z</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```
| Page | Priority | Frequency |
|------|----------|-----------|
| /blog | 0.8 | weekly |
| /contact | 0.7 | monthly |
| /pricing | 0.8 | weekly |
| /feedback | 0.6 | monthly |
| /waiting-list | 0.6 | monthly |
| /privacy | 0.5 | yearly |

### 3. Blog Posts
```xml
<url>
  <loc>https://arthhwise.com/blog/getting-started-paper-trading</loc>
  <lastmod>2026-04-17T15:30:31.176Z</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```
- **Source:** API endpoint `/blogs` (up to 100 posts)
- **Priority:** 0.6
- **Frequency:** Monthly
- **Last Modified:** From blog.updatedAt or blog.publishedAt

### 4. Deep Link Routes (Posts)
```xml
<url>
  <loc>https://arthhwise.com/post/123</loc>
  <lastmod>2026-04-18T07:50:23.204Z</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.7</priority>
</url>
```
- **Source:** API endpoint `/posts` (up to 50)
- **Priority:** 0.7
- **Frequency:** Weekly
- **Condition:** API must be running and return data

### 5. Deep Link Routes (Other Types)
| Type | Priority | Frequency | Source |
|------|----------|-----------|--------|
| /contest/[id] | 0.7 | weekly | `/contests` |
| /user/[id] | 0.6 | monthly | `/users` |
| /course/[id] | 0.7 | monthly | `/courses` |

---

## ✅ Testing Checklist

### Local Testing

```bash
# 1. Build the app
npm run build

# 2. Start the app
npm run start  # or pm2 restart arthwise-landing

# 3. Fetch sitemap
curl http://localhost:3000/sitemap.xml

# 4. Validate XML
curl http://localhost:3000/sitemap.xml | xmllint --format -

# 5. Count URLs
curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"

# 6. Check specific routes
curl -s http://localhost:3000/sitemap.xml | grep "/blog"
curl -s http://localhost:3000/sitemap.xml | grep "/post/"
curl -s http://localhost:3000/sitemap.xml | grep "/contest/"
```

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property: `arthhwise.com`
3. Go to **Sitemaps** section
4. Enter: `https://arthhwise.com/sitemap.xml`
5. Click **Submit**
6. Status should show ✅ **Success**

### Monitoring

```bash
# Watch sitemap generation size over time
watch -n 3600 'curl -s http://localhost:3000/sitemap.xml | wc -c'

# Check for errors in logs
pm2 logs arthwise-landing | grep -i "sitemap\|error"

# View current URLs
curl -s http://localhost:3000/sitemap.xml | grep "<loc>" | wc -l
```

---

## 🔴 Troubleshooting

### Problem: Sitemap Returns Empty or Only Static URLs

**Symptoms:**
- Only 7 URLs showing (homepage + 6 static pages)
- No blog posts or deep link routes
- Google Search Console shows warnings

**Cause:** API might not be running or not returning data

**Solution:**

```bash
# 1. Check API status
curl http://127.0.0.1:8000/posts

# 2. Check if API returns data
curl http://127.0.0.1:8000/posts | jq .

# 3. If API returns error, start the API
cd ../ArthwiseServices
pm2 start arthwise-api

# 4. Rebuild the app
cd ../arthwise_landingpage
npm run build

# 5. Restart the landing page
pm2 restart arthwise-landing

# 6. Verify sitemap now includes dynamic routes
curl http://localhost:3000/sitemap.xml | grep -c "<url>"
```

### Problem: Sitemap Takes Too Long to Load

**Symptoms:**
- Request times out (>30 seconds)
- Server timeout errors

**Cause:** API is slow or unresponsive

**Solution:**
- Increase fetch timeout in `src/app/sitemap.ts` (currently 5 seconds)
- Optimize API query performance
- Reduce number of items fetched (currently 50-100)

### Problem: Google Search Console Shows Errors

**Symptoms:**
- "Couldn't read sitemap" error
- Invalid XML format warning

**Check:**
```bash
# Validate XML is well-formed
curl -s http://localhost:3000/sitemap.xml | xmllint --format - > /dev/null

# Check content type
curl -I http://localhost:3000/sitemap.xml | grep Content-Type

# Should be: application/xml
```

**Solutions:**
1. Ensure sitemap.ts returns valid URLs
2. Check for special characters that need XML escaping
3. Verify API responses are valid JSON

---

## 🔧 Configuration Reference

### API Endpoints Used

| Endpoint | Purpose | Limit | Timeout |
|----------|---------|-------|---------|
| `/blogs` | Blog posts | 100 | 5s |
| `/posts` | Deep link posts | 50 | 5s |
| `/contests` | Deep link contests | 50 | 5s |
| `/users` | Deep link users | 50 | 5s |
| `/courses` | Deep link courses | 50 | 5s |

### URL Priorities (SEO)

```
1.0  - Homepage (highest priority)
0.8  - Main content pages (blog index, pricing)
0.7  - Primary features (contact, posts, contests)
0.6  - Secondary content (users, blog posts, feedback)
0.5  - Policy pages (privacy, terms)
```

### Change Frequencies

- **weekly** - Homepage, main navigation, posts
- **monthly** - Blog posts, contests, courses, user content
- **yearly** - Privacy policy, terms

---

## 📈 Expected Growth

As your platform grows, expected sitemap size:

| Phase | URLs | API Data |
|-------|------|----------|
| Initial | 12 | Basic (blogs only) |
| 1 Month | 30-50 | 5-10 posts/contests |
| 3 Months | 100-150 | 50+ across all types |
| 6 Months | 200-500 | Full usage across platform |
| 1 Year | 500-1000+ | High user/content volume |

**Google Sitemap Limits:**
- Maximum URLs per sitemap: 50,000
- Maximum file size: 50 MB
- If exceeded, create sitemap index at `/sitemap_index.xml`

---

## 🚀 Deployment Checklist

**Before Production Release:**
- [ ] Sitemap builds without errors
- [ ] All URL categories are included (static, blogs, deep links)
- [ ] URLs are valid and accessible (return 200 status)
- [ ] Last modified timestamps are accurate
- [ ] Priority values are reasonable (0.5 - 1.0)
- [ ] Change frequency is appropriate for content type
- [ ] robots.txt points to sitemap URL
- [ ] XML is well-formed (valid XML structure)

**After Production Release:**
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor sitemap size growth
- [ ] Check for crawl errors in GSC
- [ ] Verify URLs are being indexed
- [ ] Monitor sitemap fetch frequency

---

## 📝 Implementation Details

### File: src/app/sitemap.ts

**Key Features:**
1. ✅ Async function executes at build time
2. ✅ Fetches data from 5 different API endpoints
3. ✅ Handles API timeouts gracefully (5-second limit)
4. ✅ Combines all URLs into single response
5. ✅ Auto-revalidates every 1 hour
6. ✅ XML perfectly formatted

**Fetch Timeout Protection:**
```typescript
async function fetchWithTimeout(url: string, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  // ... fetch logic ...
}
```

**Error Handling:**
- If API unreachable → Logs error, continues with other data
- If single endpoint fails → That content type skipped, others included
- If all APIs fail → Returns only static pages + robots still valid

---

## 🔍 Monitoring Commands

### Daily Monitoring
```bash
# Check sitemap is accessible
curl -I https://arthhwise.com/sitemap.xml

# Count URLs
curl -s https://arthhwise.com/sitemap.xml | grep -c "<url>"

# Check last modification time
curl -s https://arthhwise.com/sitemap.xml | grep "<lastmod>" | head -1
```

### Weekly Monitoring
```bash
# Validate sitemap structure
curl -s https://arthhwise.com/sitemap.xml | xmllint --format - > sitemap_backup.xml

# Check for new URLs
curl -s https://arthhwise.com/sitemap.xml | wc -c  # file size in bytes
```

### Quarterly Tasks
```bash
# Review search console index coverage
# Check for any crawl errors
# Validate priority/frequency distribution
# Audit URL accessibility (404s, redirects)
```

---

## 📚 Related Resources

- [Sitemaps XML Format](https://www.sitemaps.org/)
- [Google Sitemap Guidelines](https://developers.google.com/search/docs/beginner/sitemaps)
- [Next.js generateSitemaps](https://nextjs.org/docs/app/api-reference/file-conventions/sitemap)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)

---

## 🎯 Next Steps

### Immediate
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Google fetches it without errors
- [ ] Monitor for crawl issues

### Short Term
- [ ] Add sitemap index if URLs exceed 200
- [ ] Create alert for sitemap generation failures
- [ ] Set up automated monitoring

### Long Term
- [ ] Implement multi-language sitemaps (if needed)
- [ ] Create video sitemap (if adding video content)
- [ ] Implement news sitemap (if creating news content)

---

**Generated:** April 18, 2026
**Status:** ✅ Production Ready
**Last Updated:** During sitemap configuration update
