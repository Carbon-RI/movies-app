import { TMDB_API_KEY, TMDB_BASE_URL } from "@/constants/apiConfig";
import { MovieDetail, TVShowDetail } from "@/types/media";
import axios from "axios";
import { useEffect, useState } from "react";

// Tを導入し、フックの戻り値の型を汎用化します。
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * TMDb API から単一のメディアの詳細データを取得するカスタムフック
 * @param id - 映画またはTV番組のID
 * @param mediaType - 取得するメディアのタイプ ('movie' または 'tv')
 * @returns 取得状態 (data, loading, error)
 */
// T を使用してフックを汎用化し、mediaType パラメータを追加します
export const useFetchMediaDetail = <T extends MovieDetail | TVShowDetail>(
  id: string | string[] | undefined,
  mediaType: "movie" | "tv" // 取得対象の種類を指定
): FetchState<T> => {
  // データの型を T に変更します
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

    // mediaTypeに基づいて API パスを 'movie' または 'tv' に切り替えます
    const path = mediaType;
    const url = `${TMDB_BASE_URL}/${path}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US`;

    const fetchData = async () => {
      try {
        // axios.get に T を指定し、型安全な取得を行います
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
  }, [id, mediaType]); // mediaType が変更されたら再取得するように依存配列に追加

  return { data, loading, error };
};
