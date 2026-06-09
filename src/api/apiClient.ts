import { create, isAxiosError } from "axios";

import { API_BASE_URL } from "../constants/api";

export const apiClient = create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

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