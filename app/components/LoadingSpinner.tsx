/**
 * LoadingSpinner Component
 * 
 * A loading indicator with multiple sizes and optional overlay variant
 */

import React from "react"
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  Modal,
} from "react-native"
import { colors, spacing } from "../theme"

export type LoadingSpinnerSize = "small" | "medium" | "large"

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   * @default "medium"
   */
  size?: LoadingSpinnerSize

  /**
   * Color of the spinner
   * @default colors.primary[500]
   */
  color?: string

  /**
   * Whether to show as full-screen overlay
   * @default false
   */
  overlay?: boolean

  /**
   * Custom style for the container
   */
  style?: ViewStyle

  /**
   * Whether the spinner is visible (for overlay variant)
   * @default true
   */
  visible?: boolean
}

export function LoadingSpinner({
  size = "medium",
  color = colors.primary[500],
  overlay = false,
  style,
  visible = true,
}: LoadingSpinnerProps) {
  // Map size to ActivityIndicator size
  const activityIndicatorSize = size === "small" ? "small" : "large"

  // Get numeric size for custom sizing if needed
  const getSpinnerSize = () => {
    switch (size) {
      case "small":
        return 20
      case "medium":
        return 32
      case "large":
        return 48
      default:
        return 32
    }
  }

  const spinner = (
    <View style={[styles.container, !overlay && style]}>
      <ActivityIndicator
        size={activityIndicatorSize}
        color={color}
        style={{ transform: [{ scale: size === "large" ? 1.5 : 1 }] }}
      />
    </View>
  )

  if (overlay) {
    return (
      <Modal
        transparent
        visible={visible}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={[styles.overlay, style]}>
          <View style={styles.overlayContent}>{spinner}</View>
        </View>
      </Modal>
    )
  }

  return spinner
}

/**
 * LoadingScreen Component
 * Full-screen loading indicator for initial app loads
 */
export interface LoadingScreenProps {
  /**
   * Whether the loading screen is visible
   * @default true
   */
  visible?: boolean

  /**
   * Optional message to display below spinner
   */
  message?: string
}

export function LoadingScreen({ visible = true }: LoadingScreenProps) {
  return (
    <LoadingSpinner
      size="large"
      overlay
      visible={visible}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.background.overlay,
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContent: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: spacing.xl,
    ...StyleSheet.flatten({
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    }),
  },
})

