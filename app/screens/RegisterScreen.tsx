import { useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import { RegisterCredentials } from "@/services/auth/authTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

interface RegisterScreenProps {
  navigation?: any
}

/**
 * Register screen component
 * Allows users to create a new account with email, password, and display name
 */
export const RegisterScreen = (props: RegisterScreenProps) => {
  const { navigation } = props
  const { signUp, isLoading } = useAuth()
  const { themed } = useAppTheme()

  // Form state
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Error state
  const [displayNameError, setDisplayNameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [generalError, setGeneralError] = useState("")

  /**
   * Validates display name
   */
  const validateDisplayName = (name: string): boolean => {
    setDisplayNameError("")

    if (!name.trim()) {
      setDisplayNameError("Display name is required")
      return false
    }

    if (name.trim().length < 2) {
      setDisplayNameError("Display name must be at least 2 characters")
      return false
    }

    return true
  }

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
   * Validates password strength
   */
  const validatePassword = (passwordText: string): boolean => {
    setPasswordError("")

    if (!passwordText.trim()) {
      setPasswordError("Password is required")
      return false
    }

    if (passwordText.length < 6) {
      setPasswordError("Password must be at least 6 characters long")
      return false
    }

    // Additional password strength checks
    const hasLetter = /[a-zA-Z]/.test(passwordText)
    const hasNumber = /[0-9]/.test(passwordText)

    if (!hasLetter || !hasNumber) {
      setPasswordError("Password should contain both letters and numbers")
      return false
    }

    return true
  }

  /**
   * Validates password confirmation
   */
  const validateConfirmPassword = (confirmPasswordText: string): boolean => {
    setConfirmPasswordError("")

    if (!confirmPasswordText.trim()) {
      setConfirmPasswordError("Please confirm your password")
      return false
    }

    if (confirmPasswordText !== password) {
      setConfirmPasswordError("Passwords do not match")
      return false
    }

    return true
  }

  /**
   * Handles form submission
   */
  const handleSignUp = async () => {
    // Clear previous errors
    setGeneralError("")

    // Validate all inputs
    const isDisplayNameValid = validateDisplayName(displayName)
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword)

    if (!isDisplayNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return
    }

    try {
      const credentials: RegisterCredentials = {
        email: email.trim(),
        password,
        displayName: displayName.trim(),
      }

      const result = await signUp(credentials)

      if (result.success) {
        // Navigation will be handled by the navigation logic based on auth state
        console.log("Registration successful")
      } else {
        setGeneralError(result.error?.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Registration error:", error)
      setGeneralError("An unexpected error occurred. Please try again.")
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
        <Text preset="heading" text="Create Account" style={themed($title)} />
        <Text preset="subheading" text="Sign up to get started" style={themed($subtitle)} />
      </View>

      <View style={themed($formContainer)}>
        {/* Display Name Input */}
        <TextField
          label="Display Name"
          placeholder="Enter your full name"
          value={displayName}
          onChangeText={setDisplayName}
          autoCapitalize="words"
          autoComplete="name"
          autoCorrect={false}
          status={displayNameError ? "error" : undefined}
          helper={displayNameError}
          containerStyle={themed($inputContainer)}
        />

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

        {/* Password Input */}
        <TextField
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password-new"
          status={passwordError ? "error" : undefined}
          helper={passwordError || "Must be at least 6 characters with letters and numbers"}
          containerStyle={themed($inputContainer)}
        />

        {/* Confirm Password Input */}
        <TextField
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password-new"
          status={confirmPasswordError ? "error" : undefined}
          helper={confirmPasswordError}
          containerStyle={themed($inputContainer)}
        />

        {/* General Error Message */}
        {generalError ? (
          <View style={themed($errorContainer)}>
            <Text preset="formHelper" text={generalError} style={themed($errorText)} />
          </View>
        ) : null}

        {/* Sign Up Button */}
        <Button
          text="Create Account"
          preset="filled"
          onPress={handleSignUp}
          disabled={isLoading}
          style={themed($signUpButton)}
        />
      </View>

      {/* Login Link */}
      <View style={themed($footerContainer)}>
        <Text preset="default" text="Already have an account? " />
        <Button
          text="Sign In"
          preset="default"
          onPress={goToLogin}
          disabled={isLoading}
          style={themed($inlineButton)}
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

const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

const $formContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xl,
})

const $inputContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $errorContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
  textAlign: "center",
})

const $signUpButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  ...$styles.row,
  justifyContent: "center",
  alignItems: "center",
  marginTop: spacing.lg,
})

const $inlineButton: ThemedStyle<ViewStyle> = () => ({
  backgroundColor: "transparent",
  borderWidth: 0,
  paddingHorizontal: 0,
  minHeight: 20,
})

const $linkText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
  fontSize: 14,
})
