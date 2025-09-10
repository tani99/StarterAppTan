import { useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import { PasswordResetRequest } from "@/services/auth"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ForgotPasswordScreenProps {
  navigation?: any
}

/**
 * Forgot Password screen component
 * Allows users to request a password reset email
 */
export const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
  const { navigation } = props
  const { sendPasswordReset } = useAuth()
  const { themed } = useAppTheme()

  // Form state
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [generalError, setGeneralError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Validates email format
   */
  const validateEmail = (emailText: string): boolean => {
    setEmailError("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailText.trim()) {
      setEmailError("Email is required")
      return false
    }

    if (!emailRegex.test(emailText)) {
      setEmailError("Please enter a valid email address")
      return false
    }

    return true
  }

  /**
   * Handles password reset request
   */
  const handlePasswordReset = async () => {
    // Clear previous messages
    setGeneralError("")
    setSuccessMessage("")

    // Validate email
    if (!validateEmail(email)) {
      return
    }

    setIsLoading(true)

    try {
      const request: PasswordResetRequest = {
        email: email.trim(),
      }

      const result = await sendPasswordReset(request)

      if (result.success) {
        setSuccessMessage(
          "Password reset email sent! Please check your inbox and follow the instructions to reset your password.",
        )
        // Clear the email field after successful request
        setEmail("")
      } else {
        setGeneralError(
          result.error?.message || "Failed to send password reset email. Please try again.",
        )
      }
    } catch (error) {
      console.error("Password reset error:", error)
      setGeneralError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Navigate back to login screen
   */
  const goToLogin = () => {
    navigation?.navigate("Login")
  }

  return (
    <Screen
      preset="scroll"
      style={themed($screenStyle)}
      contentContainerStyle={themed($contentContainer)}
    >
      <View style={themed($headerContainer)}>
        <Text preset="heading" text="Forgot Password?" style={themed($title)} />
        <Text
          preset="subheading"
          text="Enter your email address and we'll send you a link to reset your password."
          style={themed($subtitle)}
        />
      </View>

      <View style={themed($formContainer)}>
        {/* Email Input */}
        <TextField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          status={emailError ? "error" : undefined}
          helper={emailError}
          containerStyle={themed($inputContainer)}
        />

        {/* Success Message */}
        {successMessage ? (
          <View style={themed($successContainer)}>
            <Text preset="formHelper" text={successMessage} style={themed($successText)} />
          </View>
        ) : null}

        {/* Error Message */}
        {generalError ? (
          <View style={themed($errorContainer)}>
            <Text preset="formHelper" text={generalError} style={themed($errorText)} />
          </View>
        ) : null}

        {/* Send Reset Email Button */}
        <Button
          text="Send Reset Email"
          preset="filled"
          onPress={handlePasswordReset}
          disabled={isLoading}
          style={themed($resetButton)}
        />
      </View>

      {/* Back to Login Link */}
      <View style={themed($footerContainer)}>
        <Button
          text="Back to Sign In"
          preset="default"
          onPress={goToLogin}
          disabled={isLoading}
          style={themed($linkButton)}
          textStyle={themed($linkText)}
        />
      </View>
    </Screen>
  )
}

// Styles
const $screenStyle: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  flex: 1,
})

const $contentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  paddingBottom: spacing.lg,
})

const $headerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginBottom: spacing.xxl,
})

const $title: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $subtitle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  paddingHorizontal: spacing.md,
})

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $successContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $successText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  textAlign: "center",
})

const $errorContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
  textAlign: "center",
})

const $resetButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  marginTop: spacing.lg,
})

const $linkButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "transparent",
  borderWidth: 0,
  minHeight: 32,
})

const $linkText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  fontSize: 14,
})
