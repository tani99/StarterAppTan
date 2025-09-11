/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  // Existing numeric spacing values (unchanged)
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,

  // New semantic spacing tokens
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
