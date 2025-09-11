import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { MainContentScreen } from "@/components/templates"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme } = useAppTheme()
  const { user } = useAuth()

  return (
    <MainContentScreen
      title={`Welcome, ${user?.displayName || user?.email || "User"}!`}
      titleProps={{
        testID: "welcome-heading",
        style: themed($welcomeTitle),
      }}
      preset="scroll"
      style={themed($screenStyle)}
    >
      {/* Hero Section */}
      <View style={themed($heroContainer)}>
        <Image style={themed($welcomeLogo)} source={welcomeLogo} resizeMode="contain" />
        <Text tx="welcomeScreen:readyForLaunch" preset="heading" style={themed($heroHeading)} />
        <Text tx="welcomeScreen:exciting" preset="subheading" style={themed($heroSubheading)} />
        <View style={themed($welcomeFaceContainer)}>
          <Image
            style={$welcomeFace}
            source={welcomeFace}
            resizeMode="contain"
            tintColor={theme.colors.palette.neutral900}
          />
        </View>
      </View>

      {/* Content Section */}
      <View style={themed($contentContainer)}>
        <Text tx="welcomeScreen:postscript" size="md" style={themed($postscriptText)} />
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

// Hero section styles
const $heroContainer: ThemedStyle<ViewStyle> = (theme) => ({
  alignItems: "center",
  paddingVertical: theme.spacing.xl,
  marginBottom: theme.spacing.lg,
})

const $welcomeLogo: ThemedStyle<ImageStyle> = (theme) => ({
  height: 88,
  width: "100%",
  marginBottom: theme.spacing.xl,
})

const $heroHeading: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  marginBottom: theme.spacing.md,
  color: theme.colors.text,
})

const $heroSubheading: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  marginBottom: theme.spacing.lg,
  color: theme.colors.textDim,
})

const $welcomeFaceContainer: ThemedStyle<ViewStyle> = (theme) => ({
  position: "relative",
  height: 120,
  width: "100%",
  marginTop: theme.spacing.md,
})

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

// Content section styles
const $contentContainer: ThemedStyle<ViewStyle> = (theme) => ({
  backgroundColor: theme.colors.palette.neutral100,
  borderRadius: theme.spacing.md,
  padding: theme.spacing.lg,
  marginTop: theme.spacing.lg,
})

const $postscriptText: ThemedStyle<TextStyle> = (theme) => ({
  textAlign: "center",
  color: theme.colors.textDim,
  lineHeight: 22,
})
