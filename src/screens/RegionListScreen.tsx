import { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RegionCard } from "../components/RegionCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { useRegions } from "../hooks/useRegions";
import { AppStackParamList } from "../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RegionCardData } from "../types/region";
import { useThemeMode } from "../theme/ThemeContext";

export function RegionListScreen() {
  const { theme } = useThemeMode();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const { regions, loading, errorMessage, refreshRegions } = useRegions();

  const handleOpenDetails = useCallback((region: RegionCardData) => {
    navigation.navigate("Detalhes da Região", { region });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      void refreshRegions();
    }, [refreshRegions]),
  );

  const content = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.centerStateText, { color: theme.colors.textMuted }]}>Carregando regiões monitoradas...</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={regions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <RegionCard region={item} onPress={handleOpenDetails} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => void refreshRegions()} />}
        ListHeaderComponent={
          errorMessage ? (
            <View style={[styles.banner, { backgroundColor: theme.colors.surfaceMuted, borderColor: theme.colors.border }]}>
              <Text style={[styles.bannerText, { color: theme.colors.text }]}>{errorMessage}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateTitle, { color: theme.colors.text }]}>Nenhuma região cadastrada</Text>
            <Text style={[styles.emptyStateText, { color: theme.colors.textMuted }]}>
              A lista fica vazia quando não há registros na API.
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [errorMessage, handleOpenDetails, loading, regions, refreshRegions]);

  return (
    <ScreenContainer
      title="Lista de Regiões"
      description="As regiões cadastradas e seus indicadores serão exibidos aqui."
    >
      {content}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 8,
  },
  separator: {
    height: 12,
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
  banner: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  bannerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 36,
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});