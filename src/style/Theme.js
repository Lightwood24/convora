const colors = {
    // base
    background: "#0d0d0d",
    surface: "#161616",
    surfaceElevated: "#1e1e1e",
  
    // borders
    border: "#1f2937",
    borderMuted: "#2d2d2d",
  
    // text
    textPrimary: "#f5f5f5",
    textSecondary: "#e5e7eb",
    textMuted: "#6b7280",
    placeholder: "#888888",
  
    // inputs
    inputBg: "#1f2937",
    inputBorder: "#374151",
  
    // brand / state
    primary: "#2563eb",      // blue-600
    primaryMuted: "#3b82f6", // blue-500
    success: "#22c55e",
    warning: "#f59e0b",
    danger:  "#ef4444",
  };
  
  const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  };
  
  const radius = {
    sm: 8,
    md: 10,
    lg: 14,
  };
  
  const typography = {
    h1: {
      fontFamily: "Anta",
      fontSize: 20,
      fontWeight: "400",
    },
    small: {
      fontFamily: "Anta",
      fontSize: 12,
    },
    base: {
      fontFamily: "Anta",
      fontSize: 14,
    },
  };
  
  const shadows = {
    card: {
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 6,
    },
  };
  
  export const theme = { colors, spacing, radius, typography, shadows };
  export default theme;