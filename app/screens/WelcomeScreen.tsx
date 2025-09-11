import { FC } from "react"
import { TextStyle, View, ViewStyle, TouchableOpacity, Platform, Dimensions } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

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
}

const actionCards: ActionCardProps[] = [
  {
    icon: "bell",
    heading: "Notifications",
    content: "Manage your notification preferences.",
    action: () => console.log("Navigate to Notifications"),
  },
  {
    icon: "lock",
    heading: "Privacy",
    content: "Control your privacy settings.",
    action: () => console.log("Navigate to Privacy"),
  },
  {
    icon: "settings",
    heading: "Settings",
    content: "Configure your app settings.",
    action: () => console.log("Navigate to Settings"),
  },
  {
    icon: "ladybug",
    heading: "Debug",
    content: "Access developer debug tools.",
    action: () => console.log("Navigate to Debug"),
  },
]

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()
  const { user } = useAuth()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const navigateToProfile = () => {
    navigation.navigate("Profile")
  }

  return (
    <MainContentScreen
      title={`Welcome, ${user?.displayName || user?.email || "User"}!`}
      titleProps={{
        testID: "welcome-heading",
        style: themed($welcomeTitle),
      }}
      onTitlePress={navigateToProfile}
      HeaderActions={
        <TouchableOpacity
          onPress={navigateToProfile}
          accessibilityRole="button"
          accessibilityLabel="Open profile"
        >
          <Icon icon="settings" size={24} color={theme.colors.tint} />
        </TouchableOpacity>
      }
      preset="scroll"
      style={themed($screenStyle)}
    >
      {/* Quick Actions Section */}
      <View style={themed($actionsContainer)}>
        <Text preset="subheading" text="Quick Actions" style={themed($actionsTitle)} />
        <View style={themed($cardsContainer)}>
          {actionCards.map((card, index) => (
            <Card
              key={index}
              style={themed($card)}
              heading={card.heading}
              content={card.content}
              onPress={card.action}
              LeftComponent={
                <View style={themed($cardIconContainer)}>
                  <Icon icon={card.icon} size={32} color={theme.colors.tint} />
                </View>
              }
            />
          ))}
        </View>
      </View>

      {/* Recent Activity Section */}
      <View style={themed($recentActivityContainer)}>
        <Text preset="subheading" text="Recent Activity" style={themed($sectionTitle)} />
        <View style={themed($emptyStateContainer)}>
          <EmptyState
            heading="No recent activity"
            content="Your recent actions and updates will appear here."
            button="View All Activity"
            buttonOnPress={() => console.log("Navigate to Activity Feed")}
          />
        </View>
      </View>

      {/* Footer Section */}
      <View style={themed($footerContainer)}>
        <View style={themed($footerContent)}>
          <Text preset="default" text="App Version 0.0.1" style={themed($versionText)} />
          <View style={themed($footerActions)}>
            <TouchableOpacity
              onPress={() => console.log("Navigate to Help")}
              style={themed($footerActionButton)}
            >
              <Text preset="default" text="Help" style={themed($footerActionText)} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Navigate to About")}
              style={themed($footerActionButton)}
            >
              <Text preset="default" text="About" style={themed($footerActionText)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainContentScreen>
  )
}

// Screen styles
const $screenStyle: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.background,
  flex: 1,
})

const $welcomeTitle: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  color: theme.colors.text,
})

// Quick actions section styles
const $actionsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.lg,
})

const $actionsTitle: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
  color: theme.colors.text,
})

const $cardsContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  gap: theme.spacing.md,
})

const cardGap = 16 // Corresponds to theme.spacing.md
const cardColumns = 2
const screenWidth = Dimensions.get("window").width
const containerPadding = 32 // Corresponds to theme.spacing.lg * 2
const availableWidth = screenWidth - containerPadding - cardGap * (cardColumns - 1)
const cardWidth = availableWidth / cardColumns

const $card: ThemedStyle<ViewStyle> = () => ({
  width: Platform.OS === "web" ? cardWidth : "100%",
  minHeight: 120,
  alignItems: "center",
})

const $cardIconContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginRight: theme.spacing.md,
  padding: theme.spacing.sm,
  backgroundColor: theme.colors.palette.neutral200,
  borderRadius: theme.spacing.sm,
})

// Recent Activity section styles
const $recentActivityContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.xl,
})

const $sectionTitle: ThemedStyle<TextStyle> = (theme) => ({
  marginBottom: theme.spacing.md,
  color: theme.colors.text,
})

const $emptyStateContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: theme.spacing.md,
  padding: theme.spacing.lg,
  alignItems: "center",
})

// Footer section styles
const $footerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginTop: theme.spacing.xl,
  paddingTop: theme.spacing.lg,
  borderTopWidth: 1,
  borderTopColor: theme.colors.separator,
})

const $footerContent: ThemedStyle<ViewStyle> = (_theme) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
})

const $versionText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
  fontSize: 12,
})

const $footerActions: ThemedStyle<ViewStyle> = (theme) => ({
  flexDirection: "row",
  gap: theme.spacing.md,
})

const $footerActionButton: ThemedStyle<ViewStyle> = (_theme) => ({
  paddingVertical: _theme.spacing.xs,
  paddingHorizontal: _theme.spacing.sm,
})

const $footerActionText: ThemedStyle<TextStyle> = (_theme) => ({
  color: _theme.colors.tint,
  fontSize: 12,
})
