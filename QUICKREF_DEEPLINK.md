# Deep Link Implementation: Quick Reference

A quick lookup guide for the complete deep link infrastructure implementation.

---

## 📚 Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| [DEEPLINK_GUIDE.md](DEEPLINK_GUIDE.md) | Complete JavaScript implementation details | Web developers |
| [DEEPLINK_TESTING.md](DEEPLINK_TESTING.md) | Testing procedures and validation methods | QA & developers |
| [DEEPLINK_ARCHITECTURE.md](DEEPLINK_ARCHITECTURE.md) | Full system overview and reference | Project leads |
| [APP_LINKS_SETUP.md](APP_LINKS_SETUP.md) | End-to-end iOS/Android setup guide | Mobile & web devs |
| [ANDROID_APP_LINKS.md](ANDROID_APP_LINKS.md) | Android implementation with code | Android developers |
| [IOS_UNIVERSAL_LINKS.md](IOS_UNIVERSAL_LINKS.md) | iOS implementation with code | iOS developers |

---

## 🔗 Supported Link Types

### 1. **Deep Link Protocol**
```
arthwise://post/123               # Opens app directly
```
- **Requires:** App installed
- **Handler:** Native app code

### 2. **Web URL (All Platforms)**
```
https://arthhwise.com/post/123     # Primary link type
```
- **With app:** Opens app (App Link / Universal Link)
- **No app:** Opens landing page with preview

### 3. **Landing Page (Fallback)**
```
GET /post/123, /contest/456, /user/789, /course/101
```
- **Renders:** Content preview with OG metadata
- **Shows:** App download CTAs
- **For:** All users (with/without app)

---

## 📂 Web Files Structure

```
/public/.well-known/
├── assetlinks.json                  # Android verification
└── apple-app-site-association       # iOS verification

/src/
├── lib/
│   ├── deeplink.ts                  # Core deep link logic
│   ├── apiContent.ts                # API & fallback content
│   └── deepLinkAnalytics.ts         # Event tracking
├── components/DeepLink/
│   └── DeepLinkHandler.tsx          # Mobile UI component
├── app/
│   ├── post/[id]/page.tsx           # Post landing page
│   ├── contest/[id]/page.tsx        # Contest landing page
│   ├── user/[id]/page.tsx           # User landing page
│   └── course/[id]/page.tsx         # Course landing page
└── app/layout.tsx                   # Google SwG + scripts
```

---

## ⚙️ Configuration Values

### Verification Files

**Android (assetlinks.json)**
```json
{
  "package_name": "com.arthwise",
  "sha256_cert_fingerprints": ["1F:C0:96:80:13:..."]
}
```
- Location: `.well-known/assetlinks.json`
- SHA256: From Play Store signing key
- Domain: arthhwise.com

**iOS (apple-app-site-association)**
```json
{
  "appID": "ABC123DEF4.com.arthwise",
  "paths": ["/post/*", "/contest/*", "/user/*", "/course/*"]
}
```
- Location: `.well-known/apple-app-site-association`
- TEAM_ID: From Apple Developer account (ABC123DEF4)
- Domain: arthhwise.com

### App Configuration

| Setting | Value |
|---------|-------|
| Bundle ID (iOS) | `com.arthwise` |
| Package Name (Android) | `com.arthwise` |
| Domain | `arthhwise.com` |
| API Base | `http://127.0.0.1:8000` |
| DeepLink Timeout | `1500ms` |
| Cache Revalidation | `1 hour` |

---

## 🚀 Deployment Timeline

### ✅ Phase 1: Web (Complete)
1. ✅ Created core deep link library
2. ✅ Created API integration layer
3. ✅ Created analytics tracking
4. ✅ Created mobile UI component
5. ✅ Created 4 dynamic landing pages
6. ✅ Added OG metadata generation
7. ✅ Deployed to production

### ✅ Phase 2: Verification (Complete)
1. ✅ assetlinks.json deployed
2. ✅ Verified SHA256 in Play Store
3. ✅ Created apple-app-site-association
4. ✅ Both files accessible at /.well-known/

### 🟡 Phase 3: App Update (In Progress)

**iOS Tasks:**
- [ ] Add Associated Domains capability in Xcode
- [ ] Update Entitlements file with domains
- [ ] Update Info.plist with ATS settings
- [ ] Implement SceneDelegate/URL handling code
- [ ] Build with production certificate
- [ ] Release to App Store
- [ ] Wait 24-48 hours for processing
- [ ] Test on real iPhone

**Android Tasks:**
- [ ] Update AndroidManifest.xml with intent filters
- [ ] Implement deep link handler in MainActivity
- [ ] Release updated app to Play Store
- [ ] Verify with Android Debug Bridge
- [ ] Test on real Android device

---

## 🎯 Key Implementation Points

### Web Layer (JavaScript)
```typescript
// src/lib/deeplink.ts
- Detects mobile vs desktop
- Generates deep links: arthwise://post/123
- Handles timeout fallback (1500ms)
- Provides app store URLs
- Tracks analytics events

// src/lib/apiContent.ts
- Fetches content from API
- Generates fallback content
- Caches for 1 hour
- Revalidates on demand

// src/lib/deepLinkAnalytics.ts
- Records click events
- Records app open events
- Records fallback events
- Tracks device/OS info
- Integrates with Google Analytics
- Stores in localStorage
```

### iOS Implementation
```swift
// SceneDelegate: Handle Universal Links
func scene(_ scene: UIScene, continue userActivity: NSUserActivity)
// Extracts URL components
// Navigates to appropriate content

// App Capabilities: Associated Domains
applinks:arthhwise.com
webcredentials:arthhwise.com
```

