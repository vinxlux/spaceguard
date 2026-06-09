import { Platform } from "react-native";

const DEFAULT_ANDROID_BASE_URL = "http://10.0.2.2:8080/api";
const DEFAULT_IOS_BASE_URL = "http://localhost:8080/api";
const DEFAULT_WEB_BASE_URL = "http://localhost:8080/api";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  (Platform.OS === "android"
    ? DEFAULT_ANDROID_BASE_URL
    : Platform.OS === "ios"
      ? DEFAULT_IOS_BASE_URL
      : DEFAULT_WEB_BASE_URL);