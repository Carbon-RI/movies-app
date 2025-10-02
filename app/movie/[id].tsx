import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MediaPoster from "../../components/media/MediaPoster";
import { useFetchMediaDetail } from "../../hooks/use-fetch-media-detail";

// 画面幅を取得し、レイアウトに利用
const { width } = Dimensions.get("window");

// 💥 修正2: 詳細ページのポスターサイズを計算 (正方形 1:1)
const POSTER_VIEW_WIDTH = width * 0.75;
const POSTER_VIEW_HEIGHT = POSTER_VIEW_WIDTH * 1.0;

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading, error } = useFetchMediaDetail(id);

  // --- ローディング/エラー処理 ---
  if (!id) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Movie ID not found.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="teal" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Error fetching details: {error.message}
        </Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Movie details could not be loaded.</Text>
      </View>
    );
  }
  // --- ローディング/エラー処理 終了 ---

  // 5. 【重要】詳細データの表示
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* 1. タイトル */}
        <Text style={styles.header}>{movie.title || movie.name}</Text>

        {/* 2. 画像の表示 */}
        <View style={styles.posterContainer}>
          <MediaPoster
            posterPath={movie.poster_path}
            // 💥 修正3: style={styles.detailPoster} でカスタムサイズを適用
            style={styles.detailPoster}
            // 💥 修正3: size="w500" で高解像度画像をリクエスト
            size="w500"
          />
        </View>

        {/* 4. Overview の中身 */}
        <Text style={styles.content}>
          {movie.overview || "No overview available for this media."}
        </Text>

        {/* 3. Popularity | Release Date */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            poplularity:{" "}
            <Text style={styles.highlight}>
              {movie.popularity != null ? movie.popularity.toFixed(1) : "N/A"}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            | released_date:{" "}
            {movie.release_date || movie.first_air_date || "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // 既存のスタイルを詳細表示に合わせて拡張・調整
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28, // 詳細ページなのでサイズを大きく
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
    textAlign: "center",
    width: "100%",
  },
  posterContainer: {
    // MediaPosterを配置するコンテナは特にスタイル不要
  },
  detailPoster: {
    width: POSTER_VIEW_WIDTH,
    height: POSTER_VIEW_HEIGHT,
    marginBottom: 20,
    marginRight: 0,
  },
  infoBox: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  infoText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 24,
    fontWeight: "500",
  },
  content: {
    width: "100%",
    fontSize: 16,
    lineHeight: 26,
    color: "#444",
    marginBottom: 20,
    textAlign: "left",
  },
  idText: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 20,
    textAlign: "right",
    width: "100%",
  },
  highlight: {
    fontWeight: "bold",
    color: "darkcyan", // 強調色を調整
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});
