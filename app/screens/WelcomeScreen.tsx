import { FC } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity, Platform, Dimensions, ScrollView } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import { Card } from "@/components/Card"
import { EmptyState } from "@/components/EmptyState"
import { Icon, IconTypes } from "@/components/Icon"
import { MainContentScreen } from "@/components/templates"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { AppStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

interface ActionCardProps {
  icon: IconTypes
  heading: string
  content: string
  action: () => void
  isPrimary?: boolean
}

interface StatCardProps {
  label: string
  value: string
  icon: IconTypes
}

// Quick actions (minimalist design) - only 2 main actions
const quickActions: ActionCardProps[] = [
  {
    icon: "bell",
    heading: "Notifications",
    content: "Manage preferences",
    action: () => console.log("Navigate to Notifications"),
  },
  {
    icon: "lock",
    heading: "Privacy",
    content: "Control settings",
    action: () => console.log("Navigate to Privacy"),
  },
]

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()
  const { user } = useAuth()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const navigateToProfile = () => {
    navigation.navigate("Profile")
  }

  const getUserDisplayName = () => {
    return user?.displayName || user?.email?.split('@')[0] || 'User'
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <MainContentScreen
      preset="scroll"
      style={themed($screenStyle)}
      showHeader={false}
    >
      {/* Minimal Header - Just Profile Icon */}
      <View style={themed($headerContainer)}>
        <TouchableOpacity
          onPress={navigateToProfile}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
          style={themed($profileIconButton)}
        >
          <View style={themed($profileIconContainer)}>
            <MaterialIcons name="account-circle" size={32} color={theme.colors.tint} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Hero Section */}
      <View style={themed($heroContainer)}>
        <View style={themed($heroContent)}>
          <Text preset="heading" text={`${getGreeting()}, ${getUserDisplayName()}!`} style={themed($heroTitle)} />
          <Text preset="default" text="Welcome back to your dashboard" style={themed($heroSubtitle)} />
        </View>
      </View>

      {/* Quick Actions - Minimalist Grid */}
      <View style={themed($quickActionsContainer)}>
        <Text preset="subheading" text="Quick Actions" style={themed($sectionTitle)} />
        <View style={themed($quickActionsGrid)}>
          {quickActions.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={themed($minimalActionCard)}
              onPress={card.action}
              activeOpacity={0.7}
            >
              <View style={themed($cardIconContainer)}>
                <Icon icon={card.icon} size={20} color={theme.colors.tint} />
              </View>
              <Text preset="default" text={card.heading} style={themed($cardHeading)} />
              <Text preset="default" text={card.content} style={themed($cardSubtitle)} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activity Section */}
      <View style={themed($recentActivityContainer)}>
        <Text preset="subheading" text="Recent Activity" style={themed($sectionTitle)} />
        <View style={themed($emptyStateContainer)}>
          <EmptyState
            imageSource={null}
            heading="No recent activity"
            content="Your recent actions and updates will appear here."
            button="View All Activity"
            buttonOnPress={() => console.log("Navigate to Activity Feed")}
          />
        </View>
      </View>

      {/* Minimal Footer */}
      <View style={themed($minimalFooterContainer)}>
        <Text preset="default" text="App Version 0.0.1" style={themed($versionText)} />
      </View>
    </MainContentScreen>
  )
}

// Screen styles
const $screenStyle: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  flex: 1,
})

// Header Styles - Minimal with just profile icon
const $headerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  backgroundColor: theme.colors.background,
  paddingRight: theme.spacing.lg, // Ensure right padding matches content
})

const $profileIconButton: ThemedStyle<ViewStyle> = (theme) => ({
  // No padding - let the header container handle alignment
})

const $profileIconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral200,
})

// Hero Section Styles
const $heroContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.xl,
})

const $heroContent: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.lg,
})

const $heroTitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  marginBottom: theme.spacing.xs,
})

const $heroSubtitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 16,
})

// Quick Actions Styles - Minimalist
const $quickActionsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.xl,
})

const $quickActionsGrid: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  gap: theme.spacing.md,
})

const $minimalActionCard: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  width: "48%",
  minHeight: 100,
  backgroundColor: theme.colors.palette.neutral50,
  borderRadius: 12,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral200,
  shadowColor: theme.colors.palette.neutral800,
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.02,
  shadowRadius: 4,
  elevation: 1,
  alignItems: "center",
  justifyContent: "center",
})

const $cardIconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  width: 36,
  height: 36,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: 8,
  marginBottom: theme.spacing.sm,
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral200,
})

const $cardHeading: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
  fontSize: 14,
  fontWeight: "600",
  textAlign: "center",
  marginBottom: theme.spacing.xxs,
})

const $cardSubtitle: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 12,
  textAlign: "center",
  lineHeight: 16,
})

// Section Title Style
const $sectionTitle: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
  color: theme.colors.text,
  fontWeight: "600",
})

// Recent Activity Styles
const $recentActivityContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.xl,
})

const $emptyStateContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: 16,
  padding: theme.spacing.lg,
  alignItems: "center",
  borderWidth: 1,
  borderColor: theme.colors.palette.neutral200,
})

// Minimal Footer Styles
const $minimalFooterContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.xl,
  paddingTop: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.separator,
  alignItems: "center",
})

const $versionText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 12,
})
