// app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(top-tabs)",
};

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="(top-tabs)"
          options={{
            headerShown: true,
            title: "Movies App",
            headerTransparent: false,
            headerStyle: {
              backgroundColor: "#1f3140",
            },
            headerTintColor: "white",

            contentStyle: {
              backgroundColor: "#ffffff",
            },
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            contentStyle: {
              backgroundColor: "#ffffff",
            },
            headerBackTitle: "Back to List",
          }}
        />
        <Stack.Screen
          name="tv/[id]"
          options={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",

            contentStyle: {
              backgroundColor: "#ffffff",
            },
            headerBackTitle: "Back to List",
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
