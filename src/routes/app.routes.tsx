import { useMemo } from "react";
import { DefaultTheme, NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DashboardScreen } from "../screens/DashboardScreen";
import { RegionDetailsScreen } from "../screens/RegionDetailsScreen";
import { RegionFormScreen } from "../screens/RegionFormScreen";
import { RegionListScreen } from "../screens/RegionListScreen";
import { RegionEditScreen } from "../screens/RegionEditScreen";
import { ProjectPresentationScreen } from "../screens/ProjectPresentationScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import { RegionCardData } from "../types/region";
import { useThemeMode } from "../theme/ThemeContext";

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<AppTabsParamList> | undefined;
  "Detalhes da Região": { region: RegionCardData };
  "Editar Região": { regionId: number; region?: RegionCardData };
};

export type AppTabsParamList = {
  Dashboard: undefined;
  "Regiões": undefined;
  Cadastro: undefined;
  "Apresentação": undefined;
  "Configurações": undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();
const Tabs = createBottomTabNavigator<AppTabsParamList>();

function AppTabs() {
  const { theme } = useThemeMode();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
      }}
    >
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
      <Tabs.Screen name="Regiões" component={RegionListScreen} />
      <Tabs.Screen name="Cadastro" component={RegionFormScreen} />
      <Tabs.Screen name="Apresentação" component={ProjectPresentationScreen} />
      <Tabs.Screen name="Configurações" component={SettingsScreen} />
    </Tabs.Navigator>
  );
}

export function AppRoutes() {
  const { theme } = useThemeMode();

  const navigationTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: theme.colors.background,
        card: theme.colors.surface,
        primary: theme.colors.primary,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.success,
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.surface },
          headerTintColor: theme.colors.text,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detalhes da Região" component={RegionDetailsScreen} />
        <Stack.Screen name="Editar Região" component={RegionEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}