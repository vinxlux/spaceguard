import { Pressable, StyleSheet, Text, View } from "react-native";

import { RegionCardData } from "../types/region";
import { useThemeMode } from "../theme/ThemeContext";

type RegionCardProps = {
  region: RegionCardData;
  onPress?: (region: RegionCardData) => void;
};

export function RegionCard({ region, onPress }: RegionCardProps) {
  const { theme } = useThemeMode();
  const statusColor =
    region.status === "Crítico" ? theme.colors.danger : region.status === "Atenção" ? theme.colors.warning : theme.colors.success;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder }, pressed && styles.cardPressed]}
      onPress={() => onPress?.(region)}
    >
      <View style={styles.row}>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: theme.colors.text }]}>{region.nome}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textMuted }]}>{region.paisOrigem}</Text>
        </View>

        <View style={[styles.badge, { borderColor: statusColor }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>{region.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Temperatura estimada</Text>
          <Text style={[styles.temperature, { color: theme.colors.text }]}>{region.temperatura}°C</Text>
        </View>

        <View style={styles.metaBlock}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Origem</Text>
          <Text style={[styles.metaValue, { color: theme.colors.text }]}>{region.origem === "api" ? "API .NET" : "Dados locais"}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    gap: 16,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleBlock: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 14,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  temperature: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  metaBlock: {
    alignItems: "flex-end",
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
});