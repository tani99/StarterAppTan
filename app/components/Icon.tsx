/**
 * Icon Component
 * 
 * A wrapper around react-native-vector-icons for consistent icon usage
 */

import React from "react"
import { TextStyle, ViewStyle, View, StyleSheet } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { colors } from "../theme"

export type IconFamily = "material" | "ionicons" | "fontawesome" | "fontawesome5"
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl"

const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 40,
}

export interface IconProps {
  /**
   * Icon name (must match the icon family's naming convention)
   */
  name: string

  /**
   * Icon family/library to use
   * @default "material"
   */
  family?: IconFamily

  /**
   * Size of the icon (predefined or custom number)
   * @default "md"
   */
  size?: IconSize | number

  /**
   * Color of the icon
   * @default colors.text.primary
   */
  color?: string

  /**
   * Custom style for the icon
   */
  style?: TextStyle

  /**
   * Container style
   */
  containerStyle?: ViewStyle

  /**
   * Accessibility label
   */
  accessibilityLabel?: string
}

export function Icon({
  name,
  family = "material",
  size = "md",
  color = colors.text.primary,
  style,
  containerStyle,
  accessibilityLabel,
}: IconProps) {
  // Determine the numeric size
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size]

  // Select the appropriate icon component based on family
  const getIconComponent = () => {
    const commonProps = {
      name,
      size: iconSize,
      color,
      style,
      accessibilityLabel,
    }

    switch (family) {
      case "material":
        return <MaterialIcons {...commonProps} />
      case "ionicons":
        return <Ionicons {...commonProps} />
      case "fontawesome":
        return <FontAwesome {...commonProps} />
      case "fontawesome5":
        return <FontAwesome5 {...commonProps} />
      default:
        return <MaterialIcons {...commonProps} />
    }
  }

  if (containerStyle) {
    return <View style={containerStyle}>{getIconComponent()}</View>
  }

  return getIconComponent()
}

/**
 * Predefined icon helpers for common use cases
 */
export const IconPresets = {
  back: (props?: Partial<IconProps>) => (
    <Icon name="arrow-back" family="material" {...props} />
  ),
  close: (props?: Partial<IconProps>) => (
    <Icon name="close" family="material" {...props} />
  ),
  check: (props?: Partial<IconProps>) => (
    <Icon name="check" family="material" {...props} />
  ),
  chevronRight: (props?: Partial<IconProps>) => (
    <Icon name="chevron-right" family="material" {...props} />
  ),
  chevronLeft: (props?: Partial<IconProps>) => (
    <Icon name="chevron-left" family="material" {...props} />
  ),
  chevronDown: (props?: Partial<IconProps>) => (
    <Icon name="keyboard-arrow-down" family="material" {...props} />
  ),
  chevronUp: (props?: Partial<IconProps>) => (
    <Icon name="keyboard-arrow-up" family="material" {...props} />
  ),
  email: (props?: Partial<IconProps>) => (
    <Icon name="email" family="material" {...props} />
  ),
  lock: (props?: Partial<IconProps>) => (
    <Icon name="lock" family="material" {...props} />
  ),
  person: (props?: Partial<IconProps>) => (
    <Icon name="person" family="material" {...props} />
  ),
  settings: (props?: Partial<IconProps>) => (
    <Icon name="settings" family="material" {...props} />
  ),
  logout: (props?: Partial<IconProps>) => (
    <Icon name="logout" family="material" {...props} />
  ),
  menu: (props?: Partial<IconProps>) => (
    <Icon name="menu" family="material" {...props} />
  ),
  home: (props?: Partial<IconProps>) => (
    <Icon name="home" family="material" {...props} />
  ),
  search: (props?: Partial<IconProps>) => (
    <Icon name="search" family="material" {...props} />
  ),
  error: (props?: Partial<IconProps>) => (
    <Icon name="error" family="material" color={colors.error[500]} {...props} />
  ),
  success: (props?: Partial<IconProps>) => (
    <Icon name="check-circle" family="material" color={colors.success[500]} {...props} />
  ),
  warning: (props?: Partial<IconProps>) => (
    <Icon name="warning" family="material" color={colors.warning[500]} {...props} />
  ),
  info: (props?: Partial<IconProps>) => (
    <Icon name="info" family="material" color={colors.info[500]} {...props} />
  ),
}

