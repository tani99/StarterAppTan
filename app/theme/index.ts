/**
 * Theme System
 * 
 * Central export point for all theme constants and utilities
 */

export * from "./colors"
export * from "./spacing"
export * from "./typography"

import { colors } from "./colors"
import { spacing, borderRadius, borderWidth, shadows, screenPadding, componentSpacing } from "./spacing"
import { typography, fontFamily, fontSize, fontWeight, lineHeight } from "./typography"

/**
 * Complete theme object
 * Provides easy access to all theme values in one place
 */
export const theme = {
  colors,
  spacing,
  borderRadius,
  borderWidth,
  shadows,
  screenPadding,
  componentSpacing,
  typography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} as const

export type Theme = typeof theme

/**
 * Theme constants for easy access
 */
export const THEME = theme

export default theme

