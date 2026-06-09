export type Satelite = {
  id: number;
  nome: string;
  paisOrigem: string;
  dataLancamento: string;
};

export type IndicadorAmbiental = {
  id: number;
  nome: string;
  valor: number;
  dataLeitura: string;
  sateliteId: number;
};

export type AlertaAmbiental = {
  id: number;
  titulo: string;
  descricao: string;
  nivelRisco: string;
  dataCriacao: string;
  sateliteId: number;
};

export type RegionInput = {
  id?: number;
  nome: string;
  paisOrigem: string;
  dataLancamento: string;
};