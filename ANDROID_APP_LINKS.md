# Android Manifest Configuration for App Links

## 📄 File Location

Update your Android app's `AndroidManifest.xml` with the following configuration. This enables App Links so that links like `https://arthhwise.com/post/123` open your app directly.

---

## 📋 Complete Activity Configuration

Replace or update your MainActivity in `AndroidManifest.xml`:

```xml
<activity
  android:name=".MainActivity"
  android:exported="true"
  android:launchMode="singleTask">

  <!-- Standard main activity intent filter -->
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>

  <!-- ===== DEEP LINKS (arthwise:// scheme) ===== -->
  <intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="arthwise" />
  </intent-filter>

  <!-- ===== APP LINKS (HTTPS - OS verified) ===== -->
  <!-- IMPORTANT: android:autoVerify="true" enables App Links verification -->
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    
    <!-- Host: arthhwise.com -->
    <!-- Scheme: https (required for App Links) -->
    
    <!-- POST paths: /post/* -->
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/post" />
    
    <!-- CONTEST paths: /contest/* -->
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/contest" />
    
    <!-- USER paths: /user/* -->
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/user" />
    
    <!-- COURSE paths: /course/* -->
    <data
      android:scheme="https"
      android:host="arthhwise.com"
      android:pathPrefix="/course" />
  </intent-filter>

</activity>
```

---

## 🔑 How to Handle These Links in Code

### Kotlin (MainActivity.kt)

```kotlin
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    
    // Handle app links
    handleIntent(intent)
  }
  
  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    handleIntent(intent)
  }
  
  private fun handleIntent(intent: Intent) {
    val data = intent.data
    
    if (data != null) {
      val pathSegments = data.pathSegments
      
      if (pathSegments.isNotEmpty()) {
        val type = pathSegments[0]  // "post", "contest", "user", "course"
        val id = if (pathSegments.size > 1) pathSegments[1] else null
        
        if (id != null) {
          navigateToContent(type, id)
        }
      }
    }
  }
  
  private fun navigateToContent(type: String, id: String) {
    // Navigate to appropriate screen
    when (type) {
      "post" -> navigateToPost(id)
      "contest" -> navigateToContest(id)
      "user" -> navigateToUserProfile(id)
      "course" -> navigateToCourse(id)
    }
  }
  
  private fun navigateToPost(id: String) {
    // Your navigation logic
    println("Opening post: $id")
  }
  
  private fun navigateToContest(id: String) {
    println("Opening contest: $id")
  }
  
  private fun navigateToUserProfile(id: String) {
    println("Opening user: $id")
  }
  
  private fun navigateToCourse(id: String) {
    println("Opening course: $id")
  }
}
```

### Java (MainActivity.java)

```java
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import java.util.List;

public class MainActivity extends AppCompatActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    
    handleIntent(getIntent());
  }
  
  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    handleIntent(intent);
  }
  
  private void handleIntent(Intent intent) {
    Uri data = intent.getData();
    
    if (data != null) {
      List<String> pathSegments = data.getPathSegments();
      
      if (!pathSegments.isEmpty()) {
        String type = pathSegments.get(0);  // "post", "contest", etc.
        String id = pathSegments.size() > 1 ? pathSegments.get(1) : null;
        
        if (id != null) {
          navigateToContent(type, id);
        }
      }
    }
  }
  
  private void navigateToContent(String type, String id) {
    switch (type) {
      case "post":
        navigateToPost(id);
        break;
      case "contest":
        navigateToContest(id);
        break;
      case "user":
        navigateToUserProfile(id);
        break;
      case "course":
        navigateToCourse(id);
        break;
    }
  }
  
  private void navigateToPost(String id) {
    System.out.println("Opening post: " + id);
  }
  
  private void navigateToContest(String id) {
    System.out.println("Opening contest: " + id);
  }
  
  private void navigateToUserProfile(String id) {
    System.out.println("Opening user: " + id);
  }
  
  private void navigateToCourse(String id) {
    System.out.println("Opening course: " + id);
  }
}
```

---

## ✅ Required Configuration

