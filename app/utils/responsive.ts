/**
 * Responsive Design Utilities
 * 
 * Helper functions for responsive layouts and typography
 */

import { Dimensions, PixelRatio, Platform } from "react-native"

/**
 * Get current screen dimensions
 */
export function getScreenDimensions() {
  const { width, height } = Dimensions.get("window")
  return { width, height }
}

/**
 * Get screen dimensions
 */
export function getScreenWidth(): number {
  return Dimensions.get("window").width
}

export function getScreenHeight(): number {
  return Dimensions.get("window").height
}

/**
 * Breakpoints for responsive design
 */
export const Breakpoints = {
  xs: 0,     // Extra small devices (phones in portrait)
  sm: 375,   // Small devices (small phones)
  md: 768,   // Medium devices (tablets in portrait, large phones in landscape)
  lg: 1024,  // Large devices (tablets in landscape)
  xl: 1280,  // Extra large devices (large tablets)
} as const

/**
 * Device type detection
 */
export enum DeviceType {
  Phone = "phone",
  Tablet = "tablet",
  Desktop = "desktop",
}

/**
 * Detect device type based on screen width
 */
export function getDeviceType(): DeviceType {
  const width = getScreenWidth()
  
  if (width >= Breakpoints.lg) {
    return DeviceType.Tablet
  } else if (width >= Breakpoints.md) {
    return DeviceType.Tablet
  } else {
    return DeviceType.Phone
  }
}

/**
 * Check if device is a tablet
 */
export function isTablet(): boolean {
  return getDeviceType() === DeviceType.Tablet
}

/**
 * Check if device is a phone
 */
export function isPhone(): boolean {
  return getDeviceType() === DeviceType.Phone
}

/**
 * Get responsive value based on screen width
 * @param phoneValue Value for phone screens
 * @param tabletValue Value for tablet screens
 */
export function getResponsiveValue<T>(phoneValue: T, tabletValue: T): T {
  return isTablet() ? tabletValue : phoneValue
}

/**
 * Scale size based on screen width
 * Useful for responsive typography and spacing
 */
export function scaleSize(size: number, baseWidth: number = 375): number {
  const screenWidth = getScreenWidth()
  const scale = screenWidth / baseWidth
  const newSize = size * scale
  
  // Round to nearest pixel
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

/**
 * Scale font size with limits
 */
export function scaleFontSize(
  size: number,
  minSize?: number,
  maxSize?: number
): number {
  const scaled = scaleSize(size)
  
  if (minSize && scaled < minSize) return minSize
  if (maxSize && scaled > maxSize) return maxSize
  
  return scaled
}

/**
 * Get responsive padding based on screen size
 */
export function getResponsivePadding(): number {
  const width = getScreenWidth()
  
  if (width >= Breakpoints.xl) return 32
  if (width >= Breakpoints.lg) return 24
  if (width >= Breakpoints.md) return 20
  return 16
}

/**
 * Get responsive container width
 * Ensures content doesn't stretch too wide on tablets
 */
export function getResponsiveContainerWidth(): number | "100%" {
  const width = getScreenWidth()
  
  if (width >= Breakpoints.xl) return 1200
  if (width >= Breakpoints.lg) return 960
  if (width >= Breakpoints.md) return 720
  return "100%"
}

/**
 * Get column count for grid layouts based on screen size
 */
export function getGridColumns(
  phoneColumns: number = 2,
  tabletColumns: number = 3
): number {
  return isTablet() ? tabletColumns : phoneColumns
}

/**
 * Check if screen is in landscape orientation
 */
export function isLandscape(): boolean {
  const { width, height } = getScreenDimensions()
  return width > height
}

/**
 * Check if screen is in portrait orientation
 */
export function isPortrait(): boolean {
  return !isLandscape()
}

/**
 * Get orientation
 */
export function getOrientation(): "portrait" | "landscape" {
  return isLandscape() ? "landscape" : "portrait"
}

/**
 * Responsive spacing multiplier
 */
export function getSpacingMultiplier(): number {
  const width = getScreenWidth()
  
  if (width >= Breakpoints.xl) return 1.5
  if (width >= Breakpoints.lg) return 1.25
  if (width >= Breakpoints.md) return 1.1
  return 1
}

/**
 * Check if small screen (phone in portrait)
 */
export function isSmallScreen(): boolean {
  return getScreenWidth() < Breakpoints.md && isPortrait()
}

/**
 * Check if large screen (tablet or desktop)
 */
export function isLargeScreen(): boolean {
  return getScreenWidth() >= Breakpoints.md
}

/**
 * Platform-specific responsive values
 */
export function getPlatformValue<T>(
  iosValue: T,
  androidValue: T,
  defaultValue?: T
): T {
  if (Platform.OS === "ios") return iosValue
  if (Platform.OS === "android") return androidValue
  return defaultValue ?? iosValue
}

/**
 * Responsive style helper
 * Returns different style objects based on screen size
 */
export function responsiveStyle<T>(
  phoneStyle: T,
  tabletStyle: T,
  desktopStyle?: T
): T {
  const width = getScreenWidth()
  
  if (desktopStyle && width >= Breakpoints.xl) return desktopStyle
  if (width >= Breakpoints.md) return tabletStyle
  return phoneStyle
}

