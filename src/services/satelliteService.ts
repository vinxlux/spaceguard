import { getApiErrorMessage, requestWithFallback } from "../api/apiClient";
import { AlertaAmbiental, IndicadorAmbiental, RegionInput, Satelite } from "../types/satellite";

const satellitePath = "/Satelites";
const indicatorsPath = "/Indicadores";
const alertsPath = "/Alertas";

async function request<T>(config: Parameters<typeof requestWithFallback<T>>[0]) {
  try {
    return await requestWithFallback<T>(config);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function getAllRegions() {
  return request<Satelite[]>({ method: "get", url: satellitePath });
}

export async function getRegionById(id: number) {
  return request<Satelite>({ method: "get", url: `${satellitePath}/${id}` });
}

export async function createRegion(region: RegionInput) {
  return request<void>({ method: "post", url: satellitePath, data: region });
}

export async function updateRegion(region: RegionInput) {
  return request<void>({ method: "put", url: satellitePath, data: region });
}

export async function deleteRegion(id: number) {
  return request<void>({ method: "delete", url: `${satellitePath}/${id}` });
}

export async function getAllIndicators() {
  return request<IndicadorAmbiental[]>({ method: "get", url: indicatorsPath });
}

export async function getAllAlerts() {
  return request<AlertaAmbiental[]>({ method: "get", url: alertsPath });
}