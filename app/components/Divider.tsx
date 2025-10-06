/**
 * Divider Component
 * 
 * A visual separator line with optional text/label in the middle
 */

import React from "react"
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native"
import { colors, spacing, typography, borderWidth } from "../theme"

export type DividerOrientation = "horizontal" | "vertical"
export type DividerStyle = "solid" | "dashed"

export interface DividerProps {
  /**
   * Orientation of the divider
   * @default "horizontal"
   */
  orientation?: DividerOrientation

  /**
   * Style of the divider line
   * @default "solid"
   */
  lineStyle?: DividerStyle

  /**
   * Optional text/label to display in the middle of the divider
   * Only works with horizontal orientation
   */
  label?: string

  /**
   * Color of the divider line
   * @default colors.border.default
   */
  color?: string

  /**
   * Thickness of the divider line
   * @default borderWidth.thin
   */
  thickness?: number

  /**
   * Spacing around the label text
   * @default spacing.sm
   */
  labelSpacing?: number

  /**
   * Custom style for the container
   */
  style?: ViewStyle

  /**
   * Custom style for the label text
   */
  labelStyle?: TextStyle
}

export function Divider({
  orientation = "horizontal",
  lineStyle = "solid",
  label,
  color = colors.border.default,
  thickness = borderWidth.thin,
  labelSpacing = spacing.sm,
  style,
  labelStyle,
}: DividerProps) {
  const isHorizontal = orientation === "horizontal"
  const isDashed = lineStyle === "dashed"

  // Base line style
  const lineBaseStyle: ViewStyle = {
    backgroundColor: color,
    ...(isHorizontal
      ? { height: thickness, width: "100%" }
      : { width: thickness, height: "100%" }),
  }

  // Dashed line style (using borderStyle)
  const dashedLineStyle: ViewStyle = isDashed
    ? {
        backgroundColor: "transparent",
        ...(isHorizontal
          ? {
              borderTopWidth: thickness,
              borderStyle: "dashed",
              borderColor: color,
              height: 0,
            }
          : {
              borderLeftWidth: thickness,
              borderStyle: "dashed",
              borderColor: color,
              width: 0,
            }),
      }
    : {}

  // If there's a label and it's horizontal, render divider with text in middle
  if (label && isHorizontal) {
    return (
      <View style={[styles.horizontalWithLabel, style]}>
        <View
          style={[
            styles.line,
            lineBaseStyle,
            dashedLineStyle,
            styles.labelLine,
          ]}
        />
        <Text
          style={[
            styles.label,
            { marginHorizontal: labelSpacing },
            labelStyle,
          ]}
        >
          {label}
        </Text>
        <View
          style={[
            styles.line,
            lineBaseStyle,
            dashedLineStyle,
            styles.labelLine,
          ]}
        />
      </View>
    )
  }

  // Simple divider without label
  return <View style={[styles.line, lineBaseStyle, dashedLineStyle, style]} />
}

const styles = StyleSheet.create({
  line: {
    // Base styles applied dynamically
  },
  horizontalWithLabel: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  labelLine: {
    flex: 1,
  },
  label: {
    ...typography.body2,
    color: colors.text.secondary,
  },
})

