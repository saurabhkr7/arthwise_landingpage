# iOS Universal Links Configuration

## 📄 File Location

This guide covers iOS Universal Links setup so that links like `https://arthhwise.com/post/123` open your iOS app directly.

---

## 🎯 What You Need

1. **Apple Team ID** - From [developer.apple.com](https://developer.apple.com)
2. **Bundle Identifier** - Your app's bundle ID (e.g., `com.arthwise`)
3. **assetlinks.json** - Already prepared (needs TEAM_ID)
4. **Xcode Project** - Your iOS app

---

## 📋 Step 1: Find Your Apple Team ID

```
Visit: https://developer.apple.com/account/#!/membership
```

1. Sign in with Apple Developer account
2. Click "Membership Details"
3. Find "Team ID" (10-character alphanumeric, e.g., "ABC123DEF4")

---

## 📋 Step 2: Update apple-app-site-association

File location: `/public/.well-known/apple-app-site-association`

Replace `TEAM_ID` with your actual Team ID:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "ABC123DEF4.com.arthwise",
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
    "apps": ["ABC123DEF4.com.arthwise"]
  }
}
```

**Format:** `TEAM_ID.BUNDLE_ID`
- Example: `ABC123DEF4.com.arthwise`

---

## 🛠️ Step 3: Xcode Configuration

### 3.1 Add Associated Domains Capability

1. Open Xcode → Select your project
2. Go to "Signing & Capabilities"
3. Click "+ Capability"
4. Search for "Associated Domains"
5. Click to add

### 3.2 Add Domain Entries

After adding Associated Domains capability, you'll see a text field:

```
applinks:arthhwise.com
webcredentials:arthhwise.com
```

Add both entries.

### 3.3 Verify Entitlements File

Check `YourApp.entitlements` contains:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.developer.associated-domains</key>
  <array>
    <string>applinks:arthhwise.com</string>
    <string>webcredentials:arthhwise.com</string>
  </array>
</dict>
</plist>
```

---

## 🛠️ Step 4: Update Info.plist

Add Transport Security settings:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <!-- ... other info plist entries ... -->
  
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
        <key>NSExceptionRequiresForwardSecrecy</key>
        <true/>
        <key>NSExceptionMinimumTLSVersion</key>
        <string>TLSv1.2</string>
      </dict>
    </dict>
  </dict>
</dict>
</plist>
```

---

## 📝 Step 5: Handle Universal Links in Code

### Option A: SwiftUI (Recommended)

In `SceneDelegate` or use `.onOpenURL` modifier:

```swift
import UIKit
import SwiftUI

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  
  var window: UIWindow?
  
  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    // Handle Universal Link at app launch
    if let userActivity = connectionOptions.userActivities.first {
      handleUserActivity(userActivity)
    }
  }
  
  func windowScene(
    _ windowScene: UIWindowScene,
    performActionFor shortcutItem: UIApplicationShortcutItem,
    completionHandler: @escaping (Bool) -> Void
  ) {
    completionHandler(true)
  }
  
  // Handle Universal Links during app activity
  func scene(
    _ scene: UIScene,
    continue userActivity: NSUserActivity
  ) {
    handleUserActivity(userActivity)
  }
  
  private func handleUserActivity(_ userActivity: NSUserActivity) {
    guard userActivity.activityType == NSUserActivityTypeBrowsingWeb else {
      return
    }
    
    guard let incomingURL = userActivity.webpageURL else {
      return
    }
    
    let pathComponents = incomingURL.pathComponents
    
    // pathComponents: ["", "post", "123"]
    if pathComponents.count >= 3 {
      let type = pathComponents[1]  // "post", "contest", etc.
      let id = pathComponents[2]    // resource ID
      
      // Navigate to content
      handleDeepLink(type: type, id: id)
    }
  }
  
  private func handleDeepLink(type: String, id: String) {
    // Get the root view controller or use notification
    // to navigate to appropriate screen
    
    NotificationCenter.default.post(
      name: NSNotification.Name("HandleDeepLink"),
      object: nil,
      userInfo: ["type": type, "id": id]
    )
  }
}

// In your SwiftUI View:
struct ContentView: View {
  @State private var deepLinkContent: (type: String, id: String)?
  
  var body: some View {
    NavigationView {
      // Your main content
      if let content = deepLinkContent {
        navigateToContent(type: content.type, id: content.id)
      } else {
        HomeView()
      }
    }
    .onReceive(
      NotificationCenter.default
        .publisher(for: NSNotification.Name("HandleDeepLink"))
    ) { notification in
      if let userInfo = notification.userInfo,
         let type = userInfo["type"] as? String,
         let id = userInfo["id"] as? String {
        deepLinkContent = (type: type, id: id)
      }
    }
  }
  
  @ViewBuilder
  private func navigateToContent(type: String, id: String) -> some View {
    switch type {
    case "post":
      PostDetailView(id: id)
    case "contest":
      ContestDetailView(id: id)
    case "user":
      UserProfileView(id: id)
    case "course":
      CourseDetailView(id: id)
    default:
      HomeView()
    }
  }
}
```

### Option B: UIKit

In your `AppDelegate.swift`:

```swift
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  func application(
    _ application: UIApplication,
    continue userActivity: NSUserActivity,
    restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
  ) -> Bool {
    
    guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
          let incomingURL = userActivity.webpageURL else {
      return false
    }
    
    let pathComponents = incomingURL.pathComponents
    
    if pathComponents.count >= 3 {
      let type = pathComponents[1]
      let id = pathComponents[2]
      
      handleDeepLink(type: type, id: id)
      return true
    }
    
    return false
  }
  
  private func handleDeepLink(type: String, id: String) {
    guard let window = UIApplication.shared.connectedScenes
      .compactMap({ $0 as? UIWindowScene })
      .first?
      .windows
      .first else {
      return
    }
    
    guard let rootViewController = window.rootViewController as? UINavigationController else {
      return
    }
    
    switch type {
    case "post":
      let postVC = PostDetailViewController(id: id)
      rootViewController.pushViewController(postVC, animated: true)
    case "contest":
      let contestVC = ContestDetailViewController(id: id)
      rootViewController.pushViewController(contestVC, animated: true)
    case "user":
      let userVC = UserProfileViewController(id: id)
      rootViewController.pushViewController(userVC, animated: true)
    case "course":
      let courseVC = CourseDetailViewController(id: id)
      rootViewController.pushViewController(courseVC, animated: true)
    default:
      break
    }
  }
}
```

### Option C: React Native (if applicable)

```javascript
import { useEffect } from 'react';
import { Linking } from 'react-native';

