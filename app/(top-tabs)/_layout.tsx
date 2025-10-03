// app/(top-tabs)/_layout.tsx

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";

import MoviesScreen from "./movies";
import SearchScreen from "./search";
import TVShowsScreen from "./tvshows";

const Tab = createMaterialTopTabNavigator();
const DEEP_NAVY = "#002E4E";

export default function TopTabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="movies"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
        },
        tabBarIndicatorStyle: {
          backgroundColor: DEEP_NAVY,
          height: 3,
        },
        tabBarActiveTintColor: DEEP_NAVY,
        tabBarInactiveTintColor: "#AAAAAA",

        tabBarLabelStyle: {
          fontWeight: "bold",
        },
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
        options={{ title: "Search Results" }}
      />
      <Tab.Screen
        name="tvshows"
        component={TVShowsScreen}
        options={{ title: "TV Shows" }}
      />
    </Tab.Navigator>
  );
}
