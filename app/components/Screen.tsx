import { ReactNode } from "react"
import { View, ViewStyle, StyleProp } from "react-native"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Simple Screen component for displaying content
 */
export function Screen(props: ScreenProps) {
  const { style, children } = props

  return <View style={[$containerStyle, style]}>{children}</View>
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: "#FFFFFF",
}
