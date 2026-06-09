import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MetricCard } from "../components/MetricCard";
import { ScreenContainer } from "../components/ScreenContainer";

const presentationCards = [
  {
    label: "Propósito",
    value: "Monitorar",
    detail: "Plataforma para visualizar temperaturas e status de regiões com apoio de satélites.",
  },
  {
    label: "Cobertura",
    value: "5 telas+",
    detail: "Dashboard, lista, cadastro, apresentação, configurações e detalhes da região.",
  },
  {
    label: "Integração",
    value: "API .NET",
    detail: "Consumindo os endpoints existentes sem inventar uma nova camada de backend.",
  },
  {
    label: "Experiência",
    value: "Nativa",
    detail: "Interface escura, objetiva e organizada para parecer um produto real.",
  },
];

export function ProjectPresentationScreen() {
  return (
    <ScreenContainer
      title="Apresentação do Projeto"
      description="Resumo do objetivo, tecnologia e valor entregue pelo SpaceGuard."
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>SpaceGuard Mobile</Text>
          <Text style={styles.heroTitle}>Monitoramento climático com aparência profissional.</Text>
          <Text style={styles.heroText}>
            O aplicativo conecta dados de satélites, regiões e alertas em uma navegação simples,
            mostrando leitura de temperatura, cadastro, listagem e contexto do projeto em uma única
            experiência.
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard label="Telas principais" value="5+" detail="Fluxo mínimo atendido com navegação fluida." />
          <MetricCard label="API" value=".NET" detail="CRUD baseado na estrutura já existente no backend." accentColor="#4CAF50" />
        </View>

        <View style={styles.grid}>
          <MetricCard label="Tema" value="Espaço" detail="Paleta azul escura com contrastes fortes e claros." accentColor="#00A8E8" />
          <MetricCard label="Feedback" value="Completo" detail="Loading, erros e alertas pensados para a operação." accentColor="#F44336" />
        </View>

        <View style={styles.cardsList}>
          {presentationCards.map((card) => (
            <View key={card.label} style={styles.card}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
              <Text style={styles.cardDetail}>{card.detail}</Text>
            </View>
          ))}
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
  hero: {
    gap: 10,
    padding: 18,
    borderRadius: 24,
    backgroundColor: "rgba(20, 40, 80, 0.9)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  heroLabel: {
    color: "#00A8E8",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
  },
  heroText: {
    color: "rgba(255, 255, 255, 0.78)",
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    gap: 12,
  },
  cardsList: {
    gap: 12,
  },
  card: {
    gap: 6,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "rgba(20, 40, 80, 0.88)",
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