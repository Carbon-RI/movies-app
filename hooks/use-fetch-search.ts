// 📌 hooks/use-fetch-search.ts

import { useState, useEffect, useCallback } from "react";

// 仮定: MediaItem型とAPIキー定数は既に存在するものとします
import { MediaItem } from "./use-fetch-media"; // use-fetch-media.tsなどからインポート
const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // constants/apiConfig.tsなどからインポート
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export type SearchType = "multi" | "movie" | "tv";

interface UseFetchSearchHook {
  data: MediaItem[] | null;
  loading: boolean;
  error: string | null;
}

/**
 * 検索キーワードとタイプに基づいてTMDBの検索APIからデータを取得するカスタムフック
 * @param query 検索キーワード
 * @param type 検索タイプ ('multi', 'movie', 'tv')
 * @returns 検索結果、ローディング状態、エラー
 */
export const useFetchSearch = (
  query: string,
  type: SearchType
): UseFetchSearchHook => {
  const [data, setData] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // queryまたはtypeが空の場合は、APIコールをスキップし、リセットする
  const shouldSkip = !query || !type;

  const fetchData = useCallback(async () => {
    if (shouldSkip) {
      setData(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    // TMDBの検索エンドポイントを構築
    // 例: https://api.themoviedb.org/3/search/multi?query=james+bond&api_key=...
    const searchPath = `/search/${type}`;
    const encodedQuery = encodeURIComponent(query);

    const url = `${TMDB_BASE_URL}${searchPath}?api_key=${TMDB_API_KEY}&query=${encodedQuery}&language=ja-JP`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        // エラーレスポンス（例: 404, 500）の処理
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();

      // 検索結果からresults配列を取得
      const results: MediaItem[] = json.results || [];

      // 'multi'検索の場合、media_typeが 'person' のアイテムは除外する（UIで表示しないため）
      const filteredResults = results.filter(
        (item) => item.media_type !== "person"
      );

      setData(filteredResults);
    } catch (err) {
      console.error("Fetch search error:", err);
      // エラーを文字列として設定
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred during search."
      );
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, type, shouldSkip]); // 依存配列にquery, type, shouldSkipを含める

  useEffect(() => {
    fetchData();
    // クリーンアップ関数は不要だが、依存配列にfetchDataを追加
  }, [fetchData]);

  return { data, loading, error };
};
