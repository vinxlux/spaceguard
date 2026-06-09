import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type ScreenContainerProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function ScreenContainer({ title, description, children }: ScreenContainerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1026",
    padding: 24,
    gap: 24,
  },
  header: {
    gap: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  description: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 16,
    lineHeight: 22,
  },
});