### Android Implementation
```xml
<!-- AndroidManifest.xml -->
<intent-filter android:autoVerify="true">
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="https" android:host="arthhwise.com" />
</intent-filter>
```

---

## 🧪 Testing Quick Commands

### Verify Web Files
```bash
# Android verification
curl https://arthhwise.com/.well-known/assetlinks.json

# iOS verification
curl https://arthhwise.com/.well-known/apple-app-site-association

# Landing page metadata
curl https://arthhwise.com/post/123 | grep "og:"
```

### Android Device Testing
```bash
# Check if app handles links
adb shell dumpsys package com.arthwise | grep -A 20 "App Links"

# Test direct intent
adb shell am start -a android.intent.action.VIEW \
  -c android.intent.category.BROWSABLE \
  -d "https://arthhwise.com/post/123"
```

### Browser Console (Web)
```javascript
// Check if deep links configured
window.__DEEPLINK_CONFIG__

// View analytics events
localStorage.getItem('deeplink_events')

// Test app store URLs
window.__DEEPLINK_CONFIG__.googlePlayStoreUrl
window.__DEEPLINK_CONFIG__.appStoreUrl
```

---

## ⚠️ Common Issues & Solutions

### Links Open in Browser Instead of App

| Issue | Check | Solution |
|-------|-------|----------|
| iOS | Apple processed? | Wait 24-48 hours |
| iOS | Associated Domains added? | Add capability in Xcode |
| iOS | TEAM_ID correct? | Verify 10-char ID |
| Android | Play Store updated? | Rebuild and resubmit |
| Android | SHA256 matches? | Verify signing key |
| Android | adb shows link? | Check intent filters |

### OG Tags Not Showing

| Cause | Check | Fix |
|-------|-------|-----|
| API down | Fallback content? | Verify fallback works |
| Page not found | File exists? | Check `app/post/[id]/page.tsx` |
| No metadata | generateMetadata? | Implement function |
| Caching | Rebuild? | `npm run build` |

---

## 📊 Monitoring & Analytics

### Events Tracked
- `click` - User clicked link
- `opened` - App opened successfully
- `fallback` - Landed on web page
- `install` - User clicked download button
- `browser_continue` - User browsing web

### Metrics Available
```javascript
// In localStorage
{
  click_count: 42,
  app_opens: 15,
  fallback_views: 27,
  install_clicks: 8,
  conversion_rate: 0.36,  // 15/42
  device: 'iOS',
  os: 'iPhone OS 17.0'
}
```

---

## 🔒 Security Considerations

1. **HTTPS Only**
   - Both assetlinks.json and apple-app-site-association must be HTTPS
   - No redirects allowed

2. **SHA256 Verification** (Android)
   - Must match Play Store signing certificate
   - Update if signing key changes

3. **Team ID Verification** (iOS)
   - Must match app's signing identity
   - Must be exactly 10 characters

4. **Domain Validation**
   - Must own arthhwise.com domain
   - DNS records must resolve correctly

---

## 📋 Pre-Release Checklist

### Web
- [ ] assetlinks.json deployed and accessible
- [ ] apple-app-site-association deployed and accessible
- [ ] All landing pages tested
- [ ] OG tags verified with social debuggers
- [ ] Analytics console showing events
- [ ] No JavaScript errors

### iOS
- [ ] Associated Domains capability added
- [ ] Entitlements file correct
- [ ] URL handling code implemented
- [ ] Build succeeds with no warnings
- [ ] Signed with production certificate
- [ ] Submitted to App Store

### Android
- [ ] Intent filters in manifest
- [ ] Deep link handler implemented
- [ ] SHA256 verified in Play Store
- [ ] Build APK/AAB succeeds
- [ ] Signed with release keystore
- [ ] Submitted to Play Store

### Post-Release
- [ ] All 3 files deployed (web + iOS + Android)
- [ ] Wait 24-48 hours for processing
- [ ] Test on real A device (iOS)
- [ ] Test on real device (Android)
- [ ] Monitor analytics for engagement
- [ ] Monitor error rates

---

## 🎓 Related Documentation

- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Apple Universal Links](https://developer.apple.com/ios/universal-links/)
- [Android App Links](https://developer.android.com/training/app-links)
- [OG Protocol Reference](https://ogp.me/)
- [Google Analytics Integration](https://developers.google.com/analytics/devguides/collection/gtagjs)

---

## 🔗 File Quick Links

**Core Implementation:**
- [deeplink.ts](../../src/lib/deeplink.ts) - Core logic
- [apiContent.ts](../../src/lib/apiContent.ts) - API integration
- [deepLinkAnalytics.ts](../../src/lib/deepLinkAnalytics.ts) - Analytics
- [DeepLinkHandler.tsx](../../src/components/DeepLink/DeepLinkHandler.tsx) - UI

**Verification:**
- [assetlinks.json](../../public/.well-known/assetlinks.json) - Android
- [apple-app-site-association](../../public/.well-known/apple-app-site-association) - iOS

**Landing Pages:**
- [post/[id]/page.tsx](../../src/app/post/%5Bid%5D/page.tsx)
- [contest/[id]/page.tsx](../../src/app/contest/%5Bid%5D/page.tsx)
- [user/[id]/page.tsx](../../src/app/user/%5Bid%5D/page.tsx)
- [course/[id]/page.tsx](../../src/app/course/%5Bid%5D/page.tsx)

---

**Status:** Web complete, awaiting app updates for full OS-level link handling
**Maintained By:** Saurabh Patel
**Last Updated:** After iOS and Android documentation
