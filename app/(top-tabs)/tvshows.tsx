// app/(top-tabs)/tvshows.tsx

import React from "react";

import MediaListScreen from "@/components/screens/MediaListScreen";
import { TV_ENDPOINTS } from "@/constants/apiConfig";

const TV_OPTIONS = [
  {
    label: "Airing Today",
    value: TV_ENDPOINTS.airingToday,
    display: "Airing Today",
  },
  {
    label: "On The Air",
    value: TV_ENDPOINTS.onTheAir,
    display: "On The Air",
  },
  { label: "Popular", value: TV_ENDPOINTS.popular, display: "Popular" },
  { label: "Top Rated", value: TV_ENDPOINTS.topRated, display: "Top Rated" },
];

export default function TVShowsScreen() {
  return <MediaListScreen options={TV_OPTIONS} mediaType="TV Shows" />;
}
