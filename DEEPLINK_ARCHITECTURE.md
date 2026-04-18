# Complete Deep Link Architecture Reference

## 📊 Complete System Overview

This document provides a unified reference for the complete deep link infrastructure implemented across the Arthwise landing page and mobile apps.

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               User Interaction Flow                          │
└─────────────────────────────────────────────────────────────┘

                    Social Share / Deep Link
                            |
                    ┌───────┴───────┐
                    |               |
            ✅ App Installed    ❌ App Not Installed
                    |               |
        ┌───────────┴─────┐    Landing Page
        |                 |         |
   App Links         Browser    Preview Card
   (OS Level)        Fallback    Generated
        |                 |         |
   Open App         Open in      Share Ready
   Instantly        Safari       (OG Tags)
```

---

## 🔗 Link Types & Resolution

### 1. **Deep Link (App Protocol)**
```
Format: arthwise://post/123
Usage: Direct app opening
Status: Requires app installed
Fallback: Opens App Store
Handler: Native app code (Android Intent, iOS URL scheme)
```

### 2. **Universal Link (iOS)**
```
Format: https://arthhwise.com/post/123
Usage: From Safari, social media
Platform: iOS only
Handler: apple-app-site-association + app manifest
Result: Opens app instantly (OS verified)
Fallback: Landing page if app not installed
```

### 3. **App Link (Android)**
```
Format: https://arthhwise.com/post/123
Usage: From Chrome, social media
Platform: Android only
Handler: .well-known/assetlinks.json + manifest
Result: Opens app instantly (OS verified)
Fallback: Landing page if app not installed
```

### 4. **Web Landing Page**
```
Format: https://arthhwise.com/post/123
Usage: Web share, social media preview
Platform: All devices
Handler: Next.js dynamic route + API
Result: Preview page with app CTA
```

---

## 🗂️ File Structure & Hierarchy

```
arthwise_landingpage/
├── public/
│   └── .well-known/
│       ├── assetlinks.json (Android verification)
│       └── apple-app-site-association (iOS verification)
│
├── src/
│   ├── app/
│   │   ├── page.tsx (Home with SEO)
│   │   ├── post/
│   │   │   └── [id]/
│   │   │       └── page.tsx (Post landing with OG)
│   │   ├── contest/
│   │   │   └── [id]/
│   │   │       └── page.tsx (Contest landing with OG)
│   │   ├── user/
│   │   │   └── [id]/
│   │   │       └── page.tsx (User landing with OG)
│   │   ├── course/
│   │   │   └── [id]/
│   │   │       └── page.tsx (Course landing with OG)
│   │   └── layout.tsx (Global with SwG + Scripts)
│   │
│   ├── components/
│   │   └── DeepLink/
│   │       └── DeepLinkHandler.tsx (Mobile UI)
│   │
│   ├── lib/
│   │   ├── deeplink.ts (Core logic)
│   │   ├── apiContent.ts (Content fetching + fallback)
│   │   └── deepLinkAnalytics.ts (Event tracking)
│   │
│   └── types/ (TypeScript interfaces)
│
├── DEEPLINK_GUIDE.md (Complete implementation)
├── DEEPLINK_TESTING.md (Testing scenarios)
├── APP_LINKS_SETUP.md (End-to-end setup)
├── ANDROID_APP_LINKS.md (Android manifest code)
└── IOS_UNIVERSAL_LINKS.md (iOS configuration code)
```

---

## 🔄 Request Resolution Flow

```
User clicks: https://arthhwise.com/post/123
│
├─ iOS Device
│  ├─ Check: Universal Link registered?
│  │  ├─ YES → Verify apple-app-site-association
│  │  │  ├─ Valid → Open app (SceneDelegate handles)
│  │  │  └─ Invalid → Open Safari
│  │  └─ NO → Open Safari with landing page
│  │
│  └─ Landing Page Response (if Safari)
│     ├─ Render: Post preview card
│     ├─ Show OG: Title, image, description
│     └─ CTA: "Open in App" / "Download"
│
└─ Android Device
   ├─ Check: App Link registered?
   │  ├─ YES → Verify .well-known/assetlinks.json
   │  │  ├─ Valid → Open app (MainActivity handles)
   │  │  └─ Invalid → Open Chrome
   │  └─ NO → Open Chrome with landing page
   │
   └─ Landing Page Response (if Chrome)
      ├─ Render: Post preview card
      ├─ Show OG: Title, image, description
      └─ CTA: "Open in App" / "Download"
