/* eslint-disable import/no-duplicates */

import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppRoutes } from "./src/routes";
import { ThemeProvider, useThemeMode } from "./src/theme/ThemeContext";

function AppShell() {
  const { themeMode } = useThemeMode();

  return (
    <>
      <StatusBar style={themeMode === "dark" ? "light" : "dark"} />
      <AppRoutes />
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
