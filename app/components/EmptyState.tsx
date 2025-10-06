/**
 * EmptyState Component
 * 
 * Display empty state with icon, message, and optional action button
 */

import React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { colors, spacing, typography } from "../theme"
import { Icon } from "./Icon"
import { Button } from "./Button"

export interface EmptyStateProps {
  /**
   * Icon to display
   */
  icon?: {
    name: string
    family?: "material" | "ionicons" | "fontawesome" | "fontawesome5"
    color?: string
  }

  /**
   * Custom icon component (overrides icon prop)
   */
  iconComponent?: React.ReactNode

  /**
   * Title/heading text
   */
  title: string

  /**
   * Description/message text
   */
  description?: string

  /**
   * Call-to-action button
   */
  action?: {
    text: string
    onPress: () => void
    variant?: "primary" | "secondary" | "outline"
  }

  /**
   * Custom style for the container
   */
  style?: ViewStyle

  /**
   * Custom style for the title
   */
  titleStyle?: TextStyle

  /**
   * Custom style for the description
   */
  descriptionStyle?: TextStyle
}

export function EmptyState({
  icon,
  iconComponent,
  title,
  description,
  action,
  style,
  titleStyle,
  descriptionStyle,
}: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      {/* Icon */}
      {iconComponent ? (
        <View style={styles.iconContainer}>{iconComponent}</View>
      ) : icon ? (
        <View style={styles.iconContainer}>
          <Icon
            name={icon.name}
            family={icon.family || "material"}
            size="xxl"
            color={icon.color || colors.text.tertiary}
          />
        </View>
      ) : null}

      {/* Title */}
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Description */}
      {description && (
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      )}

      {/* Action Button */}
      {action && (
        <Button
          variant={action.variant || "primary"}
          onPress={action.onPress}
          style={styles.actionButton}
        >
          {action.text}
        </Button>
      )}
    </View>
  )
}

/**
 * Predefined EmptyState variants for common scenarios
 */
export const EmptyStatePresets = {
  /**
   * No data/results found
   */
  noData: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "inbox", color: colors.text.tertiary }}
      title="No data found"
      description="There's nothing to display here yet."
      {...props}
    />
  ),

  /**
   * No search results
   */
  noSearchResults: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "search", color: colors.text.tertiary }}
      title="No results found"
      description="Try adjusting your search terms."
      {...props}
    />
  ),

  /**
   * Network error
   */
  networkError: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "wifi-off", color: colors.error[500] }}
      title="Connection Error"
      description="Please check your internet connection and try again."
      {...props}
    />
  ),

  /**
   * Generic error
   */
  error: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "error-outline", color: colors.error[500] }}
      title="Something went wrong"
      description="An error occurred. Please try again later."
      {...props}
    />
  ),

  /**
   * Empty list/collection
   */
  emptyList: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "list", color: colors.text.tertiary }}
      title="Nothing here yet"
      description="Start by adding your first item."
      {...props}
    />
  ),

  /**
   * Coming soon
   */
  comingSoon: (props: Partial<EmptyStateProps>) => (
    <EmptyState
      icon={{ name: "schedule", color: colors.text.tertiary }}
      title="Coming Soon"
      description="This feature is under development."
      {...props}
    />
  ),
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading4,
    color: colors.text.primary,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
    maxWidth: 400,
  },
  actionButton: {
    marginTop: spacing.sm,
  },
})

