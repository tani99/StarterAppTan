/**
 * Navigation exports
 */

// Main app navigator
export { AppNavigator } from "./AppNavigator"
export type { NavigationProps, AppStackScreenProps } from "./AppNavigator"

// Auth navigator
export { AuthNavigator } from "./AuthNavigator"

// Navigation types
export type {
  AuthStackParamList,
  AppStackParamList,
  RootStackParamList,
  AuthStackScreenProps,
  RootStackScreenProps,
} from "./navigationTypes"

// Navigation utilities
export * from "./navigationUtilities"
