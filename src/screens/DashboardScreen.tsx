import { StyleSheet, View } from "react-native";

import { MetricCard } from "../components/MetricCard";
import { ScreenContainer } from "../components/ScreenContainer";

export function DashboardScreen() {
  return (
    <ScreenContainer
      title="Dashboard"
      description="Visão geral do monitoramento por satélites e temperatura das regiões."
    >
      <View style={styles.grid}>
        <MetricCard label="Temperatura média" value="26°C" detail="Dados consolidados das regiões" />
        <MetricCard label="Regiões ativas" value="5" detail="Cobertura nacional completa" accentColor="#4CAF50" />
      </View>
      <View style={styles.grid}>
        <MetricCard label="Satélites" value="3" detail="Todos em operação" accentColor="#F44336" />
        <MetricCard label="Última atualização" value="Agora" detail="Leitura mais recente disponível" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12,
  },
});