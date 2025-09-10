# Firebase Setup Instructions

## Prerequisites

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication in the Firebase console
3. Configure sign-in methods (Email/Password recommended for initial setup)

## Configuration Steps

### Step 1: Get Firebase Configuration
1. Go to your Firebase project settings
2. In the "General" tab, scroll down to "Your apps"
3. Add a web app to get the configuration object
4. Copy the config values

### Step 2: Update Configuration
1. Open `app/config/firebase.ts`
2. Replace the placeholder values with your actual Firebase config:
   - `apiKey`: Your Firebase API key
   - `authDomain`: Your project's auth domain
   - `projectId`: Your Firebase project ID
   - `storageBucket`: Your project's storage bucket
   - `messagingSenderId`: Your messaging sender ID
   - `appId`: Your Firebase app ID

### Step 3: For React Native (when not using Expo Go)
If building for native apps, you'll also need:

**For Android:**
1. Download `google-services.json` from Firebase console
2. Place it in `android/app/` directory

**For iOS:**
1. Download `GoogleService-Info.plist` from Firebase console  
2. Place it in `ios/` directory

### Step 4: Update Expo Configuration (if needed)
For production builds, you may need to add Firebase plugins to your `app.config.ts`.

## Security Notes
- Never commit real Firebase configuration to version control if your repo is public
- Consider using environment variables for sensitive configuration
- Set up Firebase Security Rules for production use