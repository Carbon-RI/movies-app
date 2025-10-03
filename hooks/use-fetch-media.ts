// hooks/use-fetch-media.ts

import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";
import axios from "axios";
import { useEffect, useState } from "react";

export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  popularity: number;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv" | "person";
}

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetchMedia = <T = MediaItem[]>(
  endpoint: string
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!TMDB_API_KEY) {
      setError(
        new Error("API Key is missing. Check your .env and app.config.js.")
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    let url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const dataToSet = response.data.results as T;

        setData(dataToSet);
      } catch (e) {
        setError(
          axios.isAxiosError(e)
            ? new Error(`API Error: ${e.response?.status} - ${e.message}`)
            : e instanceof Error
            ? e
            : new Error("An unknown error occurred.")
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error } as FetchState<T>;
};
