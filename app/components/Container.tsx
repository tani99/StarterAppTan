/**
 * Container Component
 * 
 * A layout component that provides consistent padding and max-width for content
 */

import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { colors, spacing, screenPadding } from "../theme"

export interface ContainerProps {
  /**
   * Container content
   */
  children: React.ReactNode

  /**
   * Whether to center the content horizontally
   * @default false
   */
  centered?: boolean

  /**
   * Custom horizontal padding
   * If not provided, uses theme default
   */
  paddingHorizontal?: number

  /**
   * Custom vertical padding
   * If not provided, uses theme default
   */
  paddingVertical?: number

  /**
   * Whether to remove all padding
   * @default false
   */
  noPadding?: boolean

  /**
   * Background color
   * @default transparent
   */
  backgroundColor?: string

  /**
   * Maximum width for the container
   * Useful for responsive design on tablets
   */
  maxWidth?: number

  /**
   * Custom style for the container
   */
  style?: ViewStyle
}

export function Container({
  children,
  centered = false,
  paddingHorizontal,
  paddingVertical,
  noPadding = false,
  backgroundColor,
  maxWidth,
  style,
}: ContainerProps) {
  return (
    <View
      style={[
        styles.container,
        !noPadding && {
          paddingHorizontal: paddingHorizontal ?? screenPadding.horizontal,
          paddingVertical: paddingVertical ?? screenPadding.vertical,
        },
        centered && styles.centered,
        backgroundColor && { backgroundColor },
        maxWidth && { maxWidth, alignSelf: "center", width: "100%" },
        style,
      ]}
    >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
  },
})

