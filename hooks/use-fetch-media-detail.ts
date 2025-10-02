// hooks/use-fetch-media-detail.ts

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  DETAIL_BASE_URL, // 詳細用のベースパス
} from "@/constants/apiConfig";
import { MovieDetail } from "@/types/media"; // 詳細データの型をインポート

// カスタムフックの戻り値の型定義
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null; // Errorオブジェクトを統一して返す
}

/**
 * TMDb API から単一のメディアの詳細データを取得するカスタムフック
 * @param id - 映画またはTV番組のID (useLocalSearchParamsから取得)
 */
export const useFetchMediaDetail = (
  id: string | string[] | undefined
): FetchState<MovieDetail> => {
  const [data, setData] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 1. IDのバリデーションと整形
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

    // 2. API URLの構築 (今回は /movie/{id} を使用)
    const url = `${TMDB_BASE_URL}${DETAIL_BASE_URL}${mediaId}?api_key=${TMDB_API_KEY}&language=en-US`;

    const fetchData = async () => {
      try {
        const response = await axios.get<MovieDetail>(url);
        // 詳細エンドポイントは results 配列ではなく、直接単一のオブジェクトを返す
        setData(response.data);
      } catch (e) {
        let fetchError: Error;
        if (axios.isAxiosError(e)) {
          // Axiosのエラーを適切なメッセージでラップ
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
  }, [id]);

  return { data, loading, error };
};
