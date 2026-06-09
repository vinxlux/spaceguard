import { ScrollView, StyleSheet, Text, View } from "react-native";

import { MetricCard } from "../components/MetricCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { useThemeMode } from "../theme/ThemeContext";

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

const technologies = [
  "Expo",
  "React Native",
  "TypeScript",
  "React Navigation",
  "Axios",
  "@expo/metro-runtime",
  "react-native-gesture-handler",
  "react-native-safe-area-context",
  "react-native-screens",
  "react-native-web",
  "ASP.NET Core",
  "C#",
  "Entity Framework Core",
  "PostgreSQL",
  "Docker",
  "Docker Compose",
  "ESLint",
  "Prettier",
];

export function ProjectPresentationScreen() {
  const { theme } = useThemeMode();

  return (
    <ScreenContainer
      title="Apresentação do Projeto"
      description="Resumo do objetivo, tecnologia e valor entregue pelo SpaceGuard."
    >
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
          <Text style={[styles.heroLabel, { color: theme.colors.primary }]}>SpaceGuard Mobile</Text>
          <Text style={[styles.heroTitle, { color: theme.colors.text }]}>Monitoramento climático com aparência profissional.</Text>
          <Text style={[styles.heroText, { color: theme.colors.textMuted }] }>
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
          <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder }]}>
            <Text style={[styles.cardLabel, { color: theme.colors.textMuted }]}>Tecnologias utilizadas</Text>
            <View style={styles.techWrap}>
              {technologies.map((technology) => (
                <View key={technology} style={[styles.techChip, { borderColor: theme.colors.border, backgroundColor: theme.colors.surfaceMuted }]}>
                  <Text style={[styles.techChipText, { color: theme.colors.text }]}>{technology}</Text>
                </View>
              ))}
            </View>
          </View>

          {presentationCards.map((card) => (
            <View key={card.label} style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.colors.textMuted }]}>{card.label}</Text>
              <Text style={[styles.cardValue, { color: theme.colors.text }]}>{card.value}</Text>
              <Text style={[styles.cardDetail, { color: theme.colors.textMuted }]}>{card.detail}</Text>
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
    borderWidth: 1,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
  },
  heroText: {
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
    borderWidth: 1,
  },
  cardLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  cardDetail: {
    fontSize: 14,
    lineHeight: 20,
  },
  techWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 6,
  },
  techChip: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  techChipText: {
    fontSize: 13,
    fontWeight: "700",
  },
});