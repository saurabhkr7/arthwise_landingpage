# App Links & Universal Links Setup

## 🎯 Overview

This document covers OS-level link handling for instant app opening without JavaScript timeouts.

**Result:**
- Click: `https://arthhwise.com/post/123`
- **Instant app open** (no landing page, no JS)
- OS automatically routes to app if installed

---

## Android App Links Setup

### ✅ What We Have

**File:** `/public/.well-known/assetlinks.json`

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.arthwise",
      "sha256_cert_fingerprints": [
        "1F:C0:96:80:13:60:15:EE:9D:3B:F9:19:4F:EE:EB:B9:FC:E0:0C:EE:A9:6B:EA:1A:D7:7A:F1:E5:84:33:56:D0"
      ]
    }
  }
]
```

**Accessible at:**
```
https://arthhwise.com/.well-known/assetlinks.json
http://localhost:3000/.well-known/assetlinks.json (local testing)
```

### 🔧 Android App Configuration

Add to `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:exported="true">
  
  <!-- Deep links via scheme -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="arthwise" />
  </intent-filter>

  <!-- App Links (HTTPS only) -->
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    
    <!-- All supported domains -->
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/post" />
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/contest" />
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/user" />
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/course" />
  </intent-filter>
</activity>
```

### 🧪 Test Android App Links

```bash
# Verify domain verification
adb shell dumpsys package domain-preferred-apps | grep arthwise

# Expected output:
# Package: com.arthwise
#   User States: state_enabled

# Test opening a link
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://arthhwise.com/post/123" com.arthwise

# Expected: App opens directly, no browser
```

---

## iOS Universal Links Setup

### ✅ What We Have

**File:** `/public/.well-known/apple-app-site-association`

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "TEAM_ID.com.arthwise",
        "paths": [
          "/post/*",
          "/contest/*",
          "/user/*",
          "/course/*"
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["TEAM_ID.com.arthwise"]
  }
}
```

### 🔧 iOS App Configuration

#### Step 1: Update apple-app-site-association

