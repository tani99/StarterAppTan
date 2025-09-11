import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Icon } from "@/components/Icon"
import { Screen, ScreenProps } from "@/components/Screen"
import { Text, TextProps } from "@/components/Text"
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
          <Text
            preset="heading"
            text={user?.displayName || "Anonymous User"}
            style={themed($displayNameText)}
            {...displayNameProps}
          />

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

const $displayNameText: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.xs,
  textAlign: "center",
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
