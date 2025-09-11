import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

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
        {/* Avatar Container */}
        <View style={[themed($avatarContainer), avatarContainerStyle]}>
          <View style={themed($avatarPlaceholder)}>
            <Icon icon="settings" size={40} color={themed($avatarIcon).color} />
          </View>
        </View>

        {/* User Info Container */}
        <View style={[themed($userInfoContainer), userInfoStyle]}>
          {/* Display Name - Editable */}
          {isEditingDisplayName ? (
            <View style={themed($editDisplayNameContainer)}>
              <TextField
                value={editingDisplayName}
                onChangeText={onDisplayNameChange}
                placeholder="Enter display name"
                style={themed($editDisplayNameInput)}
                containerStyle={themed($editDisplayNameFieldContainer)}
                inputWrapperStyle={themed($editDisplayNameInputWrapper)}
                autoFocus
              />
              <View style={themed($editButtonsContainer)}>
                <Button
                  text="Cancel"
                  preset="default"
                  onPress={onCancelEditDisplayName}
                  style={themed($cancelButton)}
                  textStyle={themed($cancelButtonText)}
                  disabled={isUpdatingDisplayName}
                />
                <Button
                  text={isUpdatingDisplayName ? "Saving..." : "Save"}
                  preset="default"
                  onPress={onSaveDisplayName}
                  style={themed($saveButton)}
                  textStyle={themed($saveButtonText)}
                  disabled={isUpdatingDisplayName || !editingDisplayName.trim()}
                />
              </View>
            </View>
          ) : (
            <View style={themed($displayNameContainer)}>
              <Text
                preset="heading"
                text={user?.displayName || "Anonymous User"}
                style={themed($displayNameText)}
                {...displayNameProps}
              />
              {onToggleEditDisplayName && (
                <Button
                  text="Edit"
                  preset="default"
                  onPress={onToggleEditDisplayName}
                  style={themed($editButton)}
                  textStyle={themed($editButtonText)}
                />
              )}
            </View>
          )}

          {user?.email && (
            <Text preset="default" text={user.email} style={themed($emailText)} {...emailProps} />
          )}

          <Text
            preset="default"
            text={formatMemberSince(user?.metadata?.creationTime)}
            style={themed($memberSinceText)}
            {...memberSinceProps}
          />
        </View>
      </View>

      {/* Content Area */}
      {children && <View style={[themed($contentContainer), contentStyle]}>{children}</View>}
    </Screen>
  )
}

// Styled components using ThemedStyle
const $headerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "column",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.xl,
  paddingBottom: theme.spacing.lg,
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.separator,
})

const $avatarContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
})

const $avatarPlaceholder: ThemedStyle<ViewStyle> = (theme) => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: theme.colors.palette.neutral200,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderColor: theme.colors.palette.neutral300,
})

const $avatarIcon: ThemedStyle<{ color: string }> = (theme) => ({
  color: theme.colors.palette.neutral500,
})

const $userInfoContainer: ThemedStyle<ViewStyle> = (_theme) => ({
  alignItems: "center",
})

const $displayNameContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing.xs,
})

const $displayNameText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  marginRight: theme.spacing.sm,
})

const $editButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral400,
  paddingHorizontal: theme.spacing.sm,
  paddingVertical: theme.spacing.xs,
  minHeight: 0,
})

const $editButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.primary600,
  fontSize: 12,
})

const $editDisplayNameContainer: ThemedStyle<ViewStyle> = (theme) => ({
  width: "100%",
  alignItems: "center",
  marginBottom: theme.spacing.xs,
})

const $editDisplayNameFieldContainer: ThemedStyle<ViewStyle> = (theme) => ({
  width: "100%",
  maxWidth: 280,
  marginBottom: theme.spacing.sm,
})

const $editDisplayNameInputWrapper: ThemedStyle<ViewStyle> = (theme) => ({
  borderColor: theme.colors.palette.primary600,
  backgroundColor: theme.colors.palette.neutral100,
})

const $editDisplayNameInput: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  fontSize: 18,
  fontWeight: "600",
})

const $editButtonsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  gap: theme.spacing.sm,
})

const $cancelButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: "transparent",
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral400,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  minHeight: 0,
})

const $cancelButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 14,
})

const $saveButton: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.primary600,
  borderWidth: 1,
  borderColor: theme.colors.palette.primary600,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
  minHeight: 0,
})

const $saveButtonText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.palette.neutral100,
  fontSize: 14,
})

const $emailText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  marginBottom: theme.spacing.xs,
  textAlign: "center",
})

const $memberSinceText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 14,
  textAlign: "center",
})

const $contentContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
})
