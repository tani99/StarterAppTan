/**
 * Spacer Component
 * 
 * A flexible spacing component for adding vertical or horizontal space between elements
 */

import React from "react"
import { View, ViewStyle } from "react-native"
import { spacing } from "../theme"

export type SpacerSize = keyof typeof spacing | number

export interface SpacerProps {
  /**
   * Size of the space
   * Can be a theme spacing key (xxs, xs, sm, md, lg, xl, xxl, xxxl, huge, massive)
   * or a custom number
   * @default "md"
   */
  size?: SpacerSize

  /**
   * Direction of the spacer
   * @default "vertical"
   */
  direction?: "vertical" | "horizontal"

  /**
   * Custom style
   */
  style?: ViewStyle
}

export function Spacer({
  size = "md",
  direction = "vertical",
  style,
}: SpacerProps) {
  // Determine the numeric spacing value
  const spacingValue = typeof size === "number" 
    ? size 
    : spacing[size as keyof typeof spacing]

  const spacerStyle: ViewStyle = direction === "vertical"
    ? { height: spacingValue }
    : { width: spacingValue }

  return <View style={[spacerStyle, style]} />
}

/**
 * Predefined Spacer helpers for common use cases
 */
export const SpacerPresets = {
  xxs: (props?: Partial<SpacerProps>) => <Spacer size="xxs" {...props} />,
  xs: (props?: Partial<SpacerProps>) => <Spacer size="xs" {...props} />,
  sm: (props?: Partial<SpacerProps>) => <Spacer size="sm" {...props} />,
  md: (props?: Partial<SpacerProps>) => <Spacer size="md" {...props} />,
  lg: (props?: Partial<SpacerProps>) => <Spacer size="lg" {...props} />,
  xl: (props?: Partial<SpacerProps>) => <Spacer size="xl" {...props} />,
  xxl: (props?: Partial<SpacerProps>) => <Spacer size="xxl" {...props} />,
  xxxl: (props?: Partial<SpacerProps>) => <Spacer size="xxxl" {...props} />,
  huge: (props?: Partial<SpacerProps>) => <Spacer size="huge" {...props} />,
  massive: (props?: Partial<SpacerProps>) => <Spacer size="massive" {...props} />,
}

