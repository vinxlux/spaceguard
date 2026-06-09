import { ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";

const settingsItems = [
  {
    label: "Aplicativo",
    value: "SpaceGuard Mobile",
    detail: "Monitoramento climático com satélites e dados da API .NET.",
  },
  {
    label: "Tecnologia",
    value: "Expo + React Navigation",
    detail: "Baseado em TypeScript, Axios e componentes reutilizáveis.",
  },
  {
    label: "Tema",
    value: "Espaço e monitoramento",
    detail: "Paleta escura com destaque para azul, verde e vermelho.",
  },
  {
    label: "Dados",
    value: "API .NET + modo demo",
    detail: "A aplicação usa dados reais quando disponíveis e simulação quando necessário.",
  },
];

export function SettingsScreen() {
  return (
    <ScreenContainer title="Configurações" description="Informações do aplicativo e ajustes gerais.">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o app</Text>
          <Text style={styles.sectionText}>
            O SpaceGuard foi pensado como uma plataforma de monitoramento de temperatura com foco em
            leitura clara, navegação simples e integração direta com a API existente do backend.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          {settingsItems.map((item) => (
            <View key={item.label} style={styles.card}>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>{item.value}</Text>
              <Text style={styles.cardDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status da experiência</Text>
          <Text style={styles.sectionText}>
            A interface está organizada em páginas separadas para resumo, listagem, cadastro,
            apresentação e configurações, mantendo o mínimo exigido e um fluxo coerente para a banca.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 8,
  },
  section: {
    gap: 10,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(20, 40, 80, 0.72)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionText: {
    color: "rgba(255, 255, 255, 0.78)",
    fontSize: 14,
    lineHeight: 21,
  },
  cardsGrid: {
    gap: 12,
  },
  card: {
    gap: 6,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(20, 40, 80, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  cardLabel: {
    color: "rgba(255, 255, 255, 0.62)",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  cardValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  cardDetail: {
    color: "rgba(255, 255, 255, 0.74)",
    fontSize: 14,
    lineHeight: 20,
  },
});