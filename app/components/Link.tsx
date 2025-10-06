/**
 * Link Component
 * 
 * Styled touchable text for navigation and actions
 */

import React from "react"
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native"
import { colors, typography } from "../theme"

export type LinkSize = "small" | "medium"

export interface LinkProps {
  /**
   * Link text content
   */
  children: string

  /**
   * Press handler
   */
  onPress: () => void

  /**
   * Size of the link
   * @default "medium"
   */
  size?: LinkSize

  /**
   * Whether to show underline
   * @default false
   */
  underline?: boolean

  /**
   * Whether the link is disabled
   * @default false
   */
  disabled?: boolean

  /**
   * Custom text color
   */
  color?: string

  /**
   * Custom style for the text
   */
  style?: TextStyle

  /**
   * Custom style for the touchable container
   */
  containerStyle?: ViewStyle

  /**
   * Accessibility label
   */
  accessibilityLabel?: string
}

export function Link({
  children,
  onPress,
  size = "medium",
  underline = false,
  disabled = false,
  color,
  style,
  containerStyle,
  accessibilityLabel,
}: LinkProps) {
  const textSizeStyle = size === "small" ? typography.linkSmall : typography.link

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel || children}
      accessibilityState={{ disabled }}
      style={containerStyle}
    >
      <Text
        style={[
          styles.link,
          textSizeStyle,
          { color: color || colors.text.link },
          underline && styles.underline,
          disabled && styles.disabled,
          style,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  link: {
    color: colors.text.link,
  },
  underline: {
    textDecorationLine: "underline",
  },
  disabled: {
    color: colors.text.disabled,
    opacity: 0.6,
  },
})

