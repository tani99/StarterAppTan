import { useState } from "react"
import { Alert, Platform, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { ProfileScreenTemplate } from "@/components/templates"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ProfileScreenProps extends AppStackScreenProps<"Profile"> {}

/**
 * ProfileScreen component
 * Displays user profile information and provides account management options
 */
export const ProfileScreen = (props: ProfileScreenProps) => {
  const { navigation } = props
  const { user, signOut, isLoading } = useAuth()
  const { themed } = useAppTheme()

  const [isSigningOut, setIsSigningOut] = useState(false)

  /**
   * Navigate back to Welcome screen
   */
  const goBack = () => {
    navigation.goBack()
  }

  /**
   * Handle sign out with confirmation
   */
  const handleSignOut = async () => {
    if (Platform.OS === "web") {
      const confirmed = window.confirm("Are you sure you want to sign out?")
      if (confirmed) {
        await performSignOut()
      }
    } else {
      Alert.alert("Sign Out", "Are you sure you want to sign out?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await performSignOut()
          },
        },
      ])
    }
  }

  /**
   * Perform the actual sign out operation
   */
  const performSignOut = async () => {
    setIsSigningOut(true)
    try {
      console.log("[ProfileScreen] Calling signOut...")
      const result = await signOut()
      console.log("[ProfileScreen] SignOut result:", result)

      if (!result.success) {
        console.log("[ProfileScreen] SignOut failed:", result.error)
        const errorMessage = "Failed to sign out. Please try again."

        if (Platform.OS === "web") {
          window.alert(errorMessage)
        } else {
          Alert.alert("Error", errorMessage)
        }
      } else {
        console.log("[ProfileScreen] SignOut successful")
        // Navigation will be handled automatically by AuthContext
      }
    } catch (error) {
      console.log("[ProfileScreen] SignOut exception:", error)
      const errorMessage = "An unexpected error occurred."

      if (Platform.OS === "web") {
        window.alert(errorMessage)
      } else {
        Alert.alert("Error", errorMessage)
      }
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <ProfileScreenTemplate user={user} preset="scroll" style={themed($screenStyle)}>
      {/* Account Actions Section */}
      <View style={themed($actionsContainer)}>
        <Text preset="subheading" text="Account Actions" style={themed($sectionTitle)} />

        {/* Settings Placeholders */}
        <View style={themed($actionsList)}>
          <Button
            text="Theme Settings"
            preset="default"
            onPress={() => {
              // TODO: Implement theme settings
              console.log("Theme settings pressed")
            }}
            style={themed($actionButton)}
            textStyle={themed($actionButtonText)}
          />

          <Button
            text="Notifications"
            preset="default"
            onPress={() => {
              // TODO: Implement notifications settings
              console.log("Notifications pressed")
            }}
            style={themed($actionButton)}
            textStyle={themed($actionButtonText)}
          />

          <Button
            text="Privacy Settings"
            preset="default"
            onPress={() => {
              // TODO: Implement privacy settings
              console.log("Privacy settings pressed")
            }}
            style={themed($actionButton)}
            textStyle={themed($actionButtonText)}
          />
        </View>

        {/* Sign Out Button */}
        <Button
          text="Sign Out"
          preset="default"
          onPress={handleSignOut}
          disabled={isLoading || isSigningOut}
          style={themed($signOutButton)}
          textStyle={themed($signOutButtonText)}
        />
      </View>

      {/* Back Button */}
      <View style={themed($footerContainer)}>
        <Button
          text="Back to Welcome"
          preset="default"
          onPress={goBack}
          disabled={isLoading || isSigningOut}
          style={themed($backButton)}
          textStyle={themed($backButtonText)}
        />
      </View>
    </ProfileScreenTemplate>
  )
}

// Styled components using ThemedStyle
const $screenStyle: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  flex: 1,
})

const $actionsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.xl,
})

const $sectionTitle: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
  color: theme.colors.text,
})

const $actionsList: ThemedStyle<ViewStyle> = (theme) => ({
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.lg,
})

const $actionButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderWidth: 1,
  borderColor: theme.colors.border,
  paddingVertical: theme.spacing.md,
})

const $actionButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $signOutButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderWidth: 1,
  borderColor: theme.colors.palette.angry500,
  paddingVertical: theme.spacing.md,
})

const $signOutButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.angry500,
})

const $footerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.separator,
})

const $backButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderWidth: 1,
  borderColor: theme.colors.border,
})

const $backButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})
