import { StyleSheet, Text, View } from "react-native";

export function RegionFormScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Região</Text>
      <Text style={styles.description}>O formulário de criação será implementado na próxima etapa.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1026",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  description: {
    marginTop: 8,
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 16,
    textAlign: "center",
  },
});