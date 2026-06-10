import { isAxiosError } from "axios";

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

function isConnectionError(error: unknown) {
  return isAxiosError(error) && (!error.response || error.code === "ERR_NETWORK" || error.code === "ECONNABORTED");
}

export async function getAllRegions() {
  try {
    return await requestWithFallback<Satelite[]>({ method: "get", url: satellitePath });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function getRegionById(id: number) {
  try {
    return await requestWithFallback<Satelite>({ method: "get", url: `${satellitePath}/${id}` });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function createRegion(region: RegionInput) {
  try {
    await requestWithFallback<void>({ method: "post", url: satellitePath, data: region });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function updateRegion(region: RegionInput) {
  try {
    await requestWithFallback<void>({ method: "put", url: satellitePath, data: region });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function deleteRegion(id: number) {
  try {
    await requestWithFallback<void>({ method: "delete", url: `${satellitePath}/${id}` });
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export async function getAllIndicators() {
  return request<IndicadorAmbiental[]>({ method: "get", url: indicatorsPath });
}

export async function getAllAlerts() {
  return request<AlertaAmbiental[]>({ method: "get", url: alertsPath });
}