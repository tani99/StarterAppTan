/**
 * Dialog Component
 * 
 * Modal dialog for confirmations and alerts with backdrop
 */

import React from "react"
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native"
import { colors, spacing, typography, borderRadius, shadows } from "../theme"
import { Button } from "./Button"
import { Icon } from "./Icon"

export type DialogVariant = "default" | "confirm" | "alert" | "destructive"

export interface DialogAction {
  /**
   * Button text
   */
  text: string

  /**
   * Button press handler
   */
  onPress: () => void

  /**
   * Button variant
   */
  variant?: "primary" | "secondary" | "outline" | "destructive"
}

export interface DialogProps {
  /**
   * Whether the dialog is visible
   */
  visible: boolean

  /**
   * Dialog title
   */
  title: string

  /**
   * Dialog message/content
   */
  message?: string

  /**
   * Custom content (overrides message if provided)
   */
  children?: React.ReactNode

  /**
   * Dialog variant (affects styling)
   * @default "default"
   */
  variant?: DialogVariant

  /**
   * Icon to show at the top
   */
  icon?: {
    name: string
    family?: "material" | "ionicons" | "fontawesome" | "fontawesome5"
    color?: string
  }

  /**
   * Primary action button
   */
  primaryAction?: DialogAction

  /**
   * Secondary action button (e.g., Cancel)
   */
  secondaryAction?: DialogAction

  /**
   * Callback when dialog is dismissed by backdrop tap
   */
  onDismiss?: () => void

  /**
   * Whether the dialog can be dismissed by tapping backdrop
   * @default true
   */
  dismissible?: boolean

  /**
   * Custom style for the dialog container
   */
  style?: ViewStyle

  /**
   * Custom style for the title
   */
  titleStyle?: TextStyle

  /**
   * Custom style for the message
   */
  messageStyle?: TextStyle
}

export function Dialog({
  visible,
  title,
  message,
  children,
  variant = "default",
  icon,
  primaryAction,
  secondaryAction,
  onDismiss,
  dismissible = true,
  style,
  titleStyle,
  messageStyle,
}: DialogProps) {
  const handleBackdropPress = () => {
    if (dismissible && onDismiss) {
      onDismiss()
    }
  }

  const variantConfig = getVariantConfig(variant)

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={handleBackdropPress}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.backdrop}
        activeOpacity={1}
        onPress={handleBackdropPress}
      >
        <TouchableOpacity activeOpacity={1} style={styles.dialogWrapper}>
          <View style={[styles.dialog, style]}>
            {/* Icon */}
            {icon && (
              <View style={styles.iconContainer}>
                <Icon
                  name={icon.name}
                  family={icon.family || "material"}
                  size="xl"
                  color={icon.color || variantConfig.iconColor}
                />
              </View>
            )}

            {/* Title */}
            <Text
              style={[
                styles.title,
                { color: variantConfig.titleColor },
                titleStyle,
              ]}
            >
              {title}
            </Text>

            {/* Message or Custom Content */}
            {children ? (
              <View style={styles.content}>{children}</View>
            ) : message ? (
              <Text style={[styles.message, messageStyle]}>{message}</Text>
            ) : null}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <View style={styles.actions}>
                {secondaryAction && (
                  <Button
                    variant={secondaryAction.variant || "outline"}
                    onPress={secondaryAction.onPress}
                    style={[
                      styles.actionButton,
                      primaryAction && styles.actionButtonWithSibling,
                    ]}
                  >
                    {secondaryAction.text}
                  </Button>
                )}
                {primaryAction && (
                  <Button
                    variant={
                      primaryAction.variant ||
                      (variant === "destructive" ? "destructive" : "primary")
                    }
                    onPress={primaryAction.onPress}
                    style={styles.actionButton}
                  >
                    {primaryAction.text}
                  </Button>
                )}
              </View>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  )
}

/**
 * Get variant-specific configuration
 */
function getVariantConfig(variant: DialogVariant) {
  switch (variant) {
    case "destructive":
      return {
        iconColor: colors.error[500],
        titleColor: colors.error[700],
      }
    case "alert":
      return {
        iconColor: colors.warning[500],
        titleColor: colors.warning[700],
      }
    case "confirm":
      return {
        iconColor: colors.info[500],
        titleColor: colors.text.primary,
      }
    case "default":
    default:
      return {
        iconColor: colors.text.secondary,
        titleColor: colors.text.primary,
      }
  }
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.background.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  dialogWrapper: {
    width: "100%",
    maxWidth: 400,
  },
  dialog: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.xl,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading4,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  content: {
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flex: 1,
  },
  actionButtonWithSibling: {
    marginRight: spacing.sm,
  },
})

