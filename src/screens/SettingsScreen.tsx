import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";
import { useThemeMode } from "../theme/ThemeContext";

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
  const { theme, themeMode, toggleTheme } = useThemeMode();

  return (
    <ScreenContainer title="Configurações" description="Informações do aplicativo e ajustes gerais.">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.section, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Sobre o app</Text>
          <Text style={[styles.sectionText, { color: theme.colors.textMuted }]}>
            O SpaceGuard foi pensado como uma plataforma de monitoramento de temperatura com foco em
            leitura clara, navegação simples e integração direta com a API existente do backend.
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tema do aplicativo</Text>
          <Text style={[styles.sectionText, { color: theme.colors.textMuted }]}>
            Alterna entre o modo escuro e o modo claro em toda a interface.
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.toggleButton,
              { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
              pressed && styles.toggleButtonPressed,
            ]}
            onPress={toggleTheme}
          >
            <Text style={[styles.toggleButtonLabel, { color: theme.colors.textMuted }]}>Tema atual</Text>
            <Text style={[styles.toggleButtonValue, { color: theme.colors.text }]}>
              {themeMode === "dark" ? "Escuro" : "Claro"}
            </Text>
            <Text style={[styles.toggleButtonAction, { color: theme.colors.primary }]}>Toque para alternar</Text>
          </Pressable>
        </View>

        <View style={styles.cardsGrid}>
          {settingsItems.map((item) => (
            <View key={item.label} style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder }]}>
              <Text style={[styles.cardLabel, { color: theme.colors.textMuted }]}>{item.label}</Text>
              <Text style={[styles.cardValue, { color: theme.colors.text }]}>{item.value}</Text>
              <Text style={[styles.cardDetail, { color: theme.colors.textMuted }]}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Status da experiência</Text>
          <Text style={[styles.sectionText, { color: theme.colors.textMuted }]}>
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
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  sectionText: {
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
  toggleButton: {
    gap: 4,
    marginTop: 4,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  toggleButtonPressed: {
    opacity: 0.88,
  },
  toggleButtonLabel: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  toggleButtonValue: {
    fontSize: 18,
    fontWeight: "800",
  },
  toggleButtonAction: {
    fontSize: 14,
    fontWeight: "700",
  },
});