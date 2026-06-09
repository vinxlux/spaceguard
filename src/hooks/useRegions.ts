import { useCallback, useEffect, useState } from "react";

import { getAllRegions } from "../services/satelliteService";
import { RegionCardData } from "../types/region";
import { Satelite } from "../types/satellite";
import { demoRegions, temperaturePalette } from "../constants/demoRegions";

type UseRegionsResult = {
  regions: RegionCardData[];
  loading: boolean;
  errorMessage: string | null;
  refreshRegions: () => Promise<void>;
};

function mapApiRegionsToCards(regions: Satelite[]): RegionCardData[] {
  return regions.map((region, index) => {
    const temperatura = temperaturePalette[index % temperaturePalette.length];

    return {
      id: region.id,
      nome: region.nome,
      paisOrigem: region.paisOrigem,
      dataLancamento: region.dataLancamento,
      temperatura,
      status: temperatura >= 32 ? "Crítico" : temperatura >= 28 ? "Atenção" : "Estável",
      origem: "api",
    };
  });
}

export function useRegions(): UseRegionsResult {
  const [regions, setRegions] = useState<RegionCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const refreshRegions = useCallback(async () => {
    setLoading(true);

    try {
      const apiRegions = await getAllRegions();

      if (apiRegions.length === 0) {
        setRegions(demoRegions);
        setErrorMessage("A API não retornou regiões. Exibindo dados simulados.");
        return;
      }

      setRegions(mapApiRegionsToCards(apiRegions));
      setErrorMessage(null);
    } catch (error) {
      setRegions(demoRegions);
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar as regiões.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshRegions();
  }, [refreshRegions]);

  return {
    regions,
    loading,
    errorMessage,
    refreshRegions,
  };
}