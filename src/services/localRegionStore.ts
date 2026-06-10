import AsyncStorage from "@react-native-async-storage/async-storage";

import { RegionInput, Satelite } from "../types/satellite";

const STORAGE_KEY = "@spaceguard/local-regions";

function createSeedRegions() {
  return [] as Satelite[];
}

let regions: Satelite[] = createSeedRegions();
let isHydrated = false;

async function persistRegions(nextRegions: Satelite[]) {
  regions = nextRegions;
  isHydrated = true;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(regions));
}

async function hydrateRegions() {
  if (isHydrated) {
    return regions;
  }

  const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    await persistRegions(regions);
    return regions;
  }

  try {
    const parsed = JSON.parse(storedValue) as Satelite[];

    if (Array.isArray(parsed)) {
      regions = parsed;
    }
  } catch {
    regions = createSeedRegions();
  }

  isHydrated = true;
  return regions;
}

function nextRegionId() {
  return regions.reduce((maxId, region) => Math.max(maxId, region.id), 0) + 1;
}

export async function getLocalRegions() {
  return hydrateRegions();
}

export async function getLocalRegionById(id: number) {
  const currentRegions = await hydrateRegions();

  return currentRegions.find((region) => region.id === id);
}

export async function createLocalRegion(region: RegionInput) {
  await hydrateRegions();

  const createdRegion: Satelite = {
    id: region.id ?? nextRegionId(),
    nome: region.nome,
    paisOrigem: region.paisOrigem,
    dataLancamento: region.dataLancamento,
  };

  await persistRegions([...regions.filter((currentRegion) => currentRegion.id !== createdRegion.id), createdRegion]);

  return createdRegion;
}

export async function updateLocalRegion(region: RegionInput) {
  await hydrateRegions();

  if (region.id == null) {
    throw new Error("O identificador da região é obrigatório para atualização local.");
  }

  const updatedRegion: Satelite = {
    id: region.id,
    nome: region.nome,
    paisOrigem: region.paisOrigem,
    dataLancamento: region.dataLancamento,
  };

  await persistRegions(
    regions.map((currentRegion) => (currentRegion.id === region.id ? updatedRegion : currentRegion)),
  );

  return updatedRegion;
}

export async function deleteLocalRegion(id: number) {
  await hydrateRegions();

  await persistRegions(regions.filter((region) => region.id !== id));
}

export async function syncLocalRegions(nextRegions: Satelite[]) {
  await persistRegions(nextRegions);
}