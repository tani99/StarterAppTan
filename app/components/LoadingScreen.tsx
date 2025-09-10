import { View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { LoadingIndicator } from "./LoadingIndicator"
import { Text } from "./Text"

export interface LoadingScreenProps {
  /**
   * Optional loading message to display
   */
  message?: string
}

/**
 * A full-screen loading component with spinner and optional message
 */
export const LoadingScreen = (props: LoadingScreenProps) => {
  const { message = "Loading..." } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($container)}>
      <LoadingIndicator size="large" />
      {message && <Text preset="subheading" text={message} style={themed($message)} />}
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.background,
})

const $message: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.md,
})
