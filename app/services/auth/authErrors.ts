import { FirebaseError } from "firebase/app"

import { AuthError, FirebaseAuthErrorCode } from "./authTypes"

/**
 * Maps Firebase auth error codes to user-friendly error messages
 */
const ERROR_MESSAGES: Record<string, string> = {
  // Login errors
  [FirebaseAuthErrorCode.INVALID_EMAIL]: "Please enter a valid email address.",
  [FirebaseAuthErrorCode.USER_DISABLED]: "This account has been disabled. Please contact support.",
  [FirebaseAuthErrorCode.USER_NOT_FOUND]: "No account found with this email address.",
  [FirebaseAuthErrorCode.WRONG_PASSWORD]: "Incorrect password. Please try again.",

  // Registration errors
  [FirebaseAuthErrorCode.EMAIL_ALREADY_IN_USE]: "An account with this email already exists.",
  [FirebaseAuthErrorCode.OPERATION_NOT_ALLOWED]:
    "Email/password accounts are not enabled. Please contact support.",
  [FirebaseAuthErrorCode.WEAK_PASSWORD]: "Password should be at least 6 characters long.",

  // Network and other errors
  [FirebaseAuthErrorCode.NETWORK_REQUEST_FAILED]:
    "Network error. Please check your connection and try again.",
  [FirebaseAuthErrorCode.TOO_MANY_REQUESTS]: "Too many failed attempts. Please try again later.",
  [FirebaseAuthErrorCode.INTERNAL_ERROR]: "An internal error occurred. Please try again.",

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
