import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"

/**
 * Firebase configuration object
 * Replace these values with your actual Firebase project configuration
 * Get these values from your Firebase project settings
 */
const firebaseConfig = {
  apiKey: "AIzaSyCT5qKOnBisgRRFpf8JvHxYCc9faufq1ig",
  authDomain: "starterapptan.firebaseapp.com",
  projectId: "starterapptan",
  storageBucket: "starterapptan.firebasestorage.app",
  messagingSenderId: "240802916098",
  appId: "1:240802916098:web:8b03f293d7f19299ce041b",
  measurementId: "G-Q7NKPQ90TY",
}

/**
 * Initialize Firebase app if not already initialized
 */
let firebaseApp: FirebaseApp

if (getApps().length === 0) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = getApps()[0]
}

// Initialize Firebase Auth
const auth = getAuth(firebaseApp)

export { firebaseApp, auth }
export default firebaseApp
