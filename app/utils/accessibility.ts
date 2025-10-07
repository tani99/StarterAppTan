/**
 * Accessibility Utilities
 * 
 * Helper functions for accessibility features
 */

import { AccessibilityInfo, Platform } from "react-native"

/**
 * Check if reduce motion is enabled
 * Users with vestibular disorders may enable this setting
 */
export async function isReduceMotionEnabled(): Promise<boolean> {
  try {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled()
      return reduceMotion
    }
    return false
  } catch (error) {
    console.debug("Could not check reduce motion setting:", error)
    return false
  }
}

/**
 * Check if screen reader is enabled
 */
export async function isScreenReaderEnabled(): Promise<boolean> {
  try {
    const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled()
    return screenReaderEnabled
  } catch (error) {
    console.debug("Could not check screen reader setting:", error)
    return false
  }
}

/**
 * Announce message to screen reader
 */
export function announceForAccessibility(message: string): void {
  try {
    AccessibilityInfo.announceForAccessibility(message)
  } catch (error) {
    console.debug("Could not announce for accessibility:", error)
  }
}

/**
 * Set accessibility focus to an element
 */
export function setAccessibilityFocus(reactTag: number): void {
  try {
    AccessibilityInfo.setAccessibilityFocus(reactTag)
  } catch (error) {
    console.debug("Could not set accessibility focus:", error)
  }
}

/**
 * Get animation duration based on reduce motion setting
 * Returns 0 if reduce motion is enabled, normal duration otherwise
 */
export async function getAnimationDuration(normalDuration: number): Promise<number> {
  const reduceMotion = await isReduceMotionEnabled()
  return reduceMotion ? 0 : normalDuration
}

/**
 * Check if bold text is enabled
 */
export async function isBoldTextEnabled(): Promise<boolean> {
  try {
    if (Platform.OS === "ios") {
      const boldText = await AccessibilityInfo.isBoldTextEnabled()
      return boldText
    }
    return false
  } catch (error) {
    console.debug("Could not check bold text setting:", error)
    return false
  }
}

/**
 * Check if grayscale is enabled
 */
export async function isGrayscaleEnabled(): Promise<boolean> {
  try {
    if (Platform.OS === "ios") {
      const grayscale = await AccessibilityInfo.isGrayscaleEnabled()
      return grayscale
    }
    return false
  } catch (error) {
    console.debug("Could not check grayscale setting:", error)
    return false
  }
}

/**
 * Accessibility helpers for common use cases
 */
export const Accessibility = {
  /**
   * Check if user prefers reduced motion
   */
  isReduceMotionEnabled,

  /**
   * Check if screen reader is active
   */
  isScreenReaderEnabled,

  /**
   * Announce message to screen reader
   */
  announce: announceForAccessibility,

  /**
   * Set focus to element
   */
  setFocus: setAccessibilityFocus,

  /**
   * Get adjusted animation duration
   */
  getAnimationDuration,

  /**
   * Check if bold text is enabled
   */
  isBoldTextEnabled,

  /**
   * Check if grayscale mode is enabled
   */
  isGrayscaleEnabled,
}

