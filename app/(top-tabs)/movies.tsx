// app/(top-tabs)/movies.tsx (カスタムドロップダウン + ボトムモーダル版)

import React from "react";
// 【修正】Pickerから必要なコンポーネントに変更
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// 【新規】ボトムモーダルとアイコンをインポート
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { MOVIE_ENDPOINTS } from "@/constants/apiConfig";
import { MediaItem, useFetchMedia } from "@/hooks/use-fetch-media";

// 選択オプションを定義 (表示用の 'display' キーを追加)
const MOVIE_OPTIONS = [
  {
    label: "Now Playing",
    value: MOVIE_ENDPOINTS.nowPlaying,
    display: "Now Playing",
  },
  { label: "Popular", value: MOVIE_ENDPOINTS.popular, display: "Popular" },
  { label: "Top Rated", value: MOVIE_ENDPOINTS.topRated, display: "Top Rated" },
  { label: "Upcoming", value: MOVIE_ENDPOINTS.upcoming, display: "Upcoming" },
];

// 型を定義
type MovieEndpoint = (typeof MOVIE_ENDPOINTS)[keyof typeof MOVIE_ENDPOINTS];

export default function MoviesScreen() {
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<MovieEndpoint>(
    MOVIE_OPTIONS[0].value // 初期選択は 'Popular'
  );
  // 【新規】モーダル表示の状態
  const [isModalVisible, setModalVisible] = React.useState(false);

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchMedia<MediaItem[]>(selectedEndpoint);

  // 現在選択されているオプションを取得
  const currentOption =
    MOVIE_OPTIONS.find((opt) => opt.value === selectedEndpoint) ||
    MOVIE_OPTIONS[0];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelect = (endpoint: MovieEndpoint) => {
    setSelectedEndpoint(endpoint);
    setModalVisible(false); // 選択後モーダルを閉じる
  };

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

  // --- モーダル内のリストアイテムコンポーネント ---
  const ModalOptionItem = ({
    option,
  }: {
    option: (typeof MOVIE_OPTIONS)[0];
  }) => {
    const isSelected = option.value === selectedEndpoint;
    return (
      <TouchableOpacity
        style={[styles.modalItem, isSelected && styles.modalItemSelected]}
        onPress={() => handleSelect(option.value)}
      >
        {/* displayフィールドを小文字＋アンダースコア表記に変換して表示 */}
        <Text style={styles.modalItemText}>
          {option.display.toLowerCase().replace(" ", "_")}
        </Text>
        {/* 選択されたものにチェックマークと緑色を適用 */}
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };
  // ----------------------------------------------------

  return (
    <View style={styles.container}>
      {/* 1. カスタムドロップダウンボタン (固定ヘッダー) */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
          <Text style={styles.dropdownText}>
            {currentOption.display.toLowerCase().replace(" ", "_")}
          </Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color="#333"
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>

      {/* 2. データリスト (スクロール部分 - 残りの高さを占有) */}
      <View style={styles.listContainer}>
        {mediaData ? (
          <MediaList data={mediaData} />
        ) : (
          <Text style={styles.noData}>
            No data available for this category.
          </Text>
        )}
      </View>

      {/* 3. ボトムモーダル */}
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.bottomModal}
        animationIn="slideInUp" // 下からビヨーンと現れる
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          {/* MOVIE_OPTIONSをリストとして表示 */}
          {MOVIE_OPTIONS.map((option) => (
            <ModalOptionItem key={option.value} option={option} />
          ))}
        </View>
      </ReactNativeModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // --- カスタムドロップダウン関連のスタイル ---
  headerWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    alignItems: "center", // 左寄せ
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5, // 箱で囲む
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // --- リストコンテナのスタイル ---
  listContainer: {
    flex: 1,
  },

  // --- モーダル関連のスタイル ---
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 40, // 画面下の安全な領域を考慮してpaddingを増やす
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  modalItemSelected: {
    backgroundColor: "#E8F5E9", // 薄い緑の背景
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  modalItemText: {
    fontSize: 16,
    textTransform: "uppercase", // 小文字表示
  },

  // --- エラー表示関連のスタイル ---
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
    color: "#D32F2F",
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
  noData: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
