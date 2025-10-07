/**
 * Color Palette for FashionApp
 * 
 * A comprehensive color system following modern design principles
 */

export const colors = {
  /**
   * Primary Brand Colors - Bold Fashion Purple/Magenta
   * Used for main CTAs, links, and brand identity
   */
  primary: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7", // Main primary color - vibrant purple
    600: "#9333EA",
    700: "#7E22CE",
    800: "#6B21A8",
    900: "#581C87",
  },

  /**
   * Secondary Colors - Electric Pink/Magenta
   * Used for accents and complementary elements
   */
  secondary: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    200: "#FBCFE8",
    300: "#F9A8D4",
    400: "#F472B6",
    500: "#EC4899", // Main secondary color - hot pink
    600: "#DB2777",
    700: "#BE185D",
    800: "#9D174D",
    900: "#831843",
  },

  /**
   * Accent Colors - Neon Cyan
   * Used for highlights and vibrant touches
   */
  accent: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    200: "#A5F3FC",
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#06B6D4", // Main accent color - electric cyan
    600: "#0891B2",
    700: "#0E7490",
    800: "#155E75",
    900: "#164E63",
  },

  /**
   * Neutral Colors
   * Used for text, backgrounds, and UI structure
   */
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
  },

  /**
   * Semantic Colors
   * Used for status indicators and feedback
   */
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    200: "#A7F3D0",
    300: "#6EE7B7",
    400: "#34D399",
    500: "#10B981", // Main success color
    600: "#059669",
    700: "#047857",
    800: "#065F46",
    900: "#064E3B",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444", // Main error color
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B", // Main warning color
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6", // Main info color
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  /**
   * Background Colors
   * Used for page backgrounds and surfaces
   */
  background: {
    primary: "#FFFFFF",
    secondary: "#FAFAFA",
    tertiary: "#F5F5F5",
    dark: "#0A0A0A",
    darkSecondary: "#1A1A1A",
    overlay: "rgba(0, 0, 0, 0.7)",
    overlayLight: "rgba(0, 0, 0, 0.4)",
    card: "#FFFFFF",
    gradient: {
      purple: ["#A855F7", "#EC4899"],
      dark: ["#1A1A1A", "#0A0A0A"],
      vibrant: ["#A855F7", "#EC4899", "#06B6D4"],
    },
  },

  /**
   * Text Colors
   * Used for typography hierarchy
   */
  text: {
    primary: "#0A0A0A",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    disabled: "#D1D5DB",
    inverse: "#FFFFFF",
    link: "#A855F7",
    error: "#EF4444",
    success: "#10B981",
    accent: "#EC4899",
  },

  /**
   * Border Colors
   * Used for dividers, outlines, and boundaries
   */
  border: {
    default: "#E5E7EB",
    light: "#F3F4F6",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
    focus: "#A855F7",
    error: "#EF4444",
  },

  /**
   * Button Colors
   * Specific colors for button states
   */
  button: {
    primaryBackground: "#A855F7",
    primaryText: "#FFFFFF",
    primaryPressed: "#9333EA",
    primaryDisabled: "#E9D5FF",
    
    secondaryBackground: "#EC4899",
    secondaryText: "#FFFFFF",
    secondaryPressed: "#DB2777",
    secondaryDisabled: "#FBCFE8",
    
    outlineBackground: "transparent",
    outlineText: "#A855F7",
    outlineBorder: "#A855F7",
    outlinePressed: "#FAF5FF",
    
    ghostBackground: "transparent",
    ghostText: "#6B7280",
    ghostPressed: "#F5F5F5",
    
    destructiveBackground: "#EF4444",
    destructiveText: "#FFFFFF",
    destructivePressed: "#DC2626",
  },
} as const

export type Colors = typeof colors

