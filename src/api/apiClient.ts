import { AxiosRequestConfig, create, isAxiosError } from "axios";
import { Platform } from "react-native";

import { API_BASE_URL } from "../constants/api";

const LOCAL_FALLBACK_BASE_URLS =
  Platform.OS === "android"
    ? ["http://10.0.2.2:5129/api", "http://10.0.2.2:8080/api"]
    : ["http://localhost:5129/api", "http://localhost:8080/api"];

function getCandidateBaseUrls() {
  const candidateBaseUrls = [API_BASE_URL, ...LOCAL_FALLBACK_BASE_URLS];

  return candidateBaseUrls.filter((baseUrl, index) => candidateBaseUrls.indexOf(baseUrl) === index);
}

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function requestWithFallback<T>(config: AxiosRequestConfig) {
  const baseUrls = getCandidateBaseUrls();
  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const response = await apiClient.request<T>({
        ...config,
        baseURL: baseUrl,
      });

      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export function getApiErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.title ??
      error.message ??
      "Não foi possível se conectar à API."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}