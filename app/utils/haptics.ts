/**
 * Haptic Feedback Utilities
 * 
 * Provides tactile feedback for important user actions
 */

import { Platform } from "react-native"
import * as Haptics from "expo-haptics"

/**
 * Haptic feedback types
 */
export enum HapticFeedbackType {
  Light = "light",
  Medium = "medium",
  Heavy = "heavy",
  Success = "success",
  Warning = "warning",
  Error = "error",
  Selection = "selection",
}

/**
 * Trigger haptic feedback
 * Wraps expo-haptics with error handling and platform checks
 */
export async function triggerHaptic(type: HapticFeedbackType = HapticFeedbackType.Light): Promise<void> {
  // Haptics only work on physical devices
  if (Platform.OS !== "ios" && Platform.OS !== "android") {
    return
  }

  try {
    switch (type) {
      case HapticFeedbackType.Light:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        break
      case HapticFeedbackType.Medium:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        break
      case HapticFeedbackType.Heavy:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
        break
      case HapticFeedbackType.Success:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        break
      case HapticFeedbackType.Warning:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)
        break
      case HapticFeedbackType.Error:
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
        break
      case HapticFeedbackType.Selection:
        await Haptics.selectionAsync()
        break
      default:
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }
  } catch (error) {
    // Silently fail if haptics are not available
    console.debug("Haptic feedback not available:", error)
  }
}

/**
 * Predefined haptic feedback for common actions
 */
export const HapticFeedback = {
  /**
   * Light tap feedback for buttons
   */
  buttonPress: () => triggerHaptic(HapticFeedbackType.Light),

  /**
   * Medium feedback for important actions
   */
  important: () => triggerHaptic(HapticFeedbackType.Medium),

  /**
   * Heavy feedback for critical actions
   */
  critical: () => triggerHaptic(HapticFeedbackType.Heavy),

  /**
   * Success notification
   */
  success: () => triggerHaptic(HapticFeedbackType.Success),

  /**
   * Warning notification
   */
  warning: () => triggerHaptic(HapticFeedbackType.Warning),

  /**
   * Error notification
   */
  error: () => triggerHaptic(HapticFeedbackType.Error),

  /**
   * Selection change feedback (e.g., picker, toggle)
   */
  selection: () => triggerHaptic(HapticFeedbackType.Selection),
}

