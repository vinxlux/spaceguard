import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { AppTheme, darkTheme, lightTheme, ThemeMode } from "./appTheme";

type ThemeContextValue = {
  themeMode: ThemeMode;
  theme: AppTheme;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>("dark");

  const value = useMemo<ThemeContextValue>(() => {
    const theme = themeMode === "dark" ? darkTheme : lightTheme;

    return {
      themeMode,
      theme,
      toggleTheme: () => setThemeModeState((current) => (current === "dark" ? "light" : "dark")),
      setThemeMode: (mode: ThemeMode) => setThemeModeState(mode),
    };
  }, [themeMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }

  return value;
}
