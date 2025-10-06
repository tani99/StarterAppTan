/**
 * Typography System for FashionApp
 * 
 * Defines text styles, sizes, and font families for consistent typography
 */

import { Platform, TextStyle } from "react-native"

/**
 * Font families
 */
export const fontFamily = {
  regular: Platform.select({
    ios: "Space Grotesk",
    android: "SpaceGrotesk-Regular",
    default: "Space Grotesk",
  }),
  medium: Platform.select({
    ios: "Space Grotesk",
    android: "SpaceGrotesk-Medium",
    default: "Space Grotesk",
  }),
  semiBold: Platform.select({
    ios: "Space Grotesk",
    android: "SpaceGrotesk-SemiBold",
    default: "Space Grotesk",
  }),
  bold: Platform.select({
    ios: "Space Grotesk",
    android: "SpaceGrotesk-Bold",
    default: "Space Grotesk",
  }),
} as const

/**
 * Font sizes
 */
export const fontSize = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
  "4xl": 32,
  "5xl": 36,
  "6xl": 48,
} as const

/**
 * Font weights
 */
export const fontWeight = {
  regular: "400" as TextStyle["fontWeight"],
  medium: "500" as TextStyle["fontWeight"],
  semiBold: "600" as TextStyle["fontWeight"],
  bold: "700" as TextStyle["fontWeight"],
} as const

/**
 * Line heights
 */
export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const

/**
 * Typography variants
 * Pre-defined text styles for consistent usage throughout the app
 */
export const typography = {
  /**
   * Heading styles
   */
  heading1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize["4xl"], // 32px
    fontWeight: fontWeight.bold,
    lineHeight: fontSize["4xl"] * lineHeight.tight, // 38.4px
  } as TextStyle,

  heading2: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize["3xl"], // 28px
    fontWeight: fontWeight.bold,
    lineHeight: fontSize["3xl"] * lineHeight.tight, // 33.6px
  } as TextStyle,

  heading3: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize["2xl"], // 24px
    fontWeight: fontWeight.bold,
    lineHeight: fontSize["2xl"] * lineHeight.tight, // 28.8px
  } as TextStyle,

  heading4: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xl, // 20px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.xl * lineHeight.normal, // 30px
  } as TextStyle,

  heading5: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.lg, // 18px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.lg * lineHeight.normal, // 27px
  } as TextStyle,

  heading6: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.base * lineHeight.normal, // 24px
  } as TextStyle,

  /**
   * Body text styles
   */
  body1: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.base * lineHeight.normal, // 24px
  } as TextStyle,

  body2: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.sm * lineHeight.normal, // 21px
  } as TextStyle,

  /**
   * Body text medium weight variants
   */
  body1Medium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.base * lineHeight.normal, // 24px
  } as TextStyle,

  body2Medium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal, // 21px
  } as TextStyle,

  /**
   * Caption and helper text
   */
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xs, // 12px
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.xs * lineHeight.normal, // 18px
  } as TextStyle,

  captionMedium: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.xs, // 12px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.xs * lineHeight.normal, // 18px
  } as TextStyle,

  /**
   * Button text styles
   */
  buttonLarge: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.base * lineHeight.tight, // 19.2px
  } as TextStyle,

  buttonMedium: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.sm * lineHeight.tight, // 16.8px
  } as TextStyle,

  buttonSmall: {
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.xs, // 12px
    fontWeight: fontWeight.semiBold,
    lineHeight: fontSize.xs * lineHeight.tight, // 14.4px
  } as TextStyle,

  /**
   * Label text
   */
  label: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal, // 21px
  } as TextStyle,

  /**
   * Input/form text
   */
  input: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.regular,
    lineHeight: fontSize.base * lineHeight.normal, // 24px
  } as TextStyle,

  /**
   * Link text
   */
  link: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.base, // 16px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.base * lineHeight.normal, // 24px
  } as TextStyle,

  linkSmall: {
    fontFamily: fontFamily.medium,
    fontSize: fontSize.sm, // 14px
    fontWeight: fontWeight.medium,
    lineHeight: fontSize.sm * lineHeight.normal, // 21px
  } as TextStyle,
} as const

export type Typography = typeof typography
export type FontFamily = typeof fontFamily
export type FontSize = typeof fontSize
export type FontWeight = typeof fontWeight
export type LineHeight = typeof lineHeight

