/**
 * Card Component
 * 
 * A container component with consistent padding, border radius, and optional shadow
 */

import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { colors, spacing, borderRadius, shadows } from "../theme"

export type CardVariant = "elevated" | "flat"

export interface CardProps {
  /**
   * Card content
   */
  children: React.ReactNode

  /**
   * Visual variant of the card
   * @default "elevated"
   */
  variant?: CardVariant

  /**
   * Custom padding for the card
   * If not provided, uses default theme padding
   */
  padding?: number

  /**
   * Custom style for the card
   */
  style?: ViewStyle

  /**
   * Callback when card is pressed (makes it touchable)
   */
  onPress?: () => void
}

export function Card({
  children,
  variant = "elevated",
  padding,
  style,
}: CardProps) {
  const variantStyle = variant === "elevated" ? styles.elevated : styles.flat

  return (
    <View
      style={[
        styles.card,
        variantStyle,
        padding !== undefined && { padding },
        style,
      ]}
    >
      {children}
    </View>
  )
}

/**
 * Card Header Component
 * Optional header section for cards
 */
export interface CardHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>
}

/**
 * Card Content Component
 * Main content section for cards
 */
export interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>
}

/**
 * Card Footer Component
 * Optional footer section for cards
 */
export interface CardFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardFooter({ children, style }: CardFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  elevated: {
    ...shadows.md,
  },
  flat: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  header: {
    marginBottom: spacing.sm,
  },
  content: {
    marginBottom: spacing.sm,
  },
  footer: {
    marginTop: spacing.sm,
  },
})

