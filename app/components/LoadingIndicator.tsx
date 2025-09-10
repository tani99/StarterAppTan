import { ActivityIndicator, View, ViewStyle } from "react-native"

import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface LoadingIndicatorProps {
  /**
   * Size of the loading indicator
   */
  size?: "small" | "large"
  /**
   * Custom color for the indicator
   */
  color?: string
  /**
   * Optional style override
   */
  style?: ViewStyle
}

/**
 * A simple loading indicator component using ActivityIndicator
 */
export const LoadingIndicator = (props: LoadingIndicatorProps) => {
  const { size = "small", color, style } = props
  const { themed, theme } = useAppTheme()

  const indicatorColor = color || theme.colors.tint

  return (
    <View style={[themed($container), style]}>
      <ActivityIndicator size={size} color={indicatorColor} />
    </View>
  )
}

const $container: ThemedStyle<ViewStyle> = () => ({
  justifyContent: "center",
  alignItems: "center",
})
