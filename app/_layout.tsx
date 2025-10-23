import "@/src/start/bootstrap";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import ToastManager from "toastify-react-native";
import { tamaguiConfig } from "../tamagui.config";

import App from "@/src/app";
import { toastConfig } from "@/src/components/ui/toast";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <App />
        </GestureHandlerRootView>
        <StatusBar style="auto" />
        <ToastManager config={toastConfig} />
      </ThemeProvider>
    </TamaguiProvider>
  );
}
