import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { MetricCard } from "../components/MetricCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { useRegions } from "../hooks/useRegions";

export function DashboardScreen() {
  const { regions, errorMessage } = useRegions();

  const metrics = useMemo(() => {
    if (regions.length === 0) {
      return {
        averageTemperature: "--",
        activeRegions: "0",
        sourceState: errorMessage ? "Sem conexão" : "Vazia",
        lastUpdate: "Sem dados",
      };
    }

    const averageTemperature = Math.round(
      regions.reduce((sum, region) => sum + region.temperatura, 0) / regions.length,
    );

    const latestUpdate = regions
      .map((region) => new Date(region.dataLancamento))
      .sort((first, second) => second.getTime() - first.getTime())[0];

    return {
      averageTemperature: `${averageTemperature}°C`,
      activeRegions: String(regions.length),
      sourceState: errorMessage ? "Com aviso" : "API online",
      lastUpdate: latestUpdate.toLocaleDateString("pt-BR"),
    };
  }, [errorMessage, regions]);

  return (
    <ScreenContainer
      title="Dashboard"
      description="Visão geral do monitoramento por satélites e temperatura das regiões."
    >
      <View style={styles.grid}>
        <MetricCard label="Temperatura média" value={metrics.averageTemperature} detail="Dados consolidados das regiões" />
        <MetricCard label="Regiões ativas" value={metrics.activeRegions} detail="Quantidade atual na API" accentColor="#4CAF50" />
      </View>
      <View style={styles.grid}>
        <MetricCard label="Estado da API" value={metrics.sourceState} detail="Conectividade e dados atuais" accentColor="#F44336" />
        <MetricCard label="Última atualização" value={metrics.lastUpdate} detail="Leitura mais recente disponível" />
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