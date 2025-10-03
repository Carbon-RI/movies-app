//　hooks/use-fetch-search.ts

import { useCallback, useEffect, useState } from "react";
import { MediaItem } from "./use-fetch-media";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";

export type SearchType = "multi" | "movie" | "tv";

interface UseFetchSearchHook {
  data: MediaItem[] | null;
  loading: boolean;
  error: string | null;
}

export const useFetchSearch = (
  query: string,
  type: SearchType
): UseFetchSearchHook => {
  const [data, setData] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const shouldSkip = !query || !type;

  const fetchData = useCallback(async () => {
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
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      const results: MediaItem[] = json.results || [];
      const filteredResults = results.filter(
        (item) => item.media_type !== "person"
      );

      setData(filteredResults);
    } catch (err) {
      console.error("Fetch search error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during search."
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
