// hooks/use-fetch-media.ts

import { useState, useEffect } from "react";
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv" | "person";
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetchMedia = <T = MediaItem[]>(
  endpoint: string,
  query?: string
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!TMDB_API_KEY) {
      setError("API Key is missing. Check your .env and app.config.js.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;

    if (query) {
      url += `&query=${encodeURIComponent(query)}`;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const dataToSet = (response.data.results as T) || (response.data as T);

        setData(dataToSet);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred.");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, query]);

  return { data, loading, error } as FetchState<T>;
};
