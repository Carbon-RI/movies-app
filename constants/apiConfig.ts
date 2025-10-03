// constants/apiConfig.ts

import Constants from "expo-constants";

interface Extra {
  tmdbApiKey: string;
}

const expoConfig = Constants.expoConfig;
const TMDB_API_KEY = (expoConfig?.extra as Extra)?.tmdbApiKey || "";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";
const MOVIE_ENDPOINTS = {
  nowPlaying: "/movie/now_playing",
  popular: "/movie/popular",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};
const TV_ENDPOINTS = {
  airingToday: "/tv/airing_today",
  onTheAir: "/tv/on_the_air",
  popular: "/tv/popular",
  topRated: "/tv/top_rated",
};
const SEARCH_ENDPOINTS = {
  movie: "/search/movie",
  multi: "/search/multi",
  tv: "/search/tv",
};

export {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_IMAGE_BASE_URL,
  POSTER_SIZE,
  MOVIE_ENDPOINTS,
  TV_ENDPOINTS,
  SEARCH_ENDPOINTS,
};
