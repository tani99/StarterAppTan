const palette = {
  // Modern primary color scale (50-900)
  primary50: "#FEF7F0",
  primary100: "#FEEBD7",
  primary200: "#FDD4AE",
  primary300: "#FCB885",
  primary400: "#FA9C5C",
  primary500: "#F88033", // Main brand color
  primary600: "#E66B1A",
  primary700: "#D4560A",
  primary800: "#C24100",
  primary900: "#B02C00",

  // Enhanced neutral color scale (50-900)
  neutral50: "#FAFAFA",
  neutral100: "#F5F5F5",
  neutral150: "#EEEEEE",
  neutral200: "#E0E0E0",
  neutral250: "#D4D4D4",
  neutral300: "#BDBDBD",
  neutral400: "#9E9E9E",
  neutral500: "#757575",
  neutral600: "#616161",
  neutral700: "#424242",
  neutral800: "#212121",
  neutral850: "#1A1A1A",
  neutral900: "#0F0F0F",

  // Success colors
  success50: "#F0FDF4",
  success100: "#DCFCE7",
  success500: "#22C55E",
  success600: "#16A34A",
  success700: "#15803D",

  // Warning colors
  warning50: "#FFFBEB",
  warning100: "#FEF3C7",
  warning500: "#F59E0B",
  warning600: "#D97706",
  warning700: "#B45309",

  // Info colors
  info50: "#EFF6FF",
  info100: "#DBEAFE",
  info500: "#3B82F6",
  info600: "#2563EB",
  info700: "#1D4ED8",

  // Keep existing secondary colors for backward compatibility
  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",

  // Keep existing accent colors for backward compatibility
  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  // Keep existing angry colors for backward compatibility
  angry100: "#F2D6CD",
  angry500: "#C03403",

  // Keep existing overlay colors
  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral100,
  /**
   * The default border color.
   */
  border: palette.neutral300,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral400,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral200,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
} as const
