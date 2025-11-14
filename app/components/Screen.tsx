import { ReactNode } from "react"
import { View, ViewStyle, StyleProp, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { useSafeAreaInsetsStyle, ExtendedEdge } from "../utils/useSafeAreaInsetsStyle"

export interface ScreenProps {
  /**
   * Children components.
   */
  children?: ReactNode
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * Override the default edges for the safe area.
   * Defaults to ["top", "bottom"] for automatic safe area handling.
   * Pass an empty array [] to disable safe area insets.
   */
  safeAreaEdges?: ExtendedEdge[]
  /**
   * Background color of the screen
   */
  backgroundColor?: string
  /**
   * Screen preset - determines layout behavior
   * - "fixed": Non-scrollable screen
   * - "scroll": Scrollable screen with ScrollView
   * - "auto": Auto-detect based on content
   */
  preset?: "fixed" | "scroll" | "auto"
  /**
   * Should keyboard avoid the content? Only works with scroll preset.
   */
  keyboardAvoidingViewEnabled?: boolean
  /**
   * Pass any additional props to the inner ScrollView (only works with scroll preset)
   */
  ScrollViewProps?: React.ComponentProps<typeof ScrollView>
}

/**
 * Screen component with proper safe area handling
 */
export function Screen(props: ScreenProps) {
  const {
    style,
    children,
    safeAreaEdges = ["top", "bottom"], // Default to top and bottom safe areas
    backgroundColor = "#FFFFFF",
    preset = "fixed",
    keyboardAvoidingViewEnabled = false,
    ScrollViewProps,
  } = props

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges)

  const $containerStyle: ViewStyle = {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor,
  }

  // For scroll preset, wrap in ScrollView
  if (preset === "scroll") {
    const $scrollViewStyle = [$containerStyle, $containerInsets]
    
    return (
      <View style={$containerStyle}>
        {keyboardAvoidingViewEnabled ? (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <ScrollView
              style={$scrollViewStyle}
              contentContainerStyle={[style]}
              showsVerticalScrollIndicator={false}
              {...ScrollViewProps}
            >
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <ScrollView
            style={$scrollViewStyle}
            contentContainerStyle={[style]}
            showsVerticalScrollIndicator={false}
            {...ScrollViewProps}
          >
            {children}
          </ScrollView>
        )}
      </View>
    )
  }

  // For fixed preset (default), just use View with safe area insets
  return <View style={[$containerStyle, $containerInsets, style]}>{children}</View>
}
