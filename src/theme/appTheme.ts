export type ThemeMode = "dark" | "light";

export type AppTheme = {
  mode: ThemeMode;
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    success: string;
    warning: string;
    danger: string;
    inputBackground: string;
    placeholder: string;
    cardBorder: string;
  };
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#0B1026",
    surface: "rgba(20, 40, 80, 0.9)",
    surfaceMuted: "rgba(20, 40, 80, 0.72)",
    border: "rgba(255, 255, 255, 0.12)",
    text: "#FFFFFF",
    textMuted: "rgba(255, 255, 255, 0.75)",
    primary: "#00A8E8",
    success: "#4CAF50",
    warning: "#FFB300",
    danger: "#F44336",
    inputBackground: "rgba(20, 40, 80, 0.8)",
    placeholder: "rgba(255, 255, 255, 0.45)",
    cardBorder: "rgba(255, 255, 255, 0.1)",
  },
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#F3F7FC",
    surface: "#FFFFFF",
    surfaceMuted: "#EAF1F9",
    border: "rgba(12, 28, 50, 0.12)",
    text: "#102033",
    textMuted: "rgba(16, 32, 51, 0.72)",
    primary: "#0077B6",
    success: "#2E7D32",
    warning: "#C79000",
    danger: "#C62828",
    inputBackground: "#FFFFFF",
    placeholder: "rgba(16, 32, 51, 0.45)",
    cardBorder: "rgba(12, 28, 50, 0.12)",
  },
};
