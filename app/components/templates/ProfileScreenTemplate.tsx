import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle, TouchableOpacity } from "react-native"

import { Button } from "@/components/Button"
import { Icon } from "@/components/Icon"
import { Screen, ScreenProps } from "@/components/Screen"
import { Text, TextProps } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { AuthUser } from "@/services/auth"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface ProfileScreenTemplateProps extends Omit<ScreenProps, "children"> {
  /**
   * The user object to display profile information for.
   */
  user: AuthUser | null
  /**
   * Main content to render below the user header section.
   */
  children?: ReactNode
  /**
   * Optional style override for the user header container.
   */
  headerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the content container.
   */
  contentStyle?: StyleProp<ViewStyle>
  /**
   * Optional back button configuration.
   */
  backButton?: {
    onPress: () => void
    text?: string
  }
  /**
   * Optional edit mode toggle button configuration.
   */
  editButton?: {
    isEditing: boolean
    onToggle: () => void
  }
  /**
   * Optional global action buttons for edit mode.
   */
  actionButtons?: {
    onCancel: () => void
    onSave: () => void
    isSaving?: boolean
    canSave?: boolean
  }
  /**
   * Optional style override for the avatar container.
   */
  avatarContainerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the user info container.
   */
  userInfoStyle?: StyleProp<ViewStyle>
  /**
   * Optional text props for the display name.
   */
  displayNameProps?: TextProps
  /**
   * Optional text props for the email.
   */
  emailProps?: TextProps
  /**
   * Optional text props for the member since date.
   */
  memberSinceProps?: TextProps
  /**
   * Whether the display name is in edit mode.
   */
  isEditingDisplayName?: boolean
  /**
   * The current display name value being edited.
   */
  editingDisplayName?: string
  /**
   * Whether the display name update is loading.
   */
  isUpdatingDisplayName?: boolean
  /**
   * Callback when display name edit mode is toggled.
   */
  onToggleEditDisplayName?: () => void
  /**
   * Callback when display name value changes during editing.
   */
  onDisplayNameChange?: (value: string) => void
  /**
   * Callback when display name save is triggered.
   */
  onSaveDisplayName?: () => void
  /**
   * Callback when display name edit is cancelled.
   */
  onCancelEditDisplayName?: () => void
}

/**
 * ProfileScreenTemplate is a template component that provides a consistent layout structure
 * for profile-related screens throughout the app. It includes a user header section with
 * avatar placeholder, user information display, and a flexible content area for
 * profile-specific content.
 *
 * This template supports all Screen presets (fixed, scroll, auto) and maintains
 * consistent theming and spacing across the application.
 *
 * @param props - The properties for the ProfileScreenTemplate component
 * @returns JSX.Element - The rendered ProfileScreenTemplate component
 *
 * @example
 * ```tsx
 * <ProfileScreenTemplate
 *   user={user}
 *   preset="scroll"
 * >
 *   <Text>Additional profile content goes here</Text>
 * </ProfileScreenTemplate>
 * ```
 */
export function ProfileScreenTemplate(props: ProfileScreenTemplateProps) {
  const {
    user,
    children,
    headerStyle,
    contentStyle,
    avatarContainerStyle,
    userInfoStyle,
    displayNameProps,
    emailProps,
    memberSinceProps,
    isEditingDisplayName = false,
    editingDisplayName = "",
    isUpdatingDisplayName = false,
    onToggleEditDisplayName,
    onDisplayNameChange,
    onSaveDisplayName,
    onCancelEditDisplayName,
    backButton,
    editButton,
    actionButtons,
    ...screenProps
  } = props

  const { themed } = useAppTheme()

  // Format member since date
  const formatMemberSince = (creationTime?: string): string => {
    if (!creationTime) return "Recently joined"

    try {
      const date = new Date(creationTime)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 30) {
        return "Recently joined"
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30)
        return `Member for ${months} month${months > 1 ? "s" : ""}`
      } else {
        const years = Math.floor(diffDays / 365)
        return `Member for ${years} year${years > 1 ? "s" : ""}`
      }
    } catch {
      return "Recently joined"
    }
  }

  return (
    <Screen {...screenProps}>
      {/* User Header Section */}
      <View style={[themed($headerContainer), headerStyle]}>
        {/* Left Action */}
        {backButton && !editButton?.isEditing && (
          <TouchableOpacity
            onPress={backButton.onPress}
            style={themed($backIconButton)}
          >
            <Icon
              icon="back"
              size={24}
              color={themed($backIconColor)}
            />
          </TouchableOpacity>
        )}
        
        {editButton?.isEditing && actionButtons && (
          <Button
            text="Cancel"
            preset="ghost"
            onPress={actionButtons.onCancel}
            style={themed($cancelActionButton)}
            textStyle={themed($cancelActionButtonText)}
          />
        )}

        {/* Right Action */}
        {editButton?.isEditing && actionButtons ? (
          <Button
            text={actionButtons.isSaving ? "Saving..." : "Save"}
            preset="ghost"
            onPress={actionButtons.onSave}
            style={themed($saveActionButton)}
            textStyle={themed($saveActionButtonText)}
            disabled={actionButtons.isSaving || !actionButtons.canSave}
          />
        ) : (
          editButton && (
            <Button
              text={editButton.isEditing ? "Done" : "Edit"}
              preset="ghost"
              onPress={editButton.onToggle}
              style={themed($editModeButton)}
              textStyle={themed($editModeButtonText)}
            />
          )
        )}

      </View>

      {/* Content Area */}
      <View style={[themed($contentContainer), contentStyle]}>
        {/* Profile Title */}
        <Text preset="heading" text="Profile" style={themed($profileTitle)} />
        
        {children}
      </View>
    </Screen>
  )
}

// Styled components using ThemedStyle
const $headerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  backgroundColor: theme.colors.background,
})

const $backIconButton: ThemedStyle<ViewStyle> = (theme) => ({
  padding: theme.spacing.xs,
  alignSelf: "flex-start",
})

const $backIconColor: ThemedStyle<string> = (theme) => theme.colors.text

const $editModeButton: ThemedStyle<ViewStyle> = (theme) => ({
  alignSelf: "flex-end",
})

const $editModeButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $cancelActionButton: ThemedStyle<ViewStyle> = (theme) => ({
  alignSelf: "flex-start",
})

const $cancelActionButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})

const $saveActionButton: ThemedStyle<ViewStyle> = (theme) => ({
  alignSelf: "flex-end",
})

const $saveActionButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.primary500,
})

const $profileTitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  textAlign: "left",
  marginBottom: theme.spacing.lg,
  paddingHorizontal: theme.spacing.md,
})





const $contentContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
})
