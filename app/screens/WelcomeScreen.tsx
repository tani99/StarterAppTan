import { FC } from "react"
import { Alert, Image, ImageStyle, Platform, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()
  const { user, signOut } = useAuth()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  const handleSignOut = async () => {
    console.log("[WelcomeScreen] Sign out button pressed")

    if (Platform.OS === "web") {
      // For web, use browser confirm dialog
      console.log("[WelcomeScreen] Using web confirm dialog")
      const confirmed = window.confirm("Are you sure you want to sign out?")
      if (confirmed) {
        console.log("[WelcomeScreen] User confirmed sign out")
        await performSignOut()
      } else {
        console.log("[WelcomeScreen] User cancelled sign out")
      }
    } else {
      // For mobile, use React Native Alert
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            console.log("[WelcomeScreen] User confirmed sign out")
            await performSignOut()
          },
        },
      ])
    }
  }

  const performSignOut = async () => {
    try {
      console.log("[WelcomeScreen] Calling signOut...")
      const result = await signOut()
      console.log("[WelcomeScreen] SignOut result:", result)
      if (!result.success) {
        console.log("[WelcomeScreen] SignOut failed:", result.error)
        if (Platform.OS === "web") {
          window.alert("Failed to sign out. Please try again.")
        } else {
          Alert.alert("Error", "Failed to sign out. Please try again.")
        }
      } else {
        console.log("[WelcomeScreen] SignOut successful")
      }
    } catch (error) {
      console.log("[WelcomeScreen] SignOut exception:", error)
      if (Platform.OS === "web") {
        window.alert("An unexpected error occurred.")
      } else {
        Alert.alert("Error", "An unexpected error occurred.")
      }
    }
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$styles.flex1}>
      <View style={themed($topContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text
          testID="welcome-heading"
          style={themed($welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
        />
      </View>

      <View style={themed([$bottomContainer, $bottomContainerInsets])}>
        <View style={themed($userInfoContainer)}>
          <Text
            text={`Welcome, ${user?.displayName || user?.email || "User"}!`}
            preset="subheading"
            style={themed($userWelcome)}
          />
          <Text tx="welcomeScreen:postscript" size="md" />
        </View>

        <Button
          text="Sign Out"
          preset="reversed"
          onPress={handleSignOut}
          style={themed($signOutButton)}
        />
      </View>
    </Screen>
  )
}

const $topContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
})

const $bottomContainer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
})

const $welcomeLogo: ThemedStyle<ImageStyle> = ({ spacing }) => ({
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $userInfoContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  paddingVertical: spacing.sm,
})

const $userWelcome: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  marginBottom: spacing.sm,
  textAlign: "center",
})

const $signOutButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
