import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { ForgotPasswordScreen } from "@/screens/ForgotPasswordScreen"
import { LoginScreen } from "@/screens/LoginScreen"
import { RegisterScreen } from "@/screens/RegisterScreen"
import { useAppTheme } from "@/theme/context"

import type { AuthStackParamList } from "./navigationTypes"

// Create the auth stack navigator
const Stack = createNativeStackNavigator<AuthStackParamList>()

/**
 * Authentication Navigator
 * Handles navigation between login and register screens
 */
export const AuthNavigator = () => {
  const {
    theme: { colors },
  } = useAppTheme()

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
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}
