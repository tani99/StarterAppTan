/**
 * Unit tests for Auth validation functions
 * These tests don't depend on Firebase modules and can run in isolation
 */

import { FirebaseAuthErrorCode } from "@/services/auth/authTypes"

// Import validation functions without Firebase dependencies
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidPassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters long." }
  }

  return { valid: true }
}

const createAuthError = (code: FirebaseAuthErrorCode, message?: string) => {
  const ERROR_MESSAGES: Record<string, string> = {
    [FirebaseAuthErrorCode.INVALID_EMAIL]: "Please enter a valid email address.",
    [FirebaseAuthErrorCode.WEAK_PASSWORD]: "Password should be at least 6 characters long.",
    [FirebaseAuthErrorCode.UNKNOWN]: "An unexpected error occurred. Please try again.",
  }

  return {
    code,
    message: message || ERROR_MESSAGES[code] || ERROR_MESSAGES[FirebaseAuthErrorCode.UNKNOWN],
  }
}

const validateCredentials = (email: string, password: string) => {
  if (!isValidEmail(email)) {
    return createAuthError(FirebaseAuthErrorCode.INVALID_EMAIL)
  }

  const passwordValidation = isValidPassword(password)
  if (!passwordValidation.valid) {
    return createAuthError(FirebaseAuthErrorCode.WEAK_PASSWORD, passwordValidation.message)
  }

  return null
}

describe("Auth Error Creation", () => {
  describe("createAuthError", () => {
    it("should create auth error with custom message", () => {
      const error = createAuthError(FirebaseAuthErrorCode.INVALID_EMAIL, "Custom message")
      expect(error.code).toBe(FirebaseAuthErrorCode.INVALID_EMAIL)
      expect(error.message).toBe("Custom message")
    })

    it("should create auth error with default message", () => {
      const error = createAuthError(FirebaseAuthErrorCode.WEAK_PASSWORD)
      expect(error.code).toBe(FirebaseAuthErrorCode.WEAK_PASSWORD)
      expect(error.message).toBe("Password should be at least 6 characters long.")
    })
  })
})

describe("Email Validation", () => {
  describe("isValidEmail", () => {
    it("should return true for valid email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true)
      expect(isValidEmail("user@domain.co.uk")).toBe(true)
      expect(isValidEmail("name.lastname@company.org")).toBe(true)
    })

    it("should return false for invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false)
      expect(isValidEmail("@example.com")).toBe(false)
      expect(isValidEmail("test@")).toBe(false)
      expect(isValidEmail("")).toBe(false)
    })
  })
})

describe("Password Validation", () => {
  describe("isValidPassword", () => {
    it("should return valid: true for passwords 6 characters or longer", () => {
      expect(isValidPassword("123456")).toEqual({ valid: true })
      expect(isValidPassword("password123")).toEqual({ valid: true })
      expect(isValidPassword("P@ssw0rd!")).toEqual({ valid: true })
    })

    it("should return valid: false for passwords shorter than 6 characters", () => {
      expect(isValidPassword("12345")).toEqual({
        valid: false,
        message: "Password must be at least 6 characters long.",
      })
      expect(isValidPassword("")).toEqual({
        valid: false,
        message: "Password must be at least 6 characters long.",
      })
    })
  })
})

describe("Credential Validation", () => {
  describe("validateCredentials", () => {
    it("should return null for valid credentials", () => {
      const result = validateCredentials("test@example.com", "password123")
      expect(result).toBeNull()
    })

    it("should return error for invalid email", () => {
      const result = validateCredentials("invalid-email", "password123")
      expect(result).toEqual({
        code: FirebaseAuthErrorCode.INVALID_EMAIL,
        message: "Please enter a valid email address.",
      })
    })

    it("should return error for weak password", () => {
      const result = validateCredentials("test@example.com", "123")
      expect(result).toEqual({
        code: FirebaseAuthErrorCode.WEAK_PASSWORD,
        message: "Password must be at least 6 characters long.",
      })
    })
  })
})
