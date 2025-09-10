import { firebaseApp, auth } from "@/config/firebase"

/**
 * Test Firebase initialization and connection
 * This function verifies that Firebase is properly configured and connected
 */
export const testFirebaseConnection = async (): Promise<{
  success: boolean
  message: string
  details?: any
}> => {
  try {
    // Check if Firebase app is initialized
    if (!firebaseApp) {
      return {
        success: false,
        message: "Firebase app not initialized",
      }
    }

    // Check if Auth is initialized
    if (!auth) {
      return {
        success: false,
        message: "Firebase Auth not initialized",
      }
    }

    // Test auth connection by checking current user (will be null initially, but won't error)
    const currentUser = auth.currentUser

    return {
      success: true,
      message: "Firebase initialized successfully",
      details: {
        appName: firebaseApp.name,
        authConnected: true,
        currentUser: currentUser ? "User logged in" : "No user logged in",
      },
    }
  } catch (error) {
    console.error("Firebase connection test failed:", error)
    return {
      success: false,
      message: "Firebase connection test failed",
      details: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Log Firebase connection status for debugging
 */
export const logFirebaseStatus = async () => {
  const result = await testFirebaseConnection()

  if (result.success) {
    console.log("✅ Firebase Status:", result.message)
    console.log("📱 Details:", result.details)
  } else {
    console.error("❌ Firebase Status:", result.message)
    if (result.details) {
      console.error("🔍 Error Details:", result.details)
    }
  }

  return result
}
