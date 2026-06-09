import { StyleSheet, Text, View } from "react-native";

type MetricCardProps = {
  label: string;
  value: string;
  detail?: string;
  accentColor?: string;
};

export function MetricCard({ label, value, detail, accentColor = "#00A8E8" }: MetricCardProps) {
  return (
    <View style={[styles.card, { borderColor: accentColor }]}> 
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "rgba(20, 40, 80, 0.9)",
    padding: 16,
    gap: 8,
  },
  label: {
    color: "rgba(255, 255, 255, 0.72)",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  detail: {
    color: "rgba(255, 255, 255, 0.78)",
    fontSize: 14,
    lineHeight: 20,
  },
});