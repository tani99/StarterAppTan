/**
 * LoginScreen
 * 
 * Modern login screen with form validation, Firebase auth, and bold styling
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
import { validateEmail, validateRequired } from "../utils/validation"
import { KeyboardConfig, dismissKeyboard } from "../utils/keyboard"
import { AuthStackParamList } from "../navigators/navigationTypes"

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { signIn } = useAuth()

  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Toast state
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("error")

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    let isValid = true

    // Validate email
    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "")
      isValid = false
    } else {
      setEmailError("")
    }

    // Validate password
    const passwordValidation = validateRequired(password, "Password")
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "")
      isValid = false
    } else {
      setPasswordError("")
    }

    return isValid
  }

  /**
   * Handle sign in
   */
  const handleSignIn = async () => {
    dismissKeyboard()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn({ email: email.trim(), password })

      if (result.success) {
        // Success - navigation will be handled automatically by auth state change
        setToastType("success")
        setToastMessage("Welcome back!")
        setShowToast(true)
      } else {
        // Show error
        setToastType("error")
        setToastMessage(result.error || "Failed to sign in. Please try again.")
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
   * Navigate to register screen
   */
  const navigateToRegister = () => {
    navigation.navigate("Register")
  }

  /**
   * Navigate to forgot password screen
   */
  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword")
  }

  /**
   * Navigate back to welcome screen
   */
  const navigateBack = () => {
    navigation.goBack()
  }

  return (
    <Screen preset="fixed" safeAreaEdges={["top"]} style={styles.screen}>
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
              <Text style={styles.title}>Welcome Back</Text>
              <Spacer size="xs" />
              <Text style={styles.subtitle}>Sign in to continue your style journey</Text>
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

            <Spacer size="md" />

            {/* Password Field */}
            <TextField
              label="Password"
              placeholder="Enter your password"
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

            <Spacer size="sm" />

            {/* Forgot Password Link */}
            <View style={styles.forgotPasswordContainer}>
              <Link
                onPress={navigateToForgotPassword}
                size="small"
                disabled={isLoading}
              >
                Forgot Password?
              </Link>
            </View>

            <Spacer size="xl" />

            {/* Sign In Button */}
            <Button
              variant="primary"
              size="large"
              onPress={handleSignIn}
              loading={isLoading}
              fullWidth
            >
              SIGN IN
            </Button>

            <Spacer size="xl" />

            {/* Divider */}
            <Divider label="or" />

            <Spacer size="xl" />

            {/* Sign Up Link */}
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Link
                onPress={navigateToRegister}
                disabled={isLoading}
              >
                Sign Up
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
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    ...typography.body1,
    color: colors.text.secondary,
  },
})
