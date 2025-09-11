/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import { LoadingScreen } from "@/components/LoadingScreen"
import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { AuthState } from "@/services/auth"
import { useAppTheme } from "@/theme/context"

import { AuthNavigator } from "./AuthNavigator"
import type { AppStackParamList, RootStackParamList } from "./navigationTypes"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

// Re-export types for external use
export type { RootStackParamList }

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const {
    theme: { colors },
  } = useAppTheme()
  const { authState, isInitializing } = useAuth()

  // Show loading screen during auth initialization only
  if (isInitializing || authState === AuthState.LOADING) {
    return <LoadingScreen message="Initializing..." />
  }

  // Show auth flow for unauthenticated users
  if (authState === AuthState.UNAUTHENTICATED) {
    return <AuthNavigator />
  }

  // Show main app flow for authenticated users
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarColor: colors.background,
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<RootStackParamList>>> {}

export const AppNavigator = (props: NavigationProps) => {
  const { navigationTheme } = useAppTheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  // Deep linking configuration for auth-related links
  const linking = {
    prefixes: [
      // Add your app's deep link prefixes here
      // For example: 'myapp://', 'https://myapp.com/'
    ],
    config: {
      screens: {
        // Auth screens
        Login: "login",
        Register: "register",
        // Main app screens
        Welcome: "welcome",
        // Add more screens as needed
      },
    },
  }

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme} linking={linking} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
