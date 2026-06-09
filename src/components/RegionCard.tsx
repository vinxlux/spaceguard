import { Pressable, StyleSheet, Text, View } from "react-native";

import { RegionCardData } from "../types/region";

type RegionCardProps = {
  region: RegionCardData;
  onPress?: (region: RegionCardData) => void;
};

export function RegionCard({ region, onPress }: RegionCardProps) {
  const statusColor =
    region.status === "Crítico" ? "#F44336" : region.status === "Atenção" ? "#FFB300" : "#4CAF50";

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress?.(region)}
    >
      <View style={styles.row}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{region.nome}</Text>
          <Text style={styles.subtitle}>{region.paisOrigem}</Text>
        </View>

        <View style={[styles.badge, { borderColor: statusColor }]}>
          <Text style={[styles.badgeText, { color: statusColor }]}>{region.status}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>Temperatura estimada</Text>
          <Text style={styles.temperature}>{region.temperatura}°C</Text>
        </View>

        <View style={styles.metaBlock}>
          <Text style={styles.label}>Origem</Text>
          <Text style={styles.metaValue}>{region.origem === "api" ? "API .NET" : "Modo demo"}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(20, 40, 80, 0.9)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
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
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  temperature: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    marginTop: 4,
  },
  metaBlock: {
    alignItems: "flex-end",
  },
  metaValue: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4,
  },
});