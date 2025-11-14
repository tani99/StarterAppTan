/**
 * ForgotPasswordScreen
 * 
 * Password reset screen with email validation and Firebase integration
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
import { Link } from "../components/Link"
import { Toast } from "../components/Toast"
import { Icon, IconPresets } from "../components/Icon"
import { useAuth } from "../context/AuthContext"
import { colors, spacing, typography } from "../theme"
import { validateEmail } from "../utils/validation"
import { KeyboardConfig, dismissKeyboard } from "../utils/keyboard"
import { AuthStackParamList } from "../navigators/navigationTypes"

type ForgotPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">

export const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const { sendPasswordReset } = useAuth()

  // Form state
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [successState, setSuccessState] = useState(false)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("error")

  /**
   * Validate email field
   */
  const validateForm = (): boolean => {
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "")
      return false
    }
    setEmailError("")
    return true
  }

  /**
   * Handle password reset request
   */
  const handleSendResetLink = async () => {
    dismissKeyboard()

    // Validate email
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await sendPasswordReset({ email: email.trim() })

      if (result.success) {
        // Show success state
        setSuccessState(true)
        setToastType("success")
        setToastMessage("Password reset email sent!")
        setShowToast(true)
      } else {
        // Show error
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : result.error?.message || "Failed to send reset email. Please try again."
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
   * Navigate back to login screen
   */
  const navigateToLogin = () => {
    navigation.navigate("Login")
  }

  /**
   * Navigate back
   */
  const navigateBack = () => {
    navigation.goBack()
  }

  /**
   * Try again - reset to initial state
   */
  const handleTryAgain = () => {
    setSuccessState(false)
    setEmail("")
    setEmailError("")
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

            {!successState ? (
              <>
                {/* Title Section */}
                <View style={styles.titleSection}>
                  <Text style={styles.title}>Reset Password</Text>
                  <Spacer size="xs" />
                  <Text style={styles.subtitle}>
                    Enter your email address and we'll send you a link to reset your password.
                  </Text>
                </View>

                <Spacer size="xxxl" />

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

                <Spacer size="xl" />

                {/* Send Reset Link Button */}
                <Button
                  variant="primary"
                  size="large"
                  onPress={handleSendResetLink}
                  loading={isLoading}
                  fullWidth
                >
                  SEND RESET LINK
                </Button>

                <Spacer size="xl" />

                {/* Back to Login Link */}
                <View style={styles.backToLoginContainer}>
                  <Text style={styles.backToLoginText}>Remember your password? </Text>
                  <Link onPress={navigateToLogin} disabled={isLoading}>
                    Sign In
                  </Link>
                </View>
              </>
            ) : (
              <>
                {/* Success State */}
                <View style={styles.successContainer}>
                  {/* Success Icon */}
                  <View style={styles.successIconContainer}>
                    {IconPresets.success({ size: 64, color: colors.success[500] })}
                  </View>

                  <Spacer size="xl" />

                  {/* Success Title */}
                  <Text style={styles.successTitle}>Check Your Email</Text>

                  <Spacer size="sm" />

                  {/* Success Message */}
                  <Text style={styles.successMessage}>
                    We've sent a password reset link to{" "}
                    <Text style={styles.successEmailText}>{email}</Text>
                  </Text>

                  <Spacer size="sm" />

                  <Text style={styles.successInstructions}>
                    Click the link in the email to reset your password. If you don't see it, check
                    your spam folder.
                  </Text>

                  <Spacer size="xxxl" />

                  {/* Action Buttons */}
                  <Button
                    variant="primary"
                    size="large"
                    onPress={navigateToLogin}
                    fullWidth
                  >
                    BACK TO LOGIN
                  </Button>

                  <Spacer size="md" />

                  <Button
                    variant="outline"
                    size="large"
                    onPress={handleTryAgain}
                    fullWidth
                  >
                    TRY DIFFERENT EMAIL
                  </Button>
                </View>
              </>
            )}

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
    lineHeight: 24,
  },
  backToLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
  successContainer: {
    alignItems: "center",
    paddingTop: spacing.xxl,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.success[50],
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    ...typography.heading2,
    color: colors.text.primary,
    textAlign: "center",
  },
  successMessage: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    lineHeight: 24,
  },
  successEmailText: {
    ...typography.body1Medium,
    color: colors.text.primary,
  },
  successInstructions: {
    ...typography.body2,
    color: colors.text.tertiary,
    textAlign: "center",
    lineHeight: 22,
  },
})
