import { useState } from "react"
import { Alert, Platform, TextStyle, View, ViewStyle } from "react-native"

import { Button } from "@/components/Button"
import { ProfileScreenTemplate } from "@/components/templates"
import { Switch } from "@/components/Toggle/Switch"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
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
  const { user, signOut, isLoading, updateProfile } = useAuth()
  const { themed, toggleTheme, themeContext } = useAppTheme()

  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false)
  const [editingDisplayName, setEditingDisplayName] = useState("")
  const [isUpdatingDisplayName, setIsUpdatingDisplayName] = useState(false)

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

  /**
   * Toggle display name edit mode
   */
  const handleToggleEditDisplayName = () => {
    if (isEditingDisplayName) {
      // Cancel editing
      setIsEditingDisplayName(false)
      setEditingDisplayName("")
    } else {
      // Start editing
      setEditingDisplayName(user?.displayName || "")
      setIsEditingDisplayName(true)
    }
  }

  /**
   * Handle display name change during editing
   */
  const handleDisplayNameChange = (value: string) => {
    setEditingDisplayName(value)
  }

  /**
   * Save display name changes
   */
  const handleSaveDisplayName = async () => {
    const trimmedName = editingDisplayName.trim()

    if (!trimmedName) {
      const errorMessage = "Display name cannot be empty."
      if (Platform.OS === "web") {
        window.alert(errorMessage)
      } else {
        Alert.alert("Error", errorMessage)
      }
      return
    }

    if (trimmedName === user?.displayName) {
      // No change, just exit edit mode
      setIsEditingDisplayName(false)
      setEditingDisplayName("")
      return
    }

    setIsUpdatingDisplayName(true)
    try {
      console.log("[ProfileScreen] Updating display name to:", trimmedName)
      const result = await updateProfile({ displayName: trimmedName })

      if (result.success) {
        console.log("[ProfileScreen] Display name updated successfully")
        setIsEditingDisplayName(false)
        setEditingDisplayName("")

        const successMessage = "Display name updated successfully!"
        if (Platform.OS === "web") {
          // For web, we'll just log success since alerts can be intrusive
          console.log(successMessage)
        } else {
          Alert.alert("Success", successMessage)
        }
      } else {
        console.log("[ProfileScreen] Display name update failed:", result.error)
        const errorMessage =
          result.error?.message || "Failed to update display name. Please try again."

        if (Platform.OS === "web") {
          window.alert(errorMessage)
        } else {
          Alert.alert("Error", errorMessage)
        }
      }
    } catch (error) {
      console.log("[ProfileScreen] Display name update exception:", error)
      const errorMessage = "An unexpected error occurred while updating your display name."

      if (Platform.OS === "web") {
        window.alert(errorMessage)
      } else {
        Alert.alert("Error", errorMessage)
      }
    } finally {
      setIsUpdatingDisplayName(false)
    }
  }

  /**
   * Cancel display name editing
   */
  const handleCancelEditDisplayName = () => {
    setIsEditingDisplayName(false)
    setEditingDisplayName("")
  }

  return (
    <ProfileScreenTemplate
      user={user}
      preset="scroll"
      style={themed($screenStyle)}
      backButton={{
        onPress: goBack,
        text: "Back"
      }}
      editButton={{
        isEditing: isEditingDisplayName,
        onToggle: handleToggleEditDisplayName
      }}
      actionButtons={{
        onCancel: handleCancelEditDisplayName,
        onSave: handleSaveDisplayName,
        isSaving: isUpdatingDisplayName,
        canSave: !!editingDisplayName.trim()
      }}
    >
      {/* Email Section */}
      <View style={themed($simpleSection)}>
        <Text preset="formLabel" text="Email" style={themed($fieldLabel)} />
        <View style={themed($displayFieldContainer)}>
          <Text
            preset="default"
            text={user?.email || "No email set"}
            style={themed($displayFieldText)}
          />
        </View>
      </View>

      {/* Display Name Section */}
      <View style={themed($simpleSection)}>
        <Text preset="formLabel" text="Display Name" style={themed($fieldLabel)} />
        {isEditingDisplayName ? (
          <TextField
            value={editingDisplayName}
            onChangeText={handleDisplayNameChange}
            placeholder="Enter display name"
            style={themed($editFieldInput)}
            containerStyle={themed($editFieldWrapper)}
            autoFocus
          />
        ) : (
          <View style={themed($displayFieldContainer)}>
            <Text
              preset="default"
              text={user?.displayName || "No display name set"}
              style={themed($displayFieldText)}
            />
          </View>
        )}
      </View>

      {/* Dark Mode Setting */}
      <View style={themed($simpleSection)}>
        <View style={themed($settingItem)}>
          <View style={themed($settingContent)}>
            <Text preset="default" text="Dark Mode" style={themed($settingLabel)} />
            <Text preset="formHelper" text="Switch between light and dark themes" style={themed($settingDescription)} />
          </View>
          <Switch
            value={themeContext === "dark"}
            onValueChange={toggleTheme}
          />
        </View>
      </View>

      {/* Sign Out Button */}
      <View style={themed($simpleSection)}>
        <Button
          text="Sign Out"
          preset="default"
          onPress={handleSignOut}
          style={themed($signOutButton)}
          textStyle={themed($signOutButtonText)}
          disabled={isSigningOut}
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

const $simpleSection: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.lg,
  paddingHorizontal: theme.spacing.md,
})

const $fieldLabel: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.sm,
  color: theme.colors.text,
})

const $editFieldInput: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $editFieldWrapper: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
})

const $displayFieldContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: theme.spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.palette.neutral200,
})

const $displayFieldText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  flex: 1,
})

const $settingItem: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingVertical: theme.spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.palette.neutral200,
})

const $settingContent: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
})

const $settingLabel: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: theme.spacing.xxs,
})

const $settingDescription: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})



const $signOutButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.angry500,
  paddingVertical: theme.spacing.md,
})

const $signOutButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.background,
})

