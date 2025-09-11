import { FirebaseError } from "firebase/app"

import { AuthError, FirebaseAuthErrorCode } from "./authTypes"

/**
 * Maps Firebase auth error codes to user-friendly error messages
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Authentication credential errors
  [FirebaseAuthErrorCode.INVALID_CREDENTIAL]:
    "Invalid email or password. Please check your credentials and try again.",
  [FirebaseAuthErrorCode.INVALID_EMAIL]: "Please enter a valid email address.",
  [FirebaseAuthErrorCode.WRONG_PASSWORD]: "Incorrect password. Please try again.",
  [FirebaseAuthErrorCode.USER_DISABLED]: "This account has been disabled. Please contact support.",
  [FirebaseAuthErrorCode.USER_NOT_FOUND]: "No account found with this email address.",

  // Registration errors
  [FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE]: "An account with this email already exists.",
  [FirebaseAuthErrorCode.WEAK_PASSWORD]: "Password should be at least 6 characters long.",

  // Account management
  [FirebaseAuthErrorCode.REQUIRES_RECENT_LOGIN]:
    "For security reasons, please sign in again to continue.",
  [FirebaseAuthErrorCode.USER_MISMATCH]:
    "The credential does not match the currently signed in user.",

  // Operation errors
  [FirebaseAuthErrorCode.OPERATION_NOT_ALLOWED]:
    "This operation is not allowed. Please contact support.",
  [FirebaseAuthErrorCode.POPUP_CLOSED_BY_USER]: "Sign-in was cancelled.",
  [FirebaseAuthErrorCode.POPUP_BLOCKED]:
    "Pop-up was blocked by browser. Please allow pop-ups and try again.",

  // Network and system errors
  [FirebaseAuthErrorCode.NETWORK_REQUEST_FAILED]:
    "Network error. Please check your connection and try again.",
  [FirebaseAuthErrorCode.TOO_MANY_REQUESTS]: "Too many failed attempts. Please try again later.",
  [FirebaseAuthErrorCode.INTERNAL_ERROR]: "An internal error occurred. Please try again.",

  // Session errors
  [FirebaseAuthErrorCode.USER_TOKEN_EXPIRED]: "Your session has expired. Please sign in again.",
  [FirebaseAuthErrorCode.INVALID_USER_TOKEN]: "Your session is invalid. Please sign in again.",

  // Provider errors
  [FirebaseAuthErrorCode.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL]:
    "An account already exists with the same email but different sign-in credentials.",
  [FirebaseAuthErrorCode.CREDENTIAL_ALREADY_IN_USE]:
    "This credential is already associated with a different user account.",

  // Generic fallback
  [FirebaseAuthErrorCode.UNKNOWN]: "An unexpected error occurred. Please try again.",
}

/**
 * Converts Firebase auth errors to user-friendly AuthError objects
 */
export const mapFirebaseAuthError = (error: unknown): AuthError => {
  // Handle Firebase errors
  if (error instanceof FirebaseError) {
    const code = error.code as FirebaseAuthErrorCode
    const message = ERROR_MESSAGES[code] || ERROR_MESSAGES[FirebaseAuthErrorCode.UNKNOWN]

    return {
      code,
      message,
      originalError: error,
    }
  }

  // Handle generic errors
  if (error instanceof Error) {
    return {
      code: FirebaseAuthErrorCode.UNKNOWN,
      message: error.message || ERROR_MESSAGES[FirebaseAuthErrorCode.UNKNOWN],
      originalError: error,
    }
  }

  // Handle unknown error types
  return {
    code: FirebaseAuthErrorCode.UNKNOWN,
    message: ERROR_MESSAGES[FirebaseAuthErrorCode.UNKNOWN],
    originalError: error,
  }
}

/**
 * Creates a standardized AuthError object
 */
export const createAuthError = (code: FirebaseAuthErrorCode, message?: string): AuthError => {
  return {
    code,
    message: message || ERROR_MESSAGES[code] || ERROR_MESSAGES[FirebaseAuthErrorCode.UNKNOWN],
  }
}

/**
 * Validates email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates password strength
 */
export const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long." }
  }

  return { valid: true }
}

/**
 * Validates registration credentials
 */
export const validateCredentials = (email: string, password: string): AuthError | null => {
  if (!isValidEmail(email)) {
    return createAuthError(FirebaseAuthErrorCode.INVALID_EMAIL)
  }

  const passwordValidation = isValidPassword(password)
  if (!passwordValidation.valid) {
    return createAuthError(FirebaseAuthErrorCode.WEAK_PASSWORD, passwordValidation.message)
  }

  return null
}
