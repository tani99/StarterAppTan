/**
 * The app navigator is used for the primary navigation flows of your app.
 * It contains an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"
import { View, Text, ActivityIndicator } from "react-native"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import Config from "@/config"
import { useAuth } from "@/context/AuthContext"
import { ErrorBoundary } from "@/screens/ErrorScreen/ErrorBoundary"
import { WelcomeScreen, ProfileScreen } from "@/screens/index"
import { AuthState } from "@/services/auth"

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
  const { authState, isInitializing } = useAuth()

  // Show loading screen during auth initialization only
  if (isInitializing || authState === AuthState.LOADING) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={{ marginTop: 20, fontSize: 16 }}>Initializing...</Text>
      </View>
    )
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
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/** 🔥 Your screens go here */}
      {/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<RootStackParamList>>> {}

export const AppNavigator = (props: NavigationProps) => {
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
    <NavigationContainer ref={navigationRef} theme={DefaultTheme} linking={linking} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}
