# Deep Link Testing Guide

## Quick Test Scenarios

### Scenario 1: Test Post Link
1. Open in browser: `https://arthhwise.com/post/123`
2. You should see:
   - ✓ Arthhwise header with phone icon
   - ✓ Content preview (title, description, optional image)
   - ✓ "Open in App" button
   - ✓ "Download App" button (if not on mobile)
   - ✓ "Continue in browser" option
3. Click "Open in App":
   - On mobile: Waits 1.5s, then redirects to store if app not installed
   - On desktop: Immediately shows store link

### Scenario 2: Test All Route Types
```
Posts:     https://arthhwise.com/post/123
Contests:  https://arthhwise.com/contest/456
Users:     https://arthhwise.com/user/789
Courses:   https://arthhwise.com/course/999
```

### Scenario 3: Check Open Graph Tags
1. Share link on WhatsApp/Twitter/Facebook
2. Verify preview shows:
   - ✓ Title from API or fallback
   - ✓ Description from API or fallback
   - ✓ Image preview (if available)

### Scenario 4: Monitor Analytics
```javascript
// In browser console
import { getDeepLinkMetrics } from "@/lib/deepLinkAnalytics";

// View metrics
console.table(getDeepLinkMetrics());

// View all events
const events = JSON.parse(localStorage.getItem("deeplink_events") || "[]");
console.table(events);
```

## Expected Metrics
```javascript
{
  totalClicks: 5,              // User clicked "Open in App" 5 times
  appOpened: 2,                // App opened successfully 2 times
  fallbacks: 3,                // Redirected to store 3 times
  installs: 1,                 // User clicked "Download App" 1 time
  conversionRate: 0.6          // 60% conversion (app or install)
}
```

## Browser Console Commands

```javascript
// Clear all deep link events (debugging)
import { clearDeepLinkEvents } from "@/lib/deepLinkAnalytics";
clearDeepLinkEvents();

// View recent events with full details
localStorage.getItem("deeplink_events")
  ? JSON.parse(localStorage.getItem("deeplink_events")).forEach(e => console.table(e))
  : console.log("No events logged yet");

// Generate a test deep link
import { generateDeepLink } from "@/lib/deeplink";
const link = generateDeepLink("post", "123");
console.log(link); // Output: arthwise://post/123

// Check device detection
import { isMobileDevice } from "@/lib/deeplink";
console.log("Is mobile?", isMobileDevice());

// Get appropriate store URL
import { getAppStoreUrl } from "@/lib/deeplink";
console.log("Store URL:", getAppStoreUrl());
```

## Mobile Testing Checklist

- [ ] Test on Android device (Chrome)
- [ ] Test on iOS device (Safari)
- [ ] Verify app opens with deep link
- [ ] Verify fallback to store if app not installed
- [ ] Check that content preview loaded
- [ ] Share link to WhatsApp - preview should show
- [ ] Verify "Continue in browser" works
- [ ] Check analytics in localStorage

## Desktop Testing Checklist

- [ ] All buttons visible
- [ ] "Download App" button shows Play Store link
- [ ] Open Graph tags present in page source
- [ ] Content preview renders correctly
- [ ] Mobile responsive design
- [ ] Analytics tracking works

## Known Limitations

1. **Android App Detection**
   - Cannot reliably detect if app is installed
   - Uses timeout method instead (1500ms)

2. **iOS Limitations**
   - Better detection possible but still not 100% reliable
   - Deep link scheme check may fail silently

3. **Desktop Behavior**
   - No deep link attempt on desktop
   - Direct redirect to store

## Troubleshooting

### Content Not Loading
```javascript
// Check if API is reachable
const response = await fetch('http://127.0.0.1:8000/api/post/123');
console.log(response.status);
```

### Analytics Not Recording
```javascript
// Verify localStorage is enabled
console.log(typeof localStorage !== "undefined");

// Force save event manually
import { recordDeepLinkEvent } from "@/lib/deepLinkAnalytics";
recordDeepLinkEvent("click", "post", "123");
```

### Deep Link Not Working
1. Check if app deep link handler is configured
2. Verify scheme in manifest matches `arthwise://`
3. Test with manual navigation: `window.location = "arthwise://post/123"`

## Next Steps

After testing, verify:

1. **Backend Integration**
   - Update `.env.local` with your API URL
   - Ensure API endpoints return proper format

2. **App Configuration**
   - Configure deep link handler in Android manifest
   - Configure URL scheme in iOS Info.plist
   - Test in actual app

3. **Analytics**
   - Connect to Google Analytics (if using gtag)
   - Or configure custom tracking endpoint

4. **Share Strategy**
   - Test sharing from your app
   - Monitor conversion rate
   - A/B test if needed

---

**Last Updated**: April 18, 2026
