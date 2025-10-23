import { Tabs } from "@/src/components/ui/bottom-tabs";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, View } from "react-native";
import { XStack } from "tamagui";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs renderCustomTabBar={() => <View style={{ width: "90%" }} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: t("bottom_tab_1"),
          tabBarIcon: () => ({ sfSymbol: "checkmark.circle" }),
        }}
      />
      <Tabs.Screen
        name="challenges"
        options={{
          title: t("bottom_tab_2"),
          tabBarIcon: () => ({ sfSymbol: "list.bullet" }),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: t("bottom_tab_4"),
          tabBarIcon: () => ({ sfSymbol: "chart.bar" }),
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: t("bottom_tab_3"),
          tabBarIcon: () => ({ sfSymbol: "chart.line.uptrend.xyaxis" }),
        }}
      />
    </Tabs>
  );
}
