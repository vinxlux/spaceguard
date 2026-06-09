import { RegionCardData } from "../types/region";

export const demoRegions: RegionCardData[] = [
  {
    id: 101,
    nome: "Região Norte",
    paisOrigem: "Dados simulados",
    dataLancamento: "2024-03-14T00:00:00.000Z",
    temperatura: 29,
    status: "Estável",
    origem: "demo",
  },
  {
    id: 102,
    nome: "Região Sul",
    paisOrigem: "Dados simulados",
    dataLancamento: "2024-03-14T00:00:00.000Z",
    temperatura: 17,
    status: "Estável",
    origem: "demo",
  },
  {
    id: 103,
    nome: "Região Sudeste",
    paisOrigem: "Dados simulados",
    dataLancamento: "2024-03-14T00:00:00.000Z",
    temperatura: 25,
    status: "Estável",
    origem: "demo",
  },
  {
    id: 104,
    nome: "Região Nordeste",
    paisOrigem: "Dados simulados",
    dataLancamento: "2024-03-14T00:00:00.000Z",
    temperatura: 32,
    status: "Crítico",
    origem: "demo",
  },
  {
    id: 105,
    nome: "Região Centro-Oeste",
    paisOrigem: "Dados simulados",
    dataLancamento: "2024-03-14T00:00:00.000Z",
    temperatura: 28,
    status: "Atenção",
    origem: "demo",
  },
];

export const temperaturePalette = [29, 17, 25, 32, 28];