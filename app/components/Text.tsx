import { ReactNode } from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * Children components.
   */
  children?: ReactNode
}

/**
 * Simple Text component for displaying text
 */
export function Text(props: TextProps) {
  const { text, children, style, ...rest } = props

  const content = text || children

  return (
    <RNText {...rest} style={[$baseStyle, style]}>
      {content}
    </RNText>
  )
}

const $baseStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 24,
  color: "#000000",
}
