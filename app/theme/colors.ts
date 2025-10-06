/**
 * Color Palette for FashionApp
 * 
 * A comprehensive color system following modern design principles
 */

export const colors = {
  /**
   * Primary Brand Colors
   * Used for main CTAs, links, and brand identity
   */
  primary: {
    50: "#E6F2FF",
    100: "#CCE5FF",
    200: "#99CBFF",
    300: "#66B0FF",
    400: "#3396FF",
    500: "#0066CC", // Main primary color
    600: "#0052A3",
    700: "#003D7A",
    800: "#002952",
    900: "#001429",
  },

  /**
   * Secondary Colors
   * Used for accents and complementary elements
   */
  secondary: {
    50: "#FEF7E6",
    100: "#FDEFD0",
    200: "#FBE0A1",
    300: "#F9D072",
    400: "#F7C143",
    500: "#F59E0B", // Main secondary color
    600: "#C47E09",
    700: "#935F07",
    800: "#623F04",
    900: "#312002",
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
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    overlay: "rgba(0, 0, 0, 0.5)",
    overlayLight: "rgba(0, 0, 0, 0.3)",
    card: "#FFFFFF",
  },

  /**
   * Text Colors
   * Used for typography hierarchy
   */
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    disabled: "#D1D5DB",
    inverse: "#FFFFFF",
    link: "#0066CC",
    error: "#EF4444",
    success: "#10B981",
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
    focus: "#0066CC",
    error: "#EF4444",
  },

  /**
   * Button Colors
   * Specific colors for button states
   */
  button: {
    primaryBackground: "#0066CC",
    primaryText: "#FFFFFF",
    primaryPressed: "#0052A3",
    primaryDisabled: "#CCE5FF",
    
    secondaryBackground: "#F3F4F6",
    secondaryText: "#111827",
    secondaryPressed: "#E5E7EB",
    secondaryDisabled: "#F9FAFB",
    
    outlineBackground: "transparent",
    outlineText: "#0066CC",
    outlineBorder: "#0066CC",
    outlinePressed: "#E6F2FF",
    
    ghostBackground: "transparent",
    ghostText: "#6B7280",
    ghostPressed: "#F3F4F6",
    
    destructiveBackground: "#EF4444",
    destructiveText: "#FFFFFF",
    destructivePressed: "#DC2626",
  },
} as const

export type Colors = typeof colors

