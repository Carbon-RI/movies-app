// app/(top-tabs)/_layout.tsx

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

// 画面コンポーネントをインポート
import MoviesScreen from "./movies";
import SearchScreen from "./search";
import TVShowsScreen from "./tvshows";

const Tab = createMaterialTopTabNavigator();

export default function TopTabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="movies"
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: "white" },
        tabBarLabelStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "teal" },
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
