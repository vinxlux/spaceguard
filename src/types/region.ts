export type RegionCardData = {
  id: number;
  nome: string;
  paisOrigem: string;
  dataLancamento: string;
  temperatura: number;
  status: "Estável" | "Atenção" | "Crítico";
  origem: "api" | "demo";
};