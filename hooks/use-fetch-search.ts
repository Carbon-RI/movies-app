//　hooks/use-fetch-search.ts

import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";
import { MediaItem } from "./use-fetch-media";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export type SearchType = "multi" | "movie" | "tv";

interface UseFetchSearchHook {
  data: MediaItem[] | null;
  loading: boolean;
  error: Error | null;
}

export const useFetchSearch = (
  query: string,
  type: SearchType
): UseFetchSearchHook => {
  const [data, setData] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const shouldSkip = !query || !type;

  const fetchData = useCallback(async () => {
    if (!TMDB_API_KEY) {
      setError(new Error("API Key is missing. Check your configuration."));
      setLoading(false);
      return;
    }

    if (shouldSkip) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    const searchPath = `/search/${type}`;
    const encodedQuery = encodeURIComponent(query);
    const url = `${TMDB_BASE_URL}${searchPath}?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=en-US`;

    try {
      const response = await axios.get(url);
      const json = response.data;
      const results: MediaItem[] = json.results || [];
      const filteredResults = results.filter(
        (item) => item.media_type !== "person"
      );

      setData(filteredResults);
    } catch (e) {
      console.error("Fetch search error:", e);
      setError(
        axios.isAxiosError(e)
          ? new Error(`API Error: ${e.response?.status} - ${e.message}`)
          : e instanceof Error
          ? e
          : new Error("An unknown error occurred during search.")
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, type, shouldSkip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
