import { StyleSheet, Text, View } from "react-native";

import { useThemeMode } from "../theme/ThemeContext";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  accentColor?: string;
};

export function MetricCard({ label, value, detail, accentColor = "#00A8E8" }: MetricCardProps) {
  const { theme } = useThemeMode();

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: accentColor }]}> 
      <Text style={[styles.label, { color: theme.colors.textMuted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
      {detail ? <Text style={[styles.detail, { color: theme.colors.textMuted }]}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    fontSize: 28,
    fontWeight: "800",
  },
  detail: {
    fontSize: 14,
    lineHeight: 20,
  },
});