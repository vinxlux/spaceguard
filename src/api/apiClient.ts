import { AxiosRequestConfig, create, isAxiosError } from "axios";
import { Platform } from "react-native";

import { API_BASE_URL, ANDROID_FALLBACK_BASE_URLS } from "../constants/api";

const LOCAL_FALLBACK_BASE_URLS =
  Platform.OS === "android"
    ? ANDROID_FALLBACK_BASE_URLS
    : ["http://localhost:5129/api", "http://localhost:8080/api"];

const PROBE_TIMEOUT_MS = 2000;

let preferredBaseUrl = API_BASE_URL;
let preferredBaseUrlPromise: Promise<string> | null = null;

function getCandidateBaseUrls() {
  const candidateBaseUrls = [preferredBaseUrl, API_BASE_URL, ...LOCAL_FALLBACK_BASE_URLS];

  return candidateBaseUrls.filter((baseUrl, index) => candidateBaseUrls.indexOf(baseUrl) === index);
}

async function probeBaseUrl(baseUrl: string) {
  try {
    await apiClient.request({
      method: "get",
      url: "/Satelites",
      baseURL: baseUrl,
      timeout: PROBE_TIMEOUT_MS,
    });

    return baseUrl;
  } catch {
    return null;
  }
}

async function resolveBaseUrl() {
  if (preferredBaseUrlPromise) {
    return preferredBaseUrlPromise;
  }

  const candidateBaseUrls = getCandidateBaseUrls();

  preferredBaseUrlPromise = Promise.all(candidateBaseUrls.map((baseUrl) => probeBaseUrl(baseUrl))).then((results) => {
    const resolvedBaseUrl = results.find((baseUrl): baseUrl is string => Boolean(baseUrl)) ?? candidateBaseUrls[0];

    preferredBaseUrl = resolvedBaseUrl;
    preferredBaseUrlPromise = null;

    return resolvedBaseUrl;
  });

  return preferredBaseUrlPromise;
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
  const resolvedBaseUrl = await resolveBaseUrl();
  const baseUrls = [resolvedBaseUrl, ...getCandidateBaseUrls().filter((baseUrl) => baseUrl !== resolvedBaseUrl)];
  let lastError: unknown;

  for (const baseUrl of baseUrls) {
    try {
      const response = await apiClient.request<T>({
        ...config,
        baseURL: baseUrl,
      });

      preferredBaseUrl = baseUrl;

      return response.data;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

export function getApiErrorMessage(error: unknown) {
  if (isAxiosError(error)) {
    if (!error.response || error.code === "ERR_NETWORK") {
      return "Não foi possível se conectar à API.";
    }

    return (
      error.response?.data?.message ??
      error.response?.data?.title ??
      "Não foi possível se conectar à API."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}