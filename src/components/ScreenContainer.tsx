import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useThemeMode } from "../theme/ThemeContext";

type ScreenContainerProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function ScreenContainer({ title, description, children }: ScreenContainerProps) {
  const { theme } = useThemeMode();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>{description}</Text>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});