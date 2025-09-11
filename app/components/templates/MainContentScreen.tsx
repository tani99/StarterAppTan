import { ReactNode } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { Screen, ScreenProps } from "@/components/Screen"
import { Text, TextProps } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface MainContentScreenProps extends Omit<ScreenProps, "children"> {
  /**
   * The title text to display in the header section.
   */
  title?: string
  /**
   * Optional title text properties for i18n and styling.
   */
  titleProps?: TextProps
  /**
   * The subtitle text to display below the title.
   */
  subtitle?: string
  /**
   * Optional subtitle text properties for i18n and styling.
   */
  subtitleProps?: TextProps
  /**
   * Main content to render in the screen body.
   */
  children?: ReactNode
  /**
   * Optional style override for the header container.
   */
  headerStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the content container.
   */
  contentStyle?: StyleProp<ViewStyle>
  /**
   * Optional style override for the title container.
   */
  titleContainerStyle?: StyleProp<ViewStyle>
  /**
   * Whether to show the header section. Defaults to true.
   */
  showHeader?: boolean
}

/**
 * MainContentScreen is a template component that provides a consistent layout structure
 * for main content screens throughout the app. It includes a header section with title
 * and subtitle, and a content area for the main screen content.
 *
 * This template supports all Screen presets (fixed, scroll, auto) and maintains
 * consistent theming and spacing across the application.
 *
 * @param props - The properties for the MainContentScreen component
 * @returns JSX.Element - The rendered MainContentScreen component
 *
 * @example
 * ```tsx
 * <MainContentScreen
 *   title="Welcome"
 *   subtitle="Get started with your app"
 *   preset="scroll"
 * >
 *   <Text>Your main content goes here</Text>
 * </MainContentScreen>
 * ```
 */
export function MainContentScreen(props: MainContentScreenProps) {
  const {
    title,
    titleProps,
    subtitle,
    subtitleProps,
    children,
    headerStyle,
    contentStyle,
    titleContainerStyle,
    showHeader = true,
    ...screenProps
  } = props

  const { themed } = useAppTheme()

  return (
    <Screen {...screenProps}>
      {showHeader && (title || subtitle) && (
        <View style={[themed($headerContainer), headerStyle]}>
          {title && (
            <View style={[themed($titleContainer), titleContainerStyle]}>
              <Text preset="heading" text={title} style={themed($titleText)} {...titleProps} />
            </View>
          )}
          {subtitle && (
            <Text
              preset="subheading"
              text={subtitle}
              style={themed($subtitleText)}
              {...subtitleProps}
            />
          )}
        </View>
      )}

      {children && <View style={[themed($contentContainer), contentStyle]}>{children}</View>}
    </Screen>
  )
}

const $headerContainer: ThemedStyle<ViewStyle> = (theme) => ({
  paddingHorizontal: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  paddingBottom: theme.spacing.lg,
})

const $titleContainer: ThemedStyle<ViewStyle> = (theme) => ({
  marginBottom: theme.spacing.xs,
})

const $titleText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.text,
})

const $subtitleText: ThemedStyle<TextStyle> = (theme) => ({
  color: theme.colors.textDim,
})

const $contentContainer: ThemedStyle<ViewStyle> = (theme) => ({
  flex: 1,
  paddingHorizontal: theme.spacing.lg,
})
