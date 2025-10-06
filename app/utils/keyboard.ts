/**
 * Keyboard Utilities
 * 
 * Helper functions and components for keyboard handling
 */

import { Platform, Keyboard, KeyboardAvoidingViewProps } from "react-native"

/**
 * Dismiss the keyboard
 */
export function dismissKeyboard(): void {
  Keyboard.dismiss()
}

/**
 * Get platform-specific keyboard avoiding behavior
 * iOS needs 'padding', Android typically works better with 'height' or null
 */
export function getKeyboardAvoidingBehavior(): KeyboardAvoidingViewProps["behavior"] {
  return Platform.OS === "ios" ? "padding" : undefined
}

/**
 * Get default keyboard avoiding view offset
 * Useful for adjusting the offset based on platform
 */
export function getKeyboardAvoidingOffset(customOffset?: number): number {
  if (customOffset !== undefined) return customOffset
  return Platform.OS === "ios" ? 0 : 0
}

/**
 * Keyboard event listener types
 */
export type KeyboardEventName =
  | "keyboardWillShow"
  | "keyboardDidShow"
  | "keyboardWillHide"
  | "keyboardDidHide"
  | "keyboardWillChangeFrame"
  | "keyboardDidChangeFrame"

/**
 * Keyboard listener hook helper
 * Returns functions to add/remove keyboard listeners
 */
export function createKeyboardListener(
  eventName: KeyboardEventName,
  callback: (event: any) => void
) {
  const listener = Keyboard.addListener(eventName, callback)
  
  return {
    remove: () => listener.remove(),
  }
}

/**
 * Check if keyboard is currently visible
 * Note: This is a utility to track keyboard state externally
 * React Native doesn't provide a direct way to check keyboard visibility
 */
let isKeyboardVisible = false

export function setupKeyboardVisibilityTracking(): () => void {
  const showListener = Keyboard.addListener("keyboardDidShow", () => {
    isKeyboardVisible = true
  })

  const hideListener = Keyboard.addListener("keyboardDidHide", () => {
    isKeyboardVisible = false
  })

  // Return cleanup function
  return () => {
    showListener.remove()
    hideListener.remove()
  }
}

export function getKeyboardVisibility(): boolean {
  return isKeyboardVisible
}

/**
 * Default keyboard avoiding view props
 * Common configuration for KeyboardAvoidingView
 */
export const DEFAULT_KEYBOARD_AVOIDING_PROPS: Partial<KeyboardAvoidingViewProps> = {
  behavior: getKeyboardAvoidingBehavior(),
  keyboardVerticalOffset: getKeyboardAvoidingOffset(),
  enabled: true,
}

/**
 * Keyboard configuration for different screen types
 */
export const KeyboardConfig = {
  /**
   * Configuration for forms/login screens
   */
  form: {
    behavior: getKeyboardAvoidingBehavior(),
    keyboardVerticalOffset: Platform.OS === "ios" ? 0 : 20,
    enabled: true,
  } as Partial<KeyboardAvoidingViewProps>,

  /**
   * Configuration for chat/messaging screens
   */
  chat: {
    behavior: getKeyboardAvoidingBehavior(),
    keyboardVerticalOffset: Platform.OS === "ios" ? 90 : 0,
    enabled: true,
  } as Partial<KeyboardAvoidingViewProps>,

  /**
   * Configuration for modal screens
   */
  modal: {
    behavior: "padding",
    keyboardVerticalOffset: Platform.OS === "ios" ? 40 : 0,
    enabled: true,
  } as Partial<KeyboardAvoidingViewProps>,
}

/**
 * Scroll to input helper
 * When using with ScrollView, you can use this to scroll to a specific position
 */
export function scrollToInput(
  scrollViewRef: any,
  inputPosition: number,
  offset: number = 100
): void {
  if (scrollViewRef?.current) {
    scrollViewRef.current.scrollTo({
      y: inputPosition - offset,
      animated: true,
    })
  }
}

