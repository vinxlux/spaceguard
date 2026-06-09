import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenContainer } from "../components/ScreenContainer";
import { AppStackParamList } from "../routes/app.routes";
import { deleteRegion } from "../services/satelliteService";
import { useThemeMode } from "../theme/ThemeContext";

function formatDate(dateValue: string) {
  return new Date(dateValue).toLocaleDateString("pt-BR");
}

export function RegionDetailsScreen() {
  const { theme } = useThemeMode();
  const route = useRoute<RouteProp<AppStackParamList, "Detalhes da Região">>();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const region = route.params.region;
  const [deleting, setDeleting] = useState(false);

  const dateLabel = useMemo(() => formatDate(region.dataLancamento), [region.dataLancamento]);

  function handleEditPress() {
    navigation.navigate("Editar Região", { regionId: region.id, region });
  }

  function handleDeletePress() {
    void confirmDelete();
  }

  async function confirmDelete() {
    setDeleting(true);

    try {
      await deleteRegion(region.id);
      Alert.alert("Sucesso", "Região excluída com sucesso.");
      navigation.goBack();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível excluir a região.";
      Alert.alert("Falha ao excluir", message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <ScreenContainer title="Detalhes da Região" description="Os dados completos da região e seus indicadores aparecem nesta tela.">
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.cardBorder }]}>
          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Nome</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{region.nome}</Text>

          <Text style={[styles.label, { color: theme.colors.textMuted }]}>País de origem</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{region.paisOrigem}</Text>

          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Data de lançamento</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{dateLabel}</Text>

          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Temperatura estimada</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{region.temperatura}°C</Text>

          <Text style={[styles.label, { color: theme.colors.textMuted }]}>Status</Text>
          <Text style={[styles.value, { color: theme.colors.text }]}>{region.status}</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={handleEditPress}>
            <Text style={styles.primaryButtonText}>Editar região</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={handleDeletePress} disabled={deleting}>
            {deleting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.secondaryButtonText}>Excluir</Text>}
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 8,
  },
  card: {
    gap: 8,
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "#00A8E8",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(244, 67, 54, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});