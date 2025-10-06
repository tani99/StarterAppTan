/**
 * Toast Component
 * 
 * Notification toast with auto-dismiss and slide animations
 */

import React, { useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  ViewStyle,
  TextStyle,
} from "react-native"
import { colors, spacing, typography, borderRadius, shadows } from "../theme"
import { Icon } from "./Icon"

export type ToastType = "success" | "error" | "info" | "warning"
export type ToastPosition = "top" | "bottom"

export interface ToastProps {
  /**
   * Whether the toast is visible
   */
  visible: boolean

  /**
   * Toast message
   */
  message: string

  /**
   * Type of toast (determines color and icon)
   * @default "info"
   */
  type?: ToastType

  /**
   * Duration in milliseconds before auto-dismiss
   * Set to 0 to disable auto-dismiss
   * @default 3000
   */
  duration?: number

  /**
   * Position of the toast
   * @default "top"
   */
  position?: ToastPosition

  /**
   * Callback when toast is dismissed
   */
  onDismiss: () => void

  /**
   * Custom style for the toast container
   */
  style?: ViewStyle

  /**
   * Custom style for the message text
   */
  textStyle?: TextStyle
}

export function Toast({
  visible,
  message,
  type = "info",
  duration = 3000,
  position = "top",
  onDismiss,
  style,
  textStyle,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(position === "top" ? -100 : 100)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      // Slide in animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()

      // Auto-dismiss after duration
      if (duration > 0) {
        const timer = setTimeout(() => {
          dismissToast()
        }, duration)

        return () => clearTimeout(timer)
      }
    } else {
      // Reset animation values when not visible
      translateY.setValue(position === "top" ? -100 : 100)
      opacity.setValue(0)
    }
  }, [visible, duration, position])

  const dismissToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === "top" ? -100 : 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss()
    })
  }

  const toastConfig = getToastConfig(type)

  if (!visible) return null

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View
        style={[
          styles.container,
          position === "top" ? styles.containerTop : styles.containerBottom,
        ]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            styles.toast,
            { backgroundColor: toastConfig.backgroundColor },
            { transform: [{ translateY }], opacity },
            style,
          ]}
        >
          <View style={styles.iconContainer}>
            <Icon
              name={toastConfig.iconName}
              family="material"
              size="md"
              color={toastConfig.iconColor}
            />
          </View>
          <Text
            style={[
              styles.message,
              { color: toastConfig.textColor },
              textStyle,
            ]}
            numberOfLines={3}
          >
            {message}
          </Text>
          <TouchableOpacity
            onPress={dismissToast}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Dismiss toast"
            accessibilityRole="button"
          >
            <Icon
              name="close"
              family="material"
              size="sm"
              color={toastConfig.textColor}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  )
}

/**
 * Get toast configuration based on type
 */
function getToastConfig(type: ToastType) {
  switch (type) {
    case "success":
      return {
        backgroundColor: colors.success[500],
        textColor: colors.neutral.white,
        iconColor: colors.neutral.white,
        iconName: "check-circle",
      }
    case "error":
      return {
        backgroundColor: colors.error[500],
        textColor: colors.neutral.white,
        iconColor: colors.neutral.white,
        iconName: "error",
      }
    case "warning":
      return {
        backgroundColor: colors.warning[500],
        textColor: colors.neutral.white,
        iconColor: colors.neutral.white,
        iconName: "warning",
      }
    case "info":
    default:
      return {
        backgroundColor: colors.info[500],
        textColor: colors.neutral.white,
        iconColor: colors.neutral.white,
        iconName: "info",
      }
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    zIndex: 9999,
  },
  containerTop: {
    top: spacing.xl,
  },
  containerBottom: {
    bottom: spacing.xl,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    ...shadows.lg,
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
  message: {
    ...typography.body2,
    flex: 1,
  },
  closeButton: {
    marginLeft: spacing.sm,
    padding: spacing.xxs,
  },
})