Replace `TEAM_ID` with your actual Apple Team ID (from [developer.apple.com](https://developer.apple.com)):

```bash
# Example: If Team ID is "ABC123DEF4"
# appID should be: "ABC123DEF4.com.arthwise"
```

#### Step 2: Configure in Xcode

1. **Add Domain**
   - Xcode Project → Signing & Capabilities
   - Click "+ Capability"
   - Add "Associated Domains"
   - Domain: `applinks:arthhwise.com`
   - Domain: `webcredentials:arthhwise.com`

2. **Update Info.plist**
   ```xml
   <key>NSAppTransportSecurity</key>
   <dict>
     <key>NSExceptionDomains</key>
     <dict>
       <key>arthhwise.com</key>
       <dict>
         <key>NSIncludesSubdomains</key>
         <true/>
         <key>NSExceptionAllowsInsecureHTTPLoads</key>
         <false/>
       </dict>
     </dict>
   </dict>
   ```

3. **Handle Universal Links in Code**

```swift
// SceneDelegate.swift
func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
  guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
        let incomingURL = userActivity.webpageURL,
        let components = URLComponents(url: incomingURL, resolvingAgainstBaseURL: true) else {
    return
  }

  let pathComponents = incomingURL.pathComponents
  
  if pathComponents.count >= 3 {
    let type = pathComponents[1]  // "post", "contest", etc.
    let id = pathComponents[2]    // resource id
    
    // Navigate to content
    handleDeepLink(type: type, id: id)
  }
}

private func handleDeepLink(type: String, id: String) {
  // Navigate to appropriate screen
  switch type {
  case "post":
    navigateToPost(id: id)
  case "contest":
    navigateToContest(id: id)
  case "user":
    navigateToUserProfile(id: id)
  case "course":
    navigateToCourse(id: id)
  default:
    break
  }
}
```

#### Step 3: Test iOS Universal Links

```bash
# On device, after installing app with Universal Links:
# Just click a link like: https://arthhwise.com/post/123
# Should open app directly (no landing page)

# To verify Apple processed the file:
# Settings → Developer → Diagnostics
# Look for Universal Links validation messages
```

---

## Comparison: Old vs New Flow

### ❌ Old Flow (Current - JavaScript-based)

```
User clicks: https://arthhwise.com/post/123
    ↓
Landing page loads in browser
    ↓
JavaScript attempts: window.location = "arthwise://post/123"
    ↓
Browser waits 1500ms
    ↓
If app not responsive → redirect to store
```

**Issues:**
- Visible landing page
- 1.5 second delay
- May fail on some devices
- Not native experience

### ✅ New Flow (App Links/Universal Links - OS-level)

```
User clicks: https://arthhwise.com/post/123
    ↓
OS checks: Is app installed & verified for this domain?
    ↓
If YES → App opens instantly (no browser)
If NO → Browser loads landing page
```

**Benefits:**
- Instant opening
- No visible landing page
- Native OS behavior
- Better UX
- Reliably works on all devices

---

## Verification Checklist

### Android
- [ ] assetlinks.json is valid JSON
- [ ] File accessible at: `https://arthhwise.com/.well-known/assetlinks.json`
- [ ] SHA256 matches Play Store signing key
- [ ] AndroidManifest has correct intent filters
- [ ] `android:autoVerify="true"` set
- [ ] Test with: `adb shell dumpsys package domain-preferred-apps`

### iOS
- [ ] apple-app-site-association is valid JSON
- [ ] File accessible at: `https://arthhwise.com/.well-known/apple-app-site-association`
- [ ] TEAM_ID replaced with actual Apple Team ID
- [ ] Associated Domains capability added in Xcode
- [ ] appID format correct: `TEAM_ID.com.arthwise`
- [ ] App handles Universal Links in code
- [ ] Tested on device (not simulator)

---

## Configuration Files Summary

### Production Access

```
https://arthhwise.com/.well-known/assetlinks.json
https://arthhwise.com/.well-known/apple-app-site-association
```

### Local Testing

```
http://localhost:3000/.well-known/assetlinks.json
http://localhost:3000/.well-known/apple-app-site-association
```

### Files Required

```
public/
└── .well-known/
    ├── assetlinks.json                 ✅ Ready
    └── apple-app-site-association     ✅ Ready (TEAM_ID needed)
```

---

## Finding Your Apple Team ID

1. Go to [developer.apple.com](https://developer.apple.com)
2. Sign in with your Apple Developer account
3. Click "Account" → "Membership Details"
4. Find "Team ID" (format: 10-character alphanumeric)
5. Update `apple-app-site-association`:
   ```json
   "appID": "YOUR_TEAM_ID.com.arthwise"
   ```

---

## Finding SHA256 for Android

1. **From Play Console (Recommended):**
   - Google Play Console → Your App → Release → Setup → App Integrity
   - Find "App signing key certificate" SHA-256 fingerprint
   - Copy full fingerprint (with colons)

2. **From Local Build:**
   ```bash
   # If you have the keystore
   keytool -list -v -keystore path/to/keystore.jks
   ```

3. **From Installed App:**
   ```bash
   # Get app signature
   adb shell dumpsys packages signatures | grep -A5 "com.arthwise"
   ```

---

## Next Steps

1. **Android:**
   - [ ] Get SHA256 from Play Console (confirm it matches current assetlinks.json)
   - [ ] Update AndroidManifest.xml with intent filters
   - [ ] Rebuild and release to Google Play
   - [ ] Wait 24-48 hours for verification
   - [ ] Test with `adb` commands

2. **iOS:**
   - [ ] Get Apple Team ID
   - [ ] Replace `TEAM_ID` in apple-app-site-association
   - [ ] Add Associated Domains in Xcode
   - [ ] Implement Universal Link handler
   - [ ] Build and distribute (TestFlight/App Store)
   - [ ] Test on device

3. **Fallback:**
   - Keep JavaScript deep linking as fallback
   - Landing page still accessible for:
     - Browsers
     - App not installed
     - Link preview generation

---

## Testing in Real Devices

### Android
```bash
# After installing app from Play Store
adb shell dumpsys package domain-preferred-apps | grep arthwise

# Test
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://arthhwise.com/post/123"
```

### iOS
```bash
# After installing from TestFlight/App Store
# Simply click link on device:
https://arthhwise.com/post/123

# Should open app instantly (if configured correctly)
# If not, you'll see landing page
```

---

## Troubleshooting

### Android: assetlinks.json not found
```bash
curl -I https://arthhwise.com/.well-known/assetlinks.json
# Should return 200
```

### iOS: Universal Links not working
- Verify assetlinks.json is valid JSON
- Check TEAM_ID is correct
- Rebuild app after adding Associated Domains
- Test on physical device (not simulator)
- Check Apple may take time to process

### Both: Testing locally
```bash
# Serve locally for testing
http://localhost:3000/.well-known/assetlinks.json
http://localhost:3000/.well-known/apple-app-site-association
```

---

## Important Notes

1. **Verification Takes Time:**
   - Android: Usually within hours of Google Play build
   - iOS: Can take 24-48 hours after release

2. **Errors Are Silent:**
   - If misconfigured, system falls back to browser silently
   - Check `adb dumpsys` or Apple's diagnostics

3. **Both Methods Should Work:**
   - App Links handles HTTPS links
   - Deep link scheme handles app:// links
   - Both together = complete coverage

4. **Keep Landing Page:**
   - Still needed for:
     - Web browsers
     - Preview generation (WhatsApp, Twitter, etc.)
     - Users without app installed

---

## Resources

- [Android App Links Documentation](https://developer.android.com/training/app-links)
- [iOS Universal Links Documentation](https://developer.apple.com/ios/universal-links/)
- [assetlinks.json Generator Tool](https://assetlinks.app/)
- [Apple Tech Note TN3127](https://developer.apple.com/library/archive/technotes/tn3127/_index.html)

---

**Status:** ✅ Configuration files created and ready
**Next:** Update app manifests and test on devices
