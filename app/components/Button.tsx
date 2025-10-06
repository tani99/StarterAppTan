/**
 * Button Component
 * 
 * A highly customizable button component with multiple variants, sizes, and states
 */

import React from "react"
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from "react-native"
import { colors, spacing, typography, borderRadius } from "../theme"

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive"
export type ButtonSize = "small" | "medium" | "large"

export interface ButtonProps {
  /**
   * Button text content
   */
  children: string

  /**
   * Button press handler
   */
  onPress: () => void

  /**
   * Visual variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant

  /**
   * Size of the button
   * @default "medium"
   */
  size?: ButtonSize

  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean

  /**
   * Icon to display on the left side of the text
   */
  leftIcon?: React.ReactNode

  /**
   * Icon to display on the right side of the text
   */
  rightIcon?: React.ReactNode

  /**
   * Whether the button should take full width of its container
   * @default false
   */
  fullWidth?: boolean

  /**
   * Custom style for the button container
   */
  style?: ViewStyle

  /**
   * Custom style for the button text
   */
  textStyle?: TextStyle

  /**
   * Accessibility label
   */
  accessibilityLabel?: string
}

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  accessibilityLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading

  // Get variant-specific styles
  const variantStyles = getVariantStyles(variant, isDisabled)
  
  // Get size-specific styles
  const sizeStyles = getSizeStyles(size)

  // Get text size
  const textSizeStyle = getTextSizeStyle(size)

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || children}
      accessibilityState={{ disabled: isDisabled }}
      style={[
        styles.button,
        variantStyles.container,
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.activityIndicatorColor}
        />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Text
            style={[
              styles.text,
              variantStyles.text,
              textSizeStyle,
              textStyle,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  )
}

/**
 * Get variant-specific styles
 */
function getVariantStyles(variant: ButtonVariant, disabled: boolean) {
  if (disabled) {
    return {
      container: {
        backgroundColor: colors.button.primaryDisabled,
        borderColor: "transparent",
      } as ViewStyle,
      text: {
        color: colors.text.disabled,
      } as TextStyle,
      activityIndicatorColor: colors.text.disabled,
    }
  }

  switch (variant) {
    case "primary":
      return {
        container: {
          backgroundColor: colors.button.primaryBackground,
          borderColor: "transparent",
        } as ViewStyle,
        text: {
          color: colors.button.primaryText,
        } as TextStyle,
        activityIndicatorColor: colors.button.primaryText,
      }

    case "secondary":
      return {
        container: {
          backgroundColor: colors.button.secondaryBackground,
          borderColor: "transparent",
        } as ViewStyle,
        text: {
          color: colors.button.secondaryText,
        } as TextStyle,
        activityIndicatorColor: colors.button.secondaryText,
      }

    case "outline":
      return {
        container: {
          backgroundColor: colors.button.outlineBackground,
          borderColor: colors.button.outlineBorder,
          borderWidth: 2,
        } as ViewStyle,
        text: {
          color: colors.button.outlineText,
        } as TextStyle,
        activityIndicatorColor: colors.button.outlineText,
      }

    case "ghost":
      return {
        container: {
          backgroundColor: colors.button.ghostBackground,
          borderColor: "transparent",
        } as ViewStyle,
        text: {
          color: colors.button.ghostText,
        } as TextStyle,
        activityIndicatorColor: colors.button.ghostText,
      }

    case "destructive":
      return {
        container: {
          backgroundColor: colors.button.destructiveBackground,
          borderColor: "transparent",
        } as ViewStyle,
        text: {
          color: colors.button.destructiveText,
        } as TextStyle,
        activityIndicatorColor: colors.button.destructiveText,
      }

    default:
      return {
        container: {} as ViewStyle,
        text: {} as TextStyle,
        activityIndicatorColor: colors.text.primary,
      }
  }
}

/**
 * Get size-specific styles
 */
function getSizeStyles(size: ButtonSize) {
  switch (size) {
    case "small":
      return {
        container: {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          minHeight: 36,
        } as ViewStyle,
      }

    case "medium":
      return {
        container: {
          paddingHorizontal: spacing.xl,
          paddingVertical: spacing.sm,
          minHeight: 44,
        } as ViewStyle,
      }

    case "large":
      return {
        container: {
          paddingHorizontal: spacing.xxl,
          paddingVertical: spacing.md,
          minHeight: 52,
        } as ViewStyle,
      }

    default:
      return {
        container: {} as ViewStyle,
      }
  }
}

/**
 * Get text size style
 */
function getTextSizeStyle(size: ButtonSize): TextStyle {
  switch (size) {
    case "small":
      return typography.buttonSmall
    case "medium":
      return typography.buttonMedium
    case "large":
      return typography.buttonLarge
    default:
      return typography.buttonMedium
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.6,
  },
})

