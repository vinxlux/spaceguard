import { useEffect, useState } from "react";
import { Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FormField } from "../components/FormField";
import { getRegionById, updateRegion } from "../services/satelliteService";
import { AppStackParamList } from "../routes/app.routes";
import { RegionCardData } from "../types/region";
import { useThemeMode } from "../theme/ThemeContext";

export function RegionEditScreen() {
  const { theme } = useThemeMode();
  const route = useRoute<RouteProp<AppStackParamList, "Editar Região">>();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [paisOrigem, setPaisOrigem] = useState("");
  const [dataLancamento, setDataLancamento] = useState("");
  const regionSnapshot = route.params.region;

  useEffect(() => {
    async function loadRegion() {
      if (regionSnapshot) {
        setNome(regionSnapshot.nome);
        setPaisOrigem(regionSnapshot.paisOrigem);
        setDataLancamento(regionSnapshot.dataLancamento.slice(0, 10));
        setLoading(false);
        return;
      }

      try {
        const region = await getRegionById(route.params.regionId);
        setNome(region.nome);
        setPaisOrigem(region.paisOrigem);
        setDataLancamento(region.dataLancamento.slice(0, 10));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível carregar a região.";
        Alert.alert("Falha ao carregar", message);
      } finally {
        setLoading(false);
      }
    }

    void loadRegion();
  }, [regionSnapshot, route.params.regionId]);

  async function handleSubmit() {
    const nomeTrimmed = nome.trim();
    const paisOrigemTrimmed = paisOrigem.trim();

    if (!nomeTrimmed || !paisOrigemTrimmed || !dataLancamento.trim()) {
      setFormError("Preencha todos os campos para atualizar a região.");
      return;
    }

    const launchDate = new Date(dataLancamento);

    if (Number.isNaN(launchDate.getTime())) {
      setFormError("Informe uma data válida no formato AAAA-MM-DD.");
      return;
    }

    setFormError(null);
    setSubmitting(true);

    try {
      await updateRegion({
        id: route.params.regionId,
        nome: nomeTrimmed,
        paisOrigem: paisOrigemTrimmed,
        dataLancamento: launchDate.toISOString(),
      });

      Alert.alert("Sucesso", "Região atualizada com sucesso.");
      if (regionSnapshot) {
        const updatedRegion: RegionCardData = {
          ...regionSnapshot,
          nome: nomeTrimmed,
          paisOrigem: paisOrigemTrimmed,
          dataLancamento: launchDate.toISOString(),
        };

        navigation.replace("Detalhes da Região", { region: updatedRegion });
        return;
      }

      navigation.goBack();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível atualizar a região.";
      Alert.alert("Falha ao salvar", message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.centerState, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.centerStateText, { color: theme.colors.textMuted }]}>Carregando região para edição...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Editar Região</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>Atualize os dados usando a API .NET existente.</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <FormField label="Nome da região" placeholder="Ex.: Região Norte" value={nome} onChangeText={setNome} />

          <FormField label="País de origem" placeholder="Ex.: Brasil" value={paisOrigem} onChangeText={setPaisOrigem} />

          <FormField
            label="Data de lançamento"
            placeholder="AAAA-MM-DD"
            value={dataLancamento}
            onChangeText={setDataLancamento}
            autoCapitalize="none"
          />

          {formError ? <Text style={[styles.formError, { color: theme.colors.danger }]}>{formError}</Text> : null}

          <Pressable style={({ pressed }) => [styles.button, { backgroundColor: theme.colors.primary }, pressed && !submitting && styles.buttonPressed]} onPress={handleSubmit} disabled={submitting}>
            {submitting ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Salvar alterações</Text>}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
  },
  flex: {
    flex: 1,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  form: {
    paddingBottom: 24,
    gap: 16,
  },
  formError: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    minHeight: 54,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  centerState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 32,
  },
  centerStateText: {
    fontSize: 15,
  },
});