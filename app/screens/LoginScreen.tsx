import { useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { useAuth } from "@/context/AuthContext"
import { LoginCredentials } from "@/services/auth"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

interface LoginScreenProps {
  navigation?: any
}

/**
 * Login screen component
 * Allows users to sign in with email and password
 */
export const LoginScreen = (props: LoginScreenProps) => {
  const { navigation } = props
  const { signIn, isLoading } = useAuth()
  const { themed } = useAppTheme()

  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [generalError, setGeneralError] = useState("")

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
   * Validates password
   */
  const validatePassword = (passwordText: string): boolean => {
    setPasswordError("")

    if (!passwordText.trim()) {
      setPasswordError("Password is required")
      return false
    }

    if (passwordText.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return false
    }

    return true
  }

  /**
   * Handles form submission
   */
  const handleSignIn = async () => {
    // Clear previous errors
    setGeneralError("")

    // Validate inputs
    const isEmailValid = validateEmail(email)
    const isPasswordValid = validatePassword(password)

    if (!isEmailValid || !isPasswordValid) {
      return
    }

    try {
      const credentials: LoginCredentials = {
        email: email.trim(),
        password,
      }

      const result = await signIn(credentials)

      if (result.success) {
        // Navigation will be handled by the navigation logic based on auth state
        console.log("Login successful")
      } else {
        setGeneralError(result.error?.message || "Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setGeneralError("An unexpected error occurred. Please try again.")
    }
  }

  /**
   * Navigate to register screen
   */
  const goToRegister = () => {
    navigation?.navigate("Register")
  }

  /**
   * Navigate to forgot password screen
   */
  const goToForgotPassword = () => {
    navigation?.navigate("ForgotPassword")
  }

  return (
    <Screen
      preset="scroll"
      style={themed($screenStyle)}
      contentContainerStyle={themed($contentContainer)}
    >
      <View style={themed($headerContainer)}>
        <Text preset="heading" text="Welcome Back" style={themed($title)} />
        <Text preset="subheading" text="Sign in to your account" style={themed($subtitle)} />
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

        {/* Password Input */}
        <TextField
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
          status={passwordError ? "error" : undefined}
          helper={passwordError}
          containerStyle={themed($inputContainer)}
        />

        {/* General Error Message */}
        {generalError ? (
          <View style={themed($errorContainer)}>
            <Text preset="formHelper" text={generalError} style={themed($errorText)} />
          </View>
        ) : null}

        {/* Sign In Button */}
        <Button
          text="Sign In"
          preset="filled"
          onPress={handleSignIn}
          disabled={isLoading}
          style={themed($signInButton)}
        />

        {/* Forgot Password Link */}
        <Button
          text="Forgot Password?"
          preset="default"
          onPress={goToForgotPassword}
          disabled={isLoading}
          style={themed($linkButton)}
          textStyle={themed($linkText)}
        />
      </View>

      {/* Register Link */}
      <View style={themed($footerContainer)}>
        <Text preset="default" text="Don't have an account? " />
        <Button
          text="Sign Up"
          preset="default"
          onPress={goToRegister}
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

const $signInButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
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
