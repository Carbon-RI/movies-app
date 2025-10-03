// app/(top-tabs)/movies.tsx

import React from "react";

import MediaListScreen from "@/components/screens/MediaListScreen";
import { MOVIE_ENDPOINTS } from "@/constants/apiConfig";

const MOVIE_OPTIONS = [
  {
    label: "Now Playing",
    value: MOVIE_ENDPOINTS.nowPlaying,
    display: "now_playing",
  },
  { label: "Popular", value: MOVIE_ENDPOINTS.popular, display: "popular" },
  { label: "Top Rated", value: MOVIE_ENDPOINTS.topRated, display: "top_rated" },
  { label: "Upcoming", value: MOVIE_ENDPOINTS.upcoming, display: "upcoming" },
];

export default function MoviesScreen() {
  return <MediaListScreen options={MOVIE_OPTIONS} mediaType="Movies" />;
}
