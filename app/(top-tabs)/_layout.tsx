// app/(top-tabs)/_layout.tsx (タブバーデザインのみ)

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
// View, Text, StyleSheet のインポートから View, Text を削除し、使用する StyleSheet のみ残す
import { StyleSheet } from "react-native";

import MoviesScreen from "./movies";
import SearchScreen from "./search";
import TVShowsScreen from "./tvshows";

const Tab = createMaterialTopTabNavigator();
const DEEP_NAVY = "#002E4E"; // 濃藍

export default function TopTabsLayout() {
  return (
    // 親のStack Navigatorがヘッダーを処理するため、
    // ここではタブナビゲーターコンポーネントのみを返す
    <Tab.Navigator
      initialRouteName="movies"
      screenOptions={{
        // タブバーの背景色を白
        tabBarStyle: {
          backgroundColor: "white",
        },
        // 選択中のタブの下線（インジケータ）の色を濃藍
        tabBarIndicatorStyle: {
          backgroundColor: DEEP_NAVY,
          height: 3,
        },
        // 選択中の文字色を濃藍
        tabBarActiveTintColor: DEEP_NAVY,
        // 未選択の文字色を薄い灰色
        tabBarInactiveTintColor: "#AAAAAA",

        tabBarLabelStyle: {
          fontWeight: "bold",
        },
        // タップ時のフィードバックを透明に
        tabBarPressColor: "transparent",
      }}
    >
      <Tab.Screen
        name="movies"
        component={MoviesScreen}
        options={{ title: "Movies" }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="tvshows"
        component={TVShowsScreen}
        options={{ title: "TV Shows" }}
      />
    </Tab.Navigator>
  );
}

// 使用しないスタイル定義は削除
const styles = StyleSheet.create({});
