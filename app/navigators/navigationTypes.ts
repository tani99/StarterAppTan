import { NativeStackScreenProps } from "@react-navigation/native-stack"

/**
 * Authentication stack parameter list
 */
export type AuthStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

/**
 * Main application stack parameter list
 */
export type AppStackParamList = {
  Profile: undefined
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * Root navigation parameter list - combines both auth and main stacks
 * This allows for type-safe navigation between auth and main flows
 */
export type RootStackParamList = AuthStackParamList & AppStackParamList

/**
 * Auth stack screen props helper type
 */
export type AuthStackScreenProps<T extends keyof AuthStackParamList> = NativeStackScreenProps<
  AuthStackParamList,
  T
>

/**
 * App stack screen props helper type
 */
export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

/**
 * Root navigation screen props helper type
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>
