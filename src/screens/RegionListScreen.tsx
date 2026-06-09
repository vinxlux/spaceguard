import { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RegionCard } from "../components/RegionCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { useRegions } from "../hooks/useRegions";
import { AppStackParamList } from "../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RegionCardData } from "../types/region";

export function RegionListScreen() {
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
          <ActivityIndicator size="large" color="#00A8E8" />
          <Text style={styles.centerStateText}>Carregando regiões monitoradas...</Text>
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
            <View style={styles.banner}>
              <Text style={styles.bannerText}>{errorMessage}</Text>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Nenhuma região cadastrada</Text>
            <Text style={styles.emptyStateText}>
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
    color: "rgba(255, 255, 255, 0.78)",
    fontSize: 15,
  },
  banner: {
    backgroundColor: "rgba(244, 67, 54, 0.14)",
    borderColor: "rgba(244, 67, 54, 0.45)",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  bannerText: {
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  emptyStateText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});