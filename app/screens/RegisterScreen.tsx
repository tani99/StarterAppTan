/**
 * RegisterScreen
 * 
 * Modern registration screen with form validation, password strength, and Firebase auth
 */

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Screen } from "../components/Screen"
import { Text } from "../components/Text"
import { Button } from "../components/Button"
import { TextField } from "../components/TextField"
import { Container } from "../components/Container"
import { Spacer } from "../components/Spacer"
import { Divider } from "../components/Divider"
import { Link } from "../components/Link"
import { Toast } from "../components/Toast"
import { Icon, IconPresets } from "../components/Icon"
import { useAuth } from "../context/AuthContext"
import { colors, spacing, typography } from "../theme"
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  validateName,
  getPasswordStrength,
  getPasswordStrengthLabel,
} from "../utils/validation"
import { KeyboardConfig, dismissKeyboard } from "../utils/keyboard"
import { AuthStackParamList } from "../navigators/navigationTypes"

type RegisterScreenProps = NativeStackScreenProps<AuthStackParamList, "Register">

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { signUp } = useAuth()

  // Form state
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  // Error state
  const [fullNameError, setFullNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [termsError, setTermsError] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("error")

  // Calculate password strength
  const passwordStrength = getPasswordStrength(password)
  const passwordStrengthLabel = getPasswordStrengthLabel(passwordStrength)

  /**
   * Get password strength color
   */
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return colors.text.tertiary
    if (passwordStrength <= 1) return colors.error[500]
    if (passwordStrength === 2) return colors.warning[500]
    if (passwordStrength === 3) return colors.info[500]
    return colors.success[500]
  }

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    let isValid = true

    // Validate full name
    const nameValidation = validateName(fullName, "Full name")
    if (!nameValidation.isValid) {
      setFullNameError(nameValidation.error || "")
      isValid = false
    } else {
      setFullNameError("")
    }

    // Validate email
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "")
      isValid = false
    } else {
      setEmailError("")
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "")
      isValid = false
    } else {
      setPasswordError("")
    }

    // Validate confirm password
    const confirmPasswordValidation = validatePasswordConfirmation(password, confirmPassword)
    if (!confirmPasswordValidation.isValid) {
      setConfirmPasswordError(confirmPasswordValidation.error || "")
      isValid = false
    } else {
      setConfirmPasswordError("")
    }

    // Validate terms agreement
    if (!agreedToTerms) {
      setTermsError("You must agree to the terms and conditions")
      isValid = false
    } else {
      setTermsError("")
    }

    return isValid
  }

  /**
   * Handle sign up
   */
  const handleSignUp = async () => {
    dismissKeyboard()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signUp({
        email: email.trim(),
        password,
        displayName: fullName.trim(),
      })

      if (result.success) {
        // Success - navigation will be handled automatically by auth state change
        setToastType("success")
        setToastMessage("Account created successfully!")
        setShowToast(true)
      } else {
        // Show error - extract message from error object
        const errorMessage = 
          typeof result.error === "string" 
            ? result.error 
            : result.error?.message || "Failed to create account. Please try again."
        setToastType("error")
        setToastMessage(errorMessage)
        setShowToast(true)
      }
    } catch (error) {
      setToastType("error")
      setToastMessage("An unexpected error occurred. Please try again.")
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Navigate to login screen
   */
  const navigateToLogin = () => {
    navigation.navigate("Login")
  }

  /**
   * Navigate back to welcome screen
   */
  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <Screen preset="fixed" style={styles.screen}>
      <KeyboardAvoidingView {...KeyboardConfig.form} style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Container>
            {/* Header with back button */}
            <View style={styles.header}>
              <TouchableOpacity
                onPress={navigateBack}
                style={styles.backButton}
                accessibilityLabel="Go back"
                accessibilityRole="button"
              >
                {IconPresets.back({ size: "lg", color: colors.text.primary })}
              </TouchableOpacity>
            </View>

            <Spacer size="xl" />

            {/* Title Section */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>Create Account</Text>
              <Spacer size="xs" />
              <Text style={styles.subtitle}>Join us and start your style journey</Text>
            </View>

            <Spacer size="xxxl" />

            {/* Full Name Field */}
            <TextField
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text)
                if (fullNameError) setFullNameError("")
              }}
              error={fullNameError}
              autoCapitalize="words"
              leftIcon={IconPresets.person({ size: "md", color: colors.text.secondary })}
              disabled={isLoading}
            />

            <Spacer size="md" />

            {/* Email Field */}
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text)
                if (emailError) setEmailError("")
              }}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              leftIcon={IconPresets.email({ size: "md", color: colors.text.secondary })}
              disabled={isLoading}
            />

            <Spacer size="md" />

            {/* Password Field */}
            <TextField
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (passwordError) setPasswordError("")
              }}
              error={passwordError}
              secureTextEntry
              leftIcon={IconPresets.lock({ size: "md", color: colors.text.secondary })}
              disabled={isLoading}
            />

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <>
                <Spacer size="xs" />
                <View style={styles.passwordStrengthContainer}>
                  <View style={styles.passwordStrengthBar}>
                    <View
                      style={[
                        styles.passwordStrengthFill,
                        {
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor: getPasswordStrengthColor(),
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.passwordStrengthLabel,
                      { color: getPasswordStrengthColor() },
                    ]}
                  >
                    {passwordStrengthLabel}
                  </Text>
                </View>
              </>
            )}

            <Spacer size="md" />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text)
                if (confirmPasswordError) setConfirmPasswordError("")
              }}
              error={confirmPasswordError}
              secureTextEntry
              leftIcon={IconPresets.lock({ size: "md", color: colors.text.secondary })}
              disabled={isLoading}
            />

            <Spacer size="lg" />

            {/* Terms & Conditions Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => {
                setAgreedToTerms(!agreedToTerms)
                if (termsError) setTermsError("")
              }}
              disabled={isLoading}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: agreedToTerms }}
            >
              <View
                style={[
                  styles.checkbox,
                  agreedToTerms && styles.checkboxChecked,
                  termsError && styles.checkboxError,
                ]}
              >
                {agreedToTerms && (
                  <Icon name="check" size="sm" color={colors.neutral.white} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the{" "}
                <Text style={styles.checkboxLabelLink}>Terms & Conditions</Text> and{" "}
                <Text style={styles.checkboxLabelLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            {termsError && (
              <>
                <Spacer size="xs" />
                <Text style={styles.termsError}>{termsError}</Text>
              </>
            )}

            <Spacer size="xl" />

            {/* Sign Up Button */}
            <Button
              variant="primary"
              size="large"
              onPress={handleSignUp}
              loading={isLoading}
              fullWidth
            >
              CREATE ACCOUNT
            </Button>

            <Spacer size="xl" />

            {/* Divider */}
            <Divider label="or" />

            <Spacer size="xl" />

            {/* Sign In Link */}
            <View style={styles.signInContainer}>
              <Text style={styles.signInText}>Already have an account? </Text>
              <Link onPress={navigateToLogin} disabled={isLoading}>
                Sign In
              </Link>
      </View>

            <Spacer size="xl" />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Toast Notification */}
      <Toast
        visible={showToast}
        message={toastMessage}
        type={toastType}
        onDismiss={() => setShowToast(false)}
        position="top"
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingTop: spacing.md,
  },
  backButton: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  titleSection: {
    alignItems: "flex-start",
  },
  title: {
    ...typography.heading1,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  passwordStrengthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordStrengthBar: {
  flex: 1,
    height: 4,
    backgroundColor: colors.neutral[200],
    borderRadius: 2,
    overflow: "hidden",
  },
  passwordStrengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  passwordStrengthLabel: {
    ...typography.caption,
    marginLeft: spacing.sm,
    minWidth: 60,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border.default,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  checkboxError: {
    borderColor: colors.error[500],
  },
  checkboxLabel: {
    ...typography.body2,
    color: colors.text.secondary,
  flex: 1,
  },
  checkboxLabelLink: {
    color: colors.text.link,
    fontWeight: "600",
  },
  termsError: {
    ...typography.caption,
    color: colors.text.error,
    marginLeft: 32,
  },
  signInContainer: {
    flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  },
  signInText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
})
