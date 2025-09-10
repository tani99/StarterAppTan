/**
 * Authentication service exports
 */

// Main service
export { default as authService } from "./authService"

// Types and interfaces
export type {
  AuthUser,
  AuthResult,
  AuthError,
  LoginCredentials,
  RegisterCredentials,
  PasswordResetRequest,
  AuthConfig,
  AuthStateChangeListener,
} from "./authTypes"

export { AuthState, FirebaseAuthErrorCode } from "./authTypes"

// Error handling utilities
export {
  mapFirebaseAuthError,
  createAuthError,
  isValidEmail,
  isValidPassword,
  validateCredentials,
} from "./authErrors"
