import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(top-tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="(top-tabs)"
          options={{
            headerShown: true,
            title: "Movies App",
            headerTransparent: false,
            headerStyle: {
              backgroundColor: "#002E4E",
            },
            headerTintColor: "white",
            // 💡 修正点: コンテンツ領域の背景色を白に設定
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: "Detail",
            headerStyle: {
              backgroundColor: "#002E4E",
            },
            headerTintColor: "white",
            // 💡 修正点: コンテンツ領域の背景色を白に設定
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="tv/[id]"
          options={{
            title: "Detail",
            headerStyle: {
              backgroundColor: "#002E4E",
            },
            headerTintColor: "white",
            // 💡 修正点: コンテンツ領域の背景色を白に設定
            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
