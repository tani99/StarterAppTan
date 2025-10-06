/**
 * Form Validation Utilities
 * 
 * Helper functions for form field validation and error message generation
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Email validation
 * Checks if the email format is valid
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim().length === 0) {
    return { isValid: false, error: "Email is required" }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  if (!emailRegex.test(email.trim())) {
    return { isValid: false, error: "Please enter a valid email address" }
  }

  return { isValid: true }
}

/**
 * Password strength requirements
 */
export interface PasswordRequirements {
  minLength?: number
  requireUppercase?: boolean
  requireLowercase?: boolean
  requireNumber?: boolean
  requireSpecialChar?: boolean
}

/**
 * Default password requirements
 */
export const DEFAULT_PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumber: true,
  requireSpecialChar: false,
}

/**
 * Password validation
 * Checks if the password meets strength requirements
 */
export function validatePassword(
  password: string,
  requirements: PasswordRequirements = DEFAULT_PASSWORD_REQUIREMENTS
): ValidationResult {
  if (!password || password.length === 0) {
    return { isValid: false, error: "Password is required" }
  }

  const { minLength, requireUppercase, requireLowercase, requireNumber, requireSpecialChar } =
    requirements

  // Check minimum length
  if (minLength && password.length < minLength) {
    return {
      isValid: false,
      error: `Password must be at least ${minLength} characters long`,
    }
  }

  // Check uppercase
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    }
  }

  // Check lowercase
  if (requireLowercase && !/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter",
    }
  }

  // Check number
  if (requireNumber && !/\d/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number",
    }
  }

  // Check special character
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one special character",
    }
  }

  return { isValid: true }
}

/**
 * Get password strength score (0-4)
 * 0 = very weak, 4 = very strong
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0

  let strength = 0

  // Length check
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

  return Math.min(strength, 4)
}

/**
 * Get password strength label
 */
export function getPasswordStrengthLabel(strength: number): string {
  switch (strength) {
    case 0:
    case 1:
      return "Weak"
    case 2:
      return "Fair"
    case 3:
      return "Good"
    case 4:
      return "Strong"
    default:
      return "Weak"
  }
}

/**
 * Password confirmation validation
 * Checks if passwords match
 */
export function validatePasswordConfirmation(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (!confirmPassword || confirmPassword.length === 0) {
    return { isValid: false, error: "Please confirm your password" }
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: "Passwords do not match" }
  }

  return { isValid: true }
}

/**
 * Required field validation
 * Checks if the field has a value
 */
export function validateRequired(
  value: string,
  fieldName: string = "This field"
): ValidationResult {
  if (!value || value.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` }
  }

  return { isValid: true }
}

/**
 * Minimum length validation
 */
export function validateMinLength(
  value: string,
  minLength: number,
  fieldName: string = "This field"
): ValidationResult {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`,
    }
  }

  return { isValid: true }
}

/**
 * Maximum length validation
 */
export function validateMaxLength(
  value: string,
  maxLength: number,
  fieldName: string = "This field"
): ValidationResult {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${maxLength} characters`,
    }
  }

  return { isValid: true }
}

/**
 * Pattern matching validation
 * Uses a regex pattern to validate the value
 */
export function validatePattern(
  value: string,
  pattern: RegExp,
  errorMessage: string = "Invalid format"
): ValidationResult {
  if (!pattern.test(value)) {
    return { isValid: false, error: errorMessage }
  }

  return { isValid: true }
}

/**
 * Phone number validation (basic)
 * Accepts various phone number formats
 */
export function validatePhoneNumber(phone: string): ValidationResult {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, error: "Phone number is required" }
  }

  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, "")

  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Phone number must be at least 10 digits" }
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, error: "Phone number is too long" }
  }

  return { isValid: true }
}

/**
 * URL validation
 */
export function validateURL(url: string): ValidationResult {
  if (!url || url.trim().length === 0) {
    return { isValid: false, error: "URL is required" }
  }

  try {
    new URL(url)
    return { isValid: true }
  } catch {
    return { isValid: false, error: "Please enter a valid URL" }
  }
}

/**
 * Name validation
 * Checks for valid name format (letters, spaces, hyphens, apostrophes)
 */
export function validateName(name: string, fieldName: string = "Name"): ValidationResult {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: `${fieldName} is required` }
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: `${fieldName} must be at least 2 characters` }
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`,
    }
  }

  return { isValid: true }
}

/**
 * Combine multiple validations
 * Returns the first validation error encountered
 */
export function combineValidations(
  ...validations: ValidationResult[]
): ValidationResult {
  for (const validation of validations) {
    if (!validation.isValid) {
      return validation
    }
  }
  return { isValid: true }
}

