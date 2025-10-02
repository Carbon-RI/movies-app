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
              backgroundColor: "#002E4E",
            },
            headerTintColor: "white",
          }}
        />
        {/* 【新規】映画詳細画面のルートを追加 (ファイル名: movie/[id].tsx を想定) */}
        <Stack.Screen
          name="movie/[id]" // ファイル名に合わせる
          options={{
            title: "Detail", // 遷移先のヘッダータイトル
            headerStyle: {
              backgroundColor: "#002E4E",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
