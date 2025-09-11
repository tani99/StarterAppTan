const palette = {
  // Dark mode primary color scale (50-900)
  primary50: "#2D1B0F",
  primary100: "#3D2415", 
  primary200: "#4D2D1B",
  primary300: "#5D3621",
  primary400: "#6D3F27",
  primary500: "#7D482D", // Main brand color for dark mode
  primary600: "#8D5133",
  primary700: "#9D5A39",
  primary800: "#AD633F",
  primary900: "#BD6C45",
  
  // Dark mode neutral color scale (50-900)
  neutral50: "#0F0F0F",
  neutral100: "#1A1A1A",
  neutral150: "#212121",
  neutral200: "#2A2A2A",
  neutral250: "#333333",
  neutral300: "#3C3C3C",
  neutral400: "#4A4A4A",
  neutral500: "#5A5A5A",
  neutral600: "#6A6A6A",
  neutral700: "#7A7A7A",
  neutral800: "#8A8A8A",
  neutral850: "#9A9A9A",
  neutral900: "#FFFFFF",
  
  // Success colors for dark mode
  success50: "#0D2B0F",
  success100: "#1A3D1E",
  success500: "#2D5A33",
  success600: "#3A6B40",
  success700: "#477C4D",
  
  // Warning colors for dark mode
  warning50: "#2B1F0D",
  warning100: "#3D2F1A",
  warning500: "#5A4A2D",
  warning600: "#6B5A3A",
  warning700: "#7C6A47",
  
  // Info colors for dark mode
  info50: "#0D1A2B",
  info100: "#1A2D3D",
  info500: "#2D4A5A",
  info600: "#3A5A6B",
  info700: "#476A7C",

  // Keep existing secondary colors for backward compatibility
  secondary100: "#41476E",
  secondary200: "#626894",
  secondary300: "#9196B9",
  secondary400: "#BCC0D6",
  secondary500: "#DCDDE9",

  // Keep existing accent colors for backward compatibility
  accent100: "#FFBB50",
  accent200: "#FBC878",
  accent300: "#FDD495",
  accent400: "#FFE1B2",
  accent500: "#FFEED4",

  // Keep existing angry colors for backward compatibility
  angry100: "#F2D6CD",
  angry500: "#C03403",

  // Keep existing overlay colors
  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral900,
  textDim: palette.neutral600,
  background: palette.neutral100,
  border: palette.neutral300,
  tint: palette.primary500,
  tintInactive: palette.neutral400,
  separator: palette.neutral200,
  error: palette.angry500,
  errorBackground: palette.angry100,
} as const
