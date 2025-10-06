import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { ForgotPasswordScreen } from "@/screens/ForgotPasswordScreen"
import { LoginScreen } from "@/screens/LoginScreen"
import { RegisterScreen } from "@/screens/RegisterScreen"

import type { AuthStackParamList } from "./navigationTypes"

// Create the auth stack navigator
const Stack = createNativeStackNavigator<AuthStackParamList>()

/**
 * Authentication Navigator
 * Handles navigation between welcome, login, and register screens
 */
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#FFFFFF",
        },
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}
