import Constants from "expo-constants";
import { NativeModules, Platform } from "react-native";

declare const process: {
  env?: {
    EXPO_PUBLIC_API_BASE_URL?: string;
  };
};

const DEFAULT_ANDROID_BASE_URL = "http://10.0.2.2:5129/api";
const DEFAULT_IOS_BASE_URL = "http://localhost:5129/api";
const DEFAULT_WEB_BASE_URL = "http://localhost:5129/api";

function getMetroHost() {
  const expoConstants = Constants as typeof Constants & {
    expoConfig?: { hostUri?: string };
    manifest?: { debuggerHost?: string; hostUri?: string };
    manifest2?: { extra?: { expoGo?: { debuggerHost?: string; hostUri?: string } } };
  };

  const expoHostUri =
    expoConstants.expoConfig?.hostUri ??
    expoConstants.manifest?.hostUri ??
    expoConstants.manifest?.debuggerHost ??
    expoConstants.manifest2?.extra?.expoGo?.hostUri ??
    expoConstants.manifest2?.extra?.expoGo?.debuggerHost;

  if (expoHostUri) {
    const hostMatch = expoHostUri.match(/^([^:/]+)(?::\d+)?$/);

    if (hostMatch?.[1]) {
      return hostMatch[1];
    }
  }

  const scriptUrl = NativeModules.SourceCode?.scriptURL as string | undefined;

  if (!scriptUrl) {
    return null;
  }

  const match = scriptUrl.match(/^https?:\/\/([^:/]+)(?::\d+)?\//);

  return match?.[1] ?? null;
}

function getAndroidBaseUrl() {
  const metroHost = getMetroHost();

  if (metroHost && metroHost !== "localhost" && metroHost !== "127.0.0.1") {
    return `http://${metroHost}:5129/api`;
  }

  return DEFAULT_ANDROID_BASE_URL;
}

export const API_BASE_URL =
  process.env?.EXPO_PUBLIC_API_BASE_URL ??
  (Platform.OS === "android"
    ? getAndroidBaseUrl()
    : Platform.OS === "ios"
      ? DEFAULT_IOS_BASE_URL
      : DEFAULT_WEB_BASE_URL);

export const ANDROID_FALLBACK_BASE_URLS =
  Platform.OS === "android"
    ? [getAndroidBaseUrl(), "http://10.0.2.2:5129/api", "http://10.0.2.2:8080/api"]
    : [];