export default function App() {
  useEffect(() => {
    // Handle Universal Link when app is launched
    Linking.getInitialURL().then((url) => {
      if (url != null) {
        handleDeepLink(url);
      }
    });
    
    // Handle Universal Links when app is already running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleDeepLink(url);
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  const handleDeepLink = (url: string) => {
    const parsed = new URL(url);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    
    if (pathParts.length >= 2) {
      const [type, id] = pathParts;
      navigateToContent(type, id);
    }
  };
  
  const navigateToContent = (type: string, id: string) => {
    // Your navigation logic
    switch (type) {
      case 'post':
        navigation.navigate('PostDetail', { id });
        break;
      case 'contest':
        navigation.navigate('ContestDetail', { id });
        break;
      case 'user':
        navigation.navigate('UserProfile', { id });
        break;
      case 'course':
        navigation.navigate('CourseDetail', { id });
        break;
    }
  };
  
  return (
    // Your app UI
  );
}
```

---

## ✅ Testing Steps

### Before Release

```bash
# Build app for testing
xcodebuild -scheme Arthwise -configuration Debug -derivedDataPath build

# Install on simulator (for development testing)
xcrun simctl install booted build/Products/Debug-iphonesimulator/Arthwise.app
```

### After Release (On Real Device)

1. **Install app** from TestFlight or App Store
2. **Wait 24-48 hours** for Apple to process Universal Links
3. **Click a link** like: `https://arthhwise.com/post/123`
4. **Expected:** App opens directly (no Safari)

### Debugging

**On device, go to:**
```
Settings → Developer → Universal Links
```

Look for status of your domains.

**Or use Xcode console:**
```bash
# Connect device
# Open Xcode → Window → Devices and Simulators
# Select device → Console
# Look for diagnostics about Universal Links
```

---

## 🛠️ Troubleshooting

### Problem: Links still open in Safari

**Possible causes:**
- apple-app-site-association not accessible
- TEAM_ID is incorrect
- Associated Domains not added
- App not released (app must be on App Store)
- Apple hasn't processed it yet (wait 24-48 hours)

**Solution:**
1. Verify `apple-app-site-association` is valid JSON
2. Check TEAM_ID matches your dev account
3. Rebuild and re-submit to App Store
4. Wait additional time

### Problem: "Cannot parse apple-app-site-association"

**Check:**
```bash
# Validate JSON syntax
curl https://arthhwise.com/.well-known/apple-app-site-association | jq .
```

**Ensure:**
- Valid JSON syntax
- TEAM_ID is exactly 10 characters
- appID format: `TEAM_ID.com.arthwise`

### Problem: Universal Link works in simulator but not device

**Note:** This is normal! Universal Links require app to be on App Store.
- Simulator uses development certificate (can be tested early)
- Device requires production certificate (app must be distributed)

---

## 📊 Comparison: Before & After

### ❌ Before (Without Universal Links)
```
User clicks: https://arthhwise.com/post/123
    ↓
Safari opens
    ↓
App is installed but not opened
    ↓
User manually opens app
```

### ✅ After (With Universal Links)
```
User clicks: https://arthhwise.com/post/123
    ↓
iOS checks: Is app installed & verified?
    ↓
YES: App opens directly (no Safari)
NO: Safari opens with landing page
```

---

## 🚀 Deployment Checklist

- [ ] Apple Team ID found and noted
- [ ] apple-app-site-association updated with TEAM_ID
- [ ] Associated Domains capability added in Xcode
- [ ] Entitlements file verified
- [ ] Info.plist has ATS settings
- [ ] Code handles Universal Links (scene delegate or app delegate)
- [ ] Build signed with production certificate
- [ ] App released to App Store
- [ ] Wait 24-48 hours for Apple processing
- [ ] Test on physical device
- [ ] Verify in Settings → Developer → Universal Links

---

## 🔗 Resources

- [Apple Official Documentation](https://developer.apple.com/ios/universal-links/)
- [Apple Tech Note TN3127](https://developer.apple.com/library/archive/technotes/tn3127/_index.html)
- [Debugging Universal Links](https://developer.apple.com/documentation/xcode/validating-universal-links)
- [apple-app-site-association Generator](https://branch.io/resources/aasa-validator/)

---

## 📝 Important Notes

1. **App Must Be on App Store**
   - Universal Links only work with apps distributed through App Store
   - TestFlight apps can test in simulator
   - Device requires production release

2. **Processing Time**
   - Can take 24-48 hours for Apple to process
   - Clearing Safari cache may help earlier testing

3. **Keep Landing Page**
   - Landing page needed for:
     - Users without app installed
     - Preview generation (social media)
     - Web fallback

4. **Both Methods Together**
   - Deep links: `arthwise://post/123`
   - Universal Links: `https://arthhwise.com/post/123`
   - Together they provide complete coverage

---

**Next Step:** Add to Xcode and test on physical device after App Store release!
