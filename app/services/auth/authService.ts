import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from "firebase/auth"

import { auth } from "@/config/firebase"

import { mapFirebaseAuthError, validateCredentials } from "./authErrors"
import {
  AuthResult,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
  PasswordResetRequest,
  AuthState,
  AuthStateChangeListener,
  AuthConfig,
} from "./authTypes"

/**
 * Authentication service class that handles all Firebase Auth operations
 */
class AuthService {
  private listeners: AuthStateChangeListener[] = []
  private unsubscribe: Unsubscribe | null = null
  private config: AuthConfig

  constructor(config: AuthConfig = {}) {
    this.config = {
      persistence: true,
      emailVerificationRequired: false,
      ...config,
    }

    // Set up auth state listener
    this.setupAuthStateListener()
  }

  /**
   * Sets up Firebase auth state change listener
   */
  private setupAuthStateListener = (): void => {
    this.unsubscribe = onAuthStateChanged(auth, (user) => {
      const authUser = user ? this.mapFirebaseUserToAuthUser(user) : null
      const authState = user ? AuthState.AUTHENTICATED : AuthState.UNAUTHENTICATED

      console.log("[AuthService] Auth state changed:", {
        hasUser: !!user,
        uid: user?.uid,
        authState,
        listenersCount: this.listeners.length,
      })

      // Notify all registered listeners
      this.listeners.forEach((listener) => listener(authUser, authState))
    })
  }

  /**
   * Maps Firebase User to our AuthUser interface
   */
  private mapFirebaseUserToAuthUser = (user: User): AuthUser => {
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      isAnonymous: user.isAnonymous,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      },
    }
  }

  /**
   * Registers a listener for auth state changes
   */
  onAuthStateChange = (listener: AuthStateChangeListener): (() => void) => {
    this.listeners.push(listener)

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  /**
   * Gets the current authenticated user
   */
  getCurrentUser = (): AuthUser | null => {
    const user = auth.currentUser
    return user ? this.mapFirebaseUserToAuthUser(user) : null
  }

  /**
   * Checks if user is currently authenticated
   */
  isAuthenticated = (): boolean => {
    return auth.currentUser !== null
  }

  /**
   * Signs in user with email and password
   */
  signIn = async (credentials: LoginCredentials): Promise<AuthResult<AuthUser>> => {
    try {
      // Validate credentials
      const validationError = validateCredentials(credentials.email, credentials.password)
      if (validationError) {
        return {
          success: false,
          error: validationError,
        }
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      )

      const authUser = this.mapFirebaseUserToAuthUser(userCredential.user)

      return {
        success: true,
        data: authUser,
      }
    } catch (error) {
      return {
        success: false,
        error: mapFirebaseAuthError(error),
      }
    }
  }

  /**
   * Creates a new user account with email and password
   */
  signUp = async (credentials: RegisterCredentials): Promise<AuthResult<AuthUser>> => {
    try {
      // Validate credentials
      const validationError = validateCredentials(credentials.email, credentials.password)
      if (validationError) {
        return {
          success: false,
          error: validationError,
        }
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password,
      )

      // Update display name if provided
      if (credentials.displayName) {
        await updateProfile(userCredential.user, {
          displayName: credentials.displayName,
        })
      }

      const authUser = this.mapFirebaseUserToAuthUser(userCredential.user)

      return {
        success: true,
        data: authUser,
      }
    } catch (error) {
      return {
        success: false,
        error: mapFirebaseAuthError(error),
      }
    }
  }

  /**
   * Signs out the current user
   */
  signOut = async (): Promise<AuthResult> => {
    console.log("[AuthService] signOut called")
    try {
      console.log("[AuthService] Calling firebaseSignOut...")
      await firebaseSignOut(auth)
      console.log("[AuthService] firebaseSignOut successful")
      return {
        success: true,
      }
    } catch (error) {
      console.log("[AuthService] firebaseSignOut failed:", error)
      return {
        success: false,
        error: mapFirebaseAuthError(error),
      }
    }
  }

  /**
   * Sends password reset email
   */
  sendPasswordReset = async (request: PasswordResetRequest): Promise<AuthResult> => {
    try {
      await sendPasswordResetEmail(auth, request.email)
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: mapFirebaseAuthError(error),
      }
    }
  }

  /**
   * Updates user profile information
   */
  updateUserProfile = async (updates: {
    displayName?: string
    photoURL?: string
  }): Promise<AuthResult> => {
    try {
      const user = auth.currentUser
      if (!user) {
        return {
          success: false,
          error: {
            code: "auth/no-current-user",
            message: "No user is currently signed in.",
          },
        }
      }

      await updateProfile(user, updates)
      return {
        success: true,
      }
    } catch (error) {
      return {
        success: false,
        error: mapFirebaseAuthError(error),
      }
    }
  }

  /**
   * Cleanup method to remove listeners
   */
  cleanup = (): void => {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
    this.listeners = []
  }
}

// Create and export a singleton instance
export const authService = new AuthService()
export default authService
