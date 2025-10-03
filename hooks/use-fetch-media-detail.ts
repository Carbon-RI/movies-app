// hooks/use-fetch-media-detail.ts

import { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";
import { MovieDetail, TVShowDetail } from "@/types/media";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetchMediaDetail = <T extends MovieDetail | TVShowDetail>(
  id: string | string[] | undefined,
  mediaType: "movie" | "tv"
): FetchState<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const mediaId = Array.isArray(id) ? id[0] : id;

    if (!mediaId) {
      setError(new Error("Invalid/Missing Media ID."));
      setLoading(false);
      return;
    }
    if (!TMDB_API_KEY) {
      setError(new Error("API Key is missing. Check your configuration."));
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const path = mediaType;
    const url = `${TMDB_BASE_URL}/${path}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US`;

    const fetchData = async () => {
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (e) {
        let fetchError: Error;
        if (axios.isAxiosError(e)) {
          fetchError = new Error(
            `API Error: ${e.response?.status} - ${e.message}`
          );
        } else {
          fetchError =
            e instanceof Error ? e : new Error("An unknown error occurred.");
        }
        setError(fetchError);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, mediaType]);
  return { data, loading, error };
};
