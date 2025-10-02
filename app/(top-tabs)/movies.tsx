// app/(top-tabs)/movies.tsx

import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { MOVIE_ENDPOINTS } from "@/constants/apiConfig";
import { MediaItem, useFetchMedia } from "@/hooks/use-fetch-media";

// トグルで選択するオプションを定義
const MOVIE_OPTIONS = [
  {
    label: "Popular Movies",
    value: MOVIE_ENDPOINTS.popular,
    title: "Popular Movies",
  },
  {
    label: "Now Playing",
    value: MOVIE_ENDPOINTS.nowPlaying,
    title: "Now Playing Movies",
  },
  {
    label: "Top Rated",
    value: MOVIE_ENDPOINTS.topRated,
    title: "Top Rated Movies",
  },
  {
    label: "Upcoming",
    value: MOVIE_ENDPOINTS.upcoming,
    title: "Upcoming Movies",
  },
];

// 型を定義
type MovieEndpoint = (typeof MOVIE_ENDPOINTS)[keyof typeof MOVIE_ENDPOINTS];

export default function MoviesScreen() {
  // 選択されたエンドポイントの状態を管理
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<MovieEndpoint>(
    MOVIE_OPTIONS[0].value // 初期選択は 'Popular'
  );

  // 選択されたエンドポイントに対応するフックを一つだけ呼び出す
  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchMedia<MediaItem[]>(selectedEndpoint);

  // 選択されたリストのタイトルを取得
  const currentTitle =
    MOVIE_OPTIONS.find((opt) => opt.value === selectedEndpoint)?.title ||
    "Movies";

  if (mediaLoading) {
    return <LoadingIndicator />;
  }

  if (mediaError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error Loading Movies:</Text>
        <Text style={styles.errorDetail}>{mediaError}</Text>
        <Text style={styles.errorInstruction}>
          Please check your API key and network connection.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectorWrapper}>
        <Picker
          selectedValue={selectedEndpoint}
          // 【修正】Pickerのスタイルを明示的に設定
          style={styles.picker}
          onValueChange={(itemValue: MovieEndpoint) =>
            setSelectedEndpoint(itemValue)
          }
        >
          {MOVIE_OPTIONS.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>

      {/* 2. リストタイトル */}
      <Text style={styles.listTitle}>{currentTitle}</Text>

      {/* 3. データリスト */}
      {mediaData ? (
        <MediaList data={mediaData} style={{ flex: 1 }} />
      ) : (
        <Text style={styles.noData}>No data available for this category.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // --- 【追加・修正】エラー表示関連のスタイル ---
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F", // Red
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 4,
  },
  errorInstruction: {
    marginTop: 15,
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  // --- エラー表示関連のスタイルはここまで ---

  selectorWrapper: {
    paddingHorizontal: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
    color: "#333",
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