### 1. AndroidManifest.xml
```xml
<uses-permission android:name="android.permission.INTERNET" />
<!-- Required for accessing https:// links -->
```

### 2. build.gradle
```gradle
android {
  compileSdk 34  // or higher
  
  defaultConfig {
    targetSdk 34  // or higher
    minSdk 21     // App Links requires API 21+
  }
}
```

### 3. Website Configuration
- ✅ assetlinks.json at: `https://arthhwise.com/.well-known/assetlinks.json`
- ✅ File served over HTTPS
- ✅ Contains your app's package name and SHA256 fingerprint

---

## 🧪 Testing Steps

### Step 1: Get Your SHA256 Fingerprint

```bash
# Option A: From Play Console (Recommended)
# Go to: Play Console → Your App → Setup → App Integrity
# Copy the SHA256 of "App signing key certificate"

# Option B: From local keystore
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# Find: sha256 line, e.g.:
# SHA256: 1F:C0:96:80:13:60:15:EE:9D:3B:F9:19:4F:EE:EB:B9:FC:E0:0C:EE:A9:6B:EA:1A:D7:7A:F1:E5:84:33:56:D0
```

### Step 2: Verify assetlinks.json

```bash
# Verify file is accessible
curl -I https://arthhwise.com/.well-known/assetlinks.json
# Should return: HTTP 200 OK

# Get content
curl https://arthhwise.com/.well-known/assetlinks.json
```

### Step 3: Install and Test

```bash
# Build and install app
./gradlew installDebug

# Or deploy to Google Play

# Wait 24-48 hours for Google to verify
# Check verification status:
adb shell dumpsys package domain-preferred-apps

# Should see something like:
# Package: com.arthwise
# State: enabled
# Domains: arthhwise.com

# Test opening a link
adb shell am start -W -a android.intent.action.VIEW \
  -d "https://arthhwise.com/post/123"

# Expected: App opens directly (no browser!)
```

### Step 4: Verify in Play Console

1. Go to Google Play Console
2. Select your app
3. Navigate to: Release → Setup → App integrity
4. Look for "App Links" section
5. Should show: "1 App Link verified"

---

## 📊 Comparison: Before & After

### ❌ Before (Without App Links)
```
User clicks: https://arthhwise.com/post/123
    ↓
Browser opens
    ↓
User taps "Open in App" button (if available)
    ↓
Deep link attempt with timeout
```

### ✅ After (With App Links)
```
User clicks: https://arthhwise.com/post/123
    ↓
Android OS checks: Is app installed & verified?
    ↓
YES: App opens instantly
NO: Browser opens with landing page
```

---

## 🔒 Important Notes

1. **android:autoVerify="true"**
   - Tells Android to verify this activity handles App Links
   - Android contacts assetlinks.json to confirm
   - Takes 24-48 hours after app release

2. **HTTPS Required**
   - App Links only work with HTTPS
   - HTTP will not trigger App Links
   - Deep links (arthwise://) still work with HTTP for testing

3. **launchMode="singleTask"**
   - Prevents multiple instances
   - Good practice for app links
   - Optional but recommended

4. **exported="true"**
   - Required for Android 12+
   - Allows the system to launch this activity

---

## 🚀 Deployment Checklist

- [ ] AndroidManifest.xml updated with intent filters
- [ ] MainActivity handles Intent data
- [ ] SHA256 fingerprint matches assetlinks.json
- [ ] assetlinks.json is valid JSON (use [assetlinks.app](https://assetlinks.app) to verify)
- [ ] assetlinks.json accessible over HTTPS
- [ ] Build signed with production key
- [ ] Release to Google Play Store
- [ ] Wait 24-48 hours for verification
- [ ] Test with `adb shell dumpsys`
- [ ] Test opening links on device

---

## 🔗 Resources

- [Android App Links Official Docs](https://developer.android.com/training/app-links)
- [Intent Filter Verification](https://developer.android.com/training/app-links/verify-android-applinks)
- [assetlinks.json Generator](https://assetlinks.app/)
- [Deep Links vs App Links](https://developer.android.com/training/app-links/deep-linking)

---

**Next Step:** Update your Android app manifest and test on device!
