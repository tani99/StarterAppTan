/**
 * Authentication-related TypeScript types and interfaces
 */

/**
 * Authentication states that the user can be in
 */
export enum AuthState {
  UNAUTHENTICATED = "unauthenticated",
  AUTHENTICATED = "authenticated",
  LOADING = "loading",
}

/**
 * User data interface matching Firebase User properties
 */
export interface AuthUser {
  uid: string
  email: string | null
  emailVerified: boolean
  displayName: string | null
  photoURL: string | null
  phoneNumber: string | null
  isAnonymous: boolean
  metadata: {
    creationTime?: string
    lastSignInTime?: string
  }
}

/**
 * Authentication credentials for login
 */
export interface LoginCredentials {
  email: string
  password: string
}

/**
 * Registration credentials with validation
 */
export interface RegisterCredentials {
  email: string
  password: string
  displayName?: string
}

/**
 * Password reset request
 */
export interface PasswordResetRequest {
  email: string
}

/**
 * Authentication result wrapper
 */
export interface AuthResult<T = void> {
  success: boolean
  data?: T
  error?: AuthError
}

/**
 * Custom authentication error with user-friendly messages
 */
export interface AuthError {
  code: string
  message: string
  originalError?: any
}

/**
 * Firebase Auth error codes mapping
 * Based on official Firebase JavaScript SDK AuthErrorCodes
 */
export enum FirebaseAuthErrorCode {
  // Authentication credential errors
  INVALID_CREDENTIAL = "auth/invalid-credential",
  INVALID_EMAIL = "auth/invalid-email",
  WRONG_PASSWORD = "auth/wrong-password",
  USER_DISABLED = "auth/user-disabled",
  USER_NOT_FOUND = "auth/user-not-found",

  // Registration errors
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  WEAK_PASSWORD = "auth/weak-password",

  // Account management
  REQUIRES_RECENT_LOGIN = "auth/requires-recent-login",
  USER_MISMATCH = "auth/user-mismatch",

  // Operation errors
  OPERATION_NOT_ALLOWED = "auth/operation-not-allowed",
  POPUP_CLOSED_BY_USER = "auth/popup-closed-by-user",
  POPUP_BLOCKED = "auth/popup-blocked",

  // Network and system errors
  NETWORK_REQUEST_FAILED = "auth/network-request-failed",
  TOO_MANY_REQUESTS = "auth/too-many-requests",
  INTERNAL_ERROR = "auth/internal-error",

  // Session errors
  USER_TOKEN_EXPIRED = "auth/user-token-expired",
  INVALID_USER_TOKEN = "auth/invalid-user-token",

  // Provider errors
  ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL = "auth/account-exists-with-different-credential",
  CREDENTIAL_ALREADY_IN_USE = "auth/credential-already-in-use",

  // Generic fallback
  UNKNOWN = "auth/unknown",
}

/**
 * Auth service configuration
 */
export interface AuthConfig {
  persistence?: boolean
  emailVerificationRequired?: boolean
}

/**
 * Auth state change listener callback
 */
export type AuthStateChangeListener = (user: AuthUser | null, authState: AuthState) => void
