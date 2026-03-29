import { StyleSheet, Font } from "@react-pdf/renderer";

// Register default fonts for consistency
Font.register({
  family: "Helvetica",
  fonts: [
    { src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf", fontWeight: "normal" },
    { src: "https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf", fontWeight: "bold" },
  ],
});

// Common colors used across templates
export const colors = {
  primary: "#6d28d9",
  primaryLight: "#ede9fe",
  accent: "#f59e0b",
  accentLight: "#fef3c7",
  dark: "#1e293b",
  darkGray: "#334155",
  gray: "#64748b",
  lightGray: "#94a3b8",
  borderGray: "#e2e8f0",
  bgLight: "#f8fafc",
  white: "#ffffff",
  skyBlue: "#38bdf8",
  skyBlueDark: "#0284c7",
  slate600: "#475569",
  slate800: "#1e293b",
};

// Base styles shared across templates
export const baseStyles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: colors.darkGray,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.dark,
    marginBottom: 8,
    textTransform: "uppercase" as const,
    letterSpacing: 1,
  },
  text: {
    fontSize: 9,
    lineHeight: 1.5,
    color: colors.darkGray,
  },
  lightText: {
    fontSize: 8,
    color: colors.gray,
  },
  bullet: {
    fontSize: 9,
    lineHeight: 1.6,
    color: colors.darkGray,
    marginBottom: 2,
    paddingLeft: 10,
  },
  row: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "flex-start" as const,
  },
  section: {
    marginBottom: 14,
  },
  // Prevent splitting inside sections
  keepTogether: {
    // @react-pdf uses `break` style props directly on View
  },
});
