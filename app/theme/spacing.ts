/**
 * Spacing System for FashionApp
 * 
 * Based on a 4px base unit system for consistent spacing throughout the app
 */

const BASE_UNIT = 4

export const spacing = {
  /**
   * Extra extra small spacing
   */
  xxs: BASE_UNIT, // 4px

  /**
   * Extra small spacing
   */
  xs: BASE_UNIT * 2, // 8px

  /**
   * Small spacing
   */
  sm: BASE_UNIT * 3, // 12px

  /**
   * Medium spacing (base)
   */
  md: BASE_UNIT * 4, // 16px

  /**
   * Large spacing
   */
  lg: BASE_UNIT * 5, // 20px

  /**
   * Extra large spacing
   */
  xl: BASE_UNIT * 6, // 24px

  /**
   * Extra extra large spacing
   */
  xxl: BASE_UNIT * 8, // 32px

  /**
   * Extra extra extra large spacing
   */
  xxxl: BASE_UNIT * 10, // 40px

  /**
   * Huge spacing
   */
  huge: BASE_UNIT * 12, // 48px

  /**
   * Massive spacing
   */
  massive: BASE_UNIT * 16, // 64px
} as const

/**
 * Screen padding/margins
 * Consistent padding for screen edges and containers
 */
export const screenPadding = {
  horizontal: spacing.md, // 16px
  vertical: spacing.lg, // 20px
  
  // Responsive padding for different screen sizes
  small: spacing.md, // 16px for small screens
  medium: spacing.xl, // 24px for medium screens
  large: spacing.xxl, // 32px for large screens
} as const

/**
 * Component-specific spacing
 */
export const componentSpacing = {
  /**
   * Card padding
   */
  cardPadding: spacing.md, // 16px
  cardPaddingLarge: spacing.xl, // 24px
  cardGap: spacing.md, // 16px between cards

  /**
   * Button spacing
   */
  buttonPaddingHorizontal: spacing.xl, // 24px
  buttonPaddingVertical: spacing.sm, // 12px
  buttonGap: spacing.xs, // 8px between icon and text

  /**
   * Form field spacing
   */
  inputPaddingHorizontal: spacing.md, // 16px
  inputPaddingVertical: spacing.sm, // 12px
  inputGap: spacing.md, // 16px between form fields
  labelGap: spacing.xs, // 8px between label and input

  /**
   * Icon spacing
   */
  iconGap: spacing.xs, // 8px between icon and text
} as const

/**
 * Border radius system
 */
export const borderRadius = {
  none: 0,
  xs: BASE_UNIT, // 4px
  sm: BASE_UNIT * 2, // 8px
  md: BASE_UNIT * 3, // 12px
  lg: BASE_UNIT * 4, // 16px
  xl: BASE_UNIT * 5, // 20px
  full: 9999, // Fully rounded (circular)
} as const

/**
 * Border width system
 */
export const borderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 3,
} as const

/**
 * Shadow elevations
 */
export const shadows = {
  none: {
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
} as const

export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
export type BorderWidth = typeof borderWidth
export type Shadows = typeof shadows

