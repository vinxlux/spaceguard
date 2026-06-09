import { apiClient, getApiErrorMessage } from "../api/apiClient";
import { AlertaAmbiental, IndicadorAmbiental, RegionInput, Satelite } from "../types/satellite";

const satellitePath = "/Satelites";
const indicatorsPath = "/Indicadores";
const alertsPath = "/Alertas";

async function request<T>(promise: Promise<{ data: T }>) {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function getAllRegions() {
  return request<Satelite[]>(apiClient.get(satellitePath));
}

export async function getRegionById(id: number) {
  return request<Satelite>(apiClient.get(`${satellitePath}/${id}`));
}

export async function createRegion(region: RegionInput) {
  return request<void>(apiClient.post(satellitePath, region));
}

export async function updateRegion(region: RegionInput) {
  return request<void>(apiClient.put(satellitePath, region));
}

export async function deleteRegion(id: number) {
  return request<void>(apiClient.delete(`${satellitePath}/${id}`));
}

export async function getAllIndicators() {
  return request<IndicadorAmbiental[]>(apiClient.get(indicatorsPath));
}

export async function getAllAlerts() {
  return request<AlertaAmbiental[]>(apiClient.get(alertsPath));
}