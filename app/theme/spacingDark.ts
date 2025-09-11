const SPACING_MULTIPLIER = 1.0

// This is an example of how you can have different spacing values for different themes.
export const spacing = {
  xxxs: 2 * SPACING_MULTIPLIER,
  xxs: 4 * SPACING_MULTIPLIER,
  xs: 8 * SPACING_MULTIPLIER,
  sm: 12 * SPACING_MULTIPLIER,
  md: 16 * SPACING_MULTIPLIER,
  lg: 24 * SPACING_MULTIPLIER,
  xl: 32 * SPACING_MULTIPLIER,
  xxl: 48 * SPACING_MULTIPLIER,
  xxxl: 64 * SPACING_MULTIPLIER,

  // New semantic spacing tokens (same as light theme for consistency)
  component: {
    padding: 16,
    margin: 12,
    gap: 8,
  },
  layout: {
    section: 32,
    container: 24,
    card: 16,
  },
  text: {
    line: 4,
    paragraph: 12,
    heading: 8,
  },
} as const