```

---

## 🚀 Implementation Timeline

### Phase 1: Web Infrastructure ✅
**Status:** Complete and deployed
```
✅ Create src/lib/deeplink.ts
✅ Create src/lib/apiContent.ts
✅ Create src/lib/deepLinkAnalytics.ts
✅ Create src/components/DeepLink/DeepLinkHandler.tsx
✅ Create dynamic pages (post, contest, user, course)
✅ Add OG metadata generation
✅ Deploy to production (PM2 #20)
```

### Phase 2: Web Verification ✅
**Status:** Complete and verified
```
✅ Verify assetlinks.json exists
✅ Create apple-app-site-association
✅ Both files visible at /.well-known/
✅ Both readable and valid JSON
```

### Phase 3: App Configuration 🟡
**Status:** In progress - requires app code updates
```
🟡 iOS: Add Associated Domains capability
🟡 iOS: Add Universal Link handler code
🟡 iOS: Build and release to App Store
🟡 iOS: Wait 24-48 hours for certification
🟡 iPhone: Test on real device
│
🟡 Android: Update manifest with App Links
🟡 Android: Add deep link handler code
🟡 Android: Release to Play Store
🟡 Android: Verify with Android Debug Bridge
🟡 Android Phone: Test on real device
```

---

## 🎯 Key Features by Use Case

### 1. Social Media Sharing
```
Action: User shares post in Twitter/Instagram/WhatsApp
│
├─ Link Generated: https://arthhwise.com/post/123
├─ OG Tags Fetched: Title, image, description
├─ Preview Rendered: Card with thumbnail
└─ Click Behavior:
   ├─ User with app → Opens app (App Link / Universal Link)
   └─ User without app → Shows landing page + CTA
```

### 2. Direct Deep Link
```
Action: Developer links: arthwise://post/123
│
├─ App Installed → Opens to post
└─ App Not Installed → Opens App Store
```

### 3. Browser Fallback
```
Action: User clicks web link: https://arthhwise.com/post/123
│
├─ App Not Installed
│  └─ Renders landing page with:
│     ├─ Post preview (title, image, description)
│     ├─ Download CTA buttons
│     └─ OG tags for sharing
│
└─ App Installed
   ├─ iOS → Opens app via Universal Link
   └─ Android → Opens app via App Link
```

### 4. Analytics Tracking
```
All interactions logged:
├─ click: User clicks link
├─ opened: App opened successfully
├─ fallback: Landed on web page
├─ install: User clicked download
└─ browser_continue: User browsing web

Data stored:
├─ localStorage: User session history
├─ Google Analytics: Aggregate metrics
└─ Console: Real-time debugging
```

---

## 🔐 Security & Verification

### Android (assetlinks.json)
```
Location: .well-known/assetlinks.json
Verification: OS enforcts SHA256 match
├─ Package name: com.arthwise
├─ SHA256: from release keystore
└─ Refresh: Every app update

File must be:
✅ Valid JSON
✅ Accessible over HTTPS
✅ SHA256 matches Play Store signing key
```

### iOS (apple-app-site-association)
```
Location: .well-known/apple-app-site-association
Verification: OS enforces TEAM_ID match
├─ Team ID: From Apple Developer account
├─ Bundle ID: com.arthwise
└─ Paths: /post/*, /contest/*, /user/*, /course/*

File must be:
✅ Valid JSON
✅ Accessible over HTTPS (no redirects)
✅ TEAM_ID matches app signing identity
```

---

## 📊 Configuration Reference

### Routes Supported

| Route | Example | Landing Page | App Link | Universal Link |
|-------|---------|--------------|----------|---|
| Post | `/post/123` | ✅ Yes | ✅ Yes | ✅ Yes |
| Contest | `/contest/456` | ✅ Yes | ✅ Yes | ✅ Yes |
| User | `/user/789` | ✅ Yes | ✅ Yes | ✅ Yes |
| Course | `/course/101` | ✅ Yes | ✅ Yes | ✅ Yes |

### Content Sources

| Type | API Endpoint | Fallback | Cache |
|------|--------------|----------|-------|
| Post | `/api/posts/{id}` | Generated | 1 hour |
| Contest | `/api/contests/{id}` | Generated | 1 hour |
| User | `/api/users/{id}` | Generated | 1 hour |
| Course | `/api/courses/{id}` | Generated | 1 hour |

### Analytics Events

| Event | Condition | Data Captured |
|-------|-----------|---------------|
| `click` | User clicks link | Device, OS, URL, timestamp |
| `opened` | App opened successfully | Device, OS, route, timestamp |
| `fallback` | Landed on web page | Device, OS, route, duration |
| `install` | User clicked download | Download action, app store |
| `browser_continue` | User browsing web | Pages viewed, duration |

---

## ✅ Testing Checklist

### Web Layer Testing
- [ ] Landing pages load correctly
- [ ] OG tags render in preview (Lighthouse audit)
- [ ] API fallback works when API down
- [ ] Analytics events logged to console
- [ ] localStorage tracking works

### iOS Testing
- [ ] Associated Domains capability added
- [ ] Entitlements file has correct domains
- [ ] Info.plist has ATS settings
- [ ] DeepLink handler implemented
- [ ] Universal Link handler in SceneDelegate
- [ ] App released to App Store
- [ ] Wait 24-48 hours
- [ ] Test on real iPhone device
- [ ] Link opens app (not Safari)

### Android Testing
- [ ] assetlinks.json accessible at /.well-known/
- [ ] SHA256 matches Play Store signing key
- [ ] Manifest has intent filters
- [ ] Deep link handler in MainActivity
- [ ] App released to Play Store
- [ ] Wait ~24 hours for Play Store processing
- [ ] Test on real Android device (Chrome)
- [ ] Test via adb: `adb shell dumpsys package com.arthwise`

### Analytics Testing
- [ ] Console shows click events
- [ ] localStorage stores history
- [ ] Conversion rate calculated
- [ ] Google Analytics integration working

---

## 🐛 Debugging Commands

### Check Web Files
```bash
# Verify assetlinks.json
curl -s https://arthhwise.com/.well-known/assetlinks.json | jq .

# Verify apple-app-site-association
curl -s https://arthhwise.com/.well-known/apple-app-site-association | jq .

# Test landing page SEO
curl -s https://arthhwise.com/post/123 | grep -i "og:title\|og:image"
```

### Android Debugging
```bash
# Check if app link is handled
adb shell dumpsys package com.arthwise

# Look for "handle https://arthhwise.com/" in output

# Test intent
adb shell am start -a android.intent.action.VIEW \
  -c android.intent.category.BROWSABLE \
  -d "https://arthhwise.com/post/123"
```

### iOS Debugging
```bash
# On device, go to:
Settings → Developer → Universal Links

# Watch console in Xcode for diagnostics
# look for: "apple-app-site-association" validation messages
```

### Browser Console (Web Testing)
```javascript
// Check deep link config
console.log(window.__DEEPLINK_CONFIG__)

// Trigger deep link event
window.__triggerDeepLink?.('post', '123')

// View analytics events
console.log(localStorage.getItem('deeplink_events'))

// Test app store URLs
console.log(window.__DEEPLINK_CONFIG__.googlePlayStoreUrl)
console.log(window.__DEEPLINK_CONFIG__.appStoreUrl)
```

---

## 🎓 Learning Resources

### Official Documentation
- [Apple Universal Links Guide](https://developer.apple.com/ios/universal-links/)
- [Android App Links](https://developer.android.com/training/app-links)
- [Firebase Dynamic Links](https://firebase.google.com/docs/dynamic-links)

### Tools & Validators
- [Apple AASA Validator](https://branch.io/resources/aasa-validator/)
- [assetlinks.json Generator](https://tools.google.com/dlpage/digitalpublisher)
- [OG Tag Debugger](https://ogp.me/validate)

### Related Guides (In This Project)
- [DEEPLINK_GUIDE.md](DEEPLINK_GUIDE.md) - JavaScript implementation
- [DEEPLINK_TESTING.md](DEEPLINK_TESTING.md) - Testing procedures
- [APP_LINKS_SETUP.md](APP_LINKS_SETUP.md) - Full setup guide
- [ANDROID_APP_LINKS.md](ANDROID_APP_LINKS.md) - Android code
- [IOS_UNIVERSAL_LINKS.md](IOS_UNIVERSAL_LINKS.md) - iOS code

---

## 📞 Support & Troubleshooting

### Problem: App links not working
**Check:**
- [ ] assetlinks.json is valid JSON
- [ ] SHA256 in assetlinks.json matches Play Store key
- [ ] File is accessible at: `https://arthhwise.com/.well-known/assetlinks.json`
- [ ] App is downloaded from Play Store (not sideloaded)
- [ ] Device has Chrome app (uses App Links)

### Problem: Universal Links not working
**Check:**
- [ ] apple-app-site-association is valid JSON
- [ ] TEAM_ID is correct (10 characters)
- [ ] appID format is `TEAM_ID.com.arthwise`
- [ ] File is accessible at: `https://arthhwise.com/.well-known/apple-app-site-association`
- [ ] App is released on App Store (not TestFlight yet)
- [ ] At least 24 hours have passed since release

### Problem: Landing page not showing OG tags
**Check:**
- [ ] Dynamic page file exists: `app/post/[id]/page.tsx`
- [ ] `generateMetadata` function is implemented
- [ ] API endpoint returns content (or fallback function works)
- [ ] No TypeScript errors in build
- [ ] Rebuild and redeploy app

### Problem: Analytics not recording
**Check:**
- [ ] Browser console shows no JavaScript errors
- [ ] `deepLinkAnalytics.ts` has correct Google Analytics ID
- [ ] localStorage is enabled
- [ ] Brave/Firefox privacymode might block tracking

---

## 🚀 Next Steps & Future Improvements

### Immediate (Required)
- [ ] Update apple-app-site-association with TEAM_ID
- [ ] Add iOS Universal Link handler
- [ ] Add Android App Link handler
- [ ] Release updated apps to stores
- [ ] Monitor 24-48 hour processing window
- [ ] Test on real devices

### Short Term (Recommended)
- [ ] Set up analytics dashboard
- [ ] Monitor conversion rates
- [ ] A/B test CTA buttons
- [ ] Optimize preview cards

### Long Term (Optional)
- [ ] Firebase Dynamic Links for advanced routing
- [ ] Support more content types
- [ ] Implement custom URI schemes
- [ ] Add email deep linking
- [ ] Create referral system

---

## 📋 Deployment Checklist

### Before App Release
- [ ] All code changes committed
- [ ] Tests passing
- [ ] Build successful with no warnings
- [ ] Screenshots prepared
- [ ] App description updated with deep link info

### Before Web Release
- [ ] assetlinks.json deployed
- [ ] apple-app-site-association deployed
- [ ] Landing pages tested
- [ ] OG tags verified with social debuggers
- [ ] Analytics tracking verified

### Post Release (iOS)
- [ ] Wait 24-48 hours for App Store processing
- [ ] Check Settings → Developer → Universal Links on device
- [ ] Test on physical iPhone
- [ ] Monitor analytics for engagement

### Post Release (Android)
- [ ] Wait ~24 hours for Play Store processing
- [ ] Run adb dumpsys to verify
- [ ] Test on physical Android device
- [ ] Verify Chrome opens app for links
- [ ] Monitor analytics for engagement

---

**Status Summary:**
- ✅ Web infrastructure complete
- ✅ Verification files deployed
- 🟡 App code updates needed
- 🟡 App store release needed
- ⏳ Testing on real devices pending

---

**Last Updated:** After iOS and Android link setup
**Next Review:** After first app release with OS-level link handling
