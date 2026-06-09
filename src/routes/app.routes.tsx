import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
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

export type AppStackParamList = {
  Tabs: undefined;
  "Detalhes da Região": { region: RegionCardData };
  "Editar Região": { regionId: number };
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

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#0B1026",
    card: "#142850",
    primary: "#00A8E8",
    text: "#FFFFFF",
    border: "rgba(255, 255, 255, 0.12)",
    notification: "#4CAF50",
  },
};

function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#142850" },
        headerTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#142850",
          borderTopColor: "rgba(255, 255, 255, 0.12)",
        },
        tabBarActiveTintColor: "#00A8E8",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.65)",
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
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#142850" },
          headerTintColor: "#FFFFFF",
          contentStyle: { backgroundColor: "#0B1026" },
        }}
      >
        <Stack.Screen name="Tabs" component={AppTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detalhes da Região" component={RegionDetailsScreen} />
        <Stack.Screen name="Editar Região" component={RegionEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}