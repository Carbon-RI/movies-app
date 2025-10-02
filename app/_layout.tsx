// app/_layout.tsx (最終確定版 - ヘッダー修正とStatusBar)

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar"; // expo-status-bar からインポート
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
              backgroundColor: "#002E4E", // ヘッダーの背景色をティールに設定
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      {/* 【修正2】StatusBarのスタイルを 'light' に設定して、文字を白にする */}
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
