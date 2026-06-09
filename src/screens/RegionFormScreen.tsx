import { useState } from "react";
import { Alert, ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { FormField } from "../components/FormField";
import { createRegion } from "../services/satelliteService";
import { AppStackParamList } from "../routes/app.routes";
import { useThemeMode } from "../theme/ThemeContext";

export function RegionFormScreen() {
  const { theme } = useThemeMode();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [nome, setNome] = useState("");
  const [paisOrigem, setPaisOrigem] = useState("");
  const [dataLancamento, setDataLancamento] = useState(new Date().toISOString().slice(0, 10));
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit() {
    const nomeTrimmed = nome.trim();
    const paisOrigemTrimmed = paisOrigem.trim();

    if (!nomeTrimmed || !paisOrigemTrimmed || !dataLancamento.trim()) {
      setFormError("Preencha todos os campos para cadastrar a região.");
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
      await createRegion({
        nome: nomeTrimmed,
        paisOrigem: paisOrigemTrimmed,
        dataLancamento: launchDate.toISOString(),
      });

      Alert.alert("Sucesso", "Região cadastrada com sucesso.");
      setNome("");
      setPaisOrigem("");
      setDataLancamento(new Date().toISOString().slice(0, 10));
      navigation.navigate("Regiões" as never);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível cadastrar a região.";
      Alert.alert("Falha ao salvar", message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Cadastro de Região</Text>
        <Text style={[styles.description, { color: theme.colors.textMuted }]}>Crie um novo registro usando a API .NET existente.</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <FormField
            label="Nome da região"
            placeholder="Ex.: Região Norte"
            value={nome}
            onChangeText={setNome}
          />

          <FormField
            label="País de origem"
            placeholder="Ex.: Brasil"
            value={paisOrigem}
            onChangeText={setPaisOrigem}
          />

          <FormField
            label="Data de lançamento"
            placeholder="AAAA-MM-DD"
            value={dataLancamento}
            onChangeText={setDataLancamento}
            autoCapitalize="none"
          />

          {formError ? <Text style={[styles.formError, { color: theme.colors.danger }]}>{formError}</Text> : null}

          <Pressable
            style={({ pressed }) => [styles.button, { backgroundColor: theme.colors.primary }, pressed && !submitting && styles.buttonPressed]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color={theme.colors.text} />
            ) : (
              <Text style={[styles.buttonText, { color: theme.colors.text }]}>Salvar região</Text>
            )}
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
});