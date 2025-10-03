// components/screens/MediaListScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import SelectionModal from "@/components/ui/SelectionModal";
import { MediaItem, useFetchMedia } from "@/hooks/use-fetch-media";

// 汎用的なオプションの型を定義
interface MediaOption {
  label: string;
  value: string;
  display: string;
}

interface MediaListScreenProps {
  options: MediaOption[];
  // エラー表示を分かりやすくするため、表示タイプもPropsとして受け取る
  mediaType: "Movies" | "TV Shows";
}

export default function MediaListScreen({
  options,
  mediaType,
}: MediaListScreenProps) {
  // 常に最初のオプションをデフォルトとして使用
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<string>(
    options[0].value
  );
  const [isModalVisible, setModalVisible] = React.useState(false);

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchMedia<MediaItem[]>(selectedEndpoint);

  const currentOption =
    options.find((opt) => opt.value === selectedEndpoint) || options[0];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // endpoint の型を string に統一
  const handleSelect = (endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setModalVisible(false);
  };

  // --- UI レンダリング ---

  if (mediaLoading) {
    return <LoadingIndicator />;
  }

  if (mediaError) {
    return (
      <View style={styles.errorContainer}>
        {/* エラーメッセージを汎用化 */}
        <Text style={styles.errorText}>Error Loading {mediaType}:</Text>
        <Text style={styles.errorDetail}>{mediaError}</Text>
        <Text style={styles.errorInstruction}>
          Please check your API key and network connection.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 1. ドロップダウンヘッダー */}
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

      {/* 2. リスト表示エリア */}
      <View style={styles.listContainer}>
        {mediaData ? (
          <MediaList data={mediaData} />
        ) : (
          <Text style={styles.noData}>
            No data available for this category.
          </Text>
        )}
      </View>

      {/* 3. 選択モーダル */}
      <SelectionModal
        isVisible={isModalVisible}
        options={options}
        selectedValue={selectedEndpoint}
        onSelect={handleSelect}
        onClose={toggleModal}
      />
    </View>
  );
}

// --- スタイルシート ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  headerWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "none",
  },

  listContainer: {
    flex: 1,
  },

  // エラー表示関連のスタイル (movies.tsx から移動)
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
