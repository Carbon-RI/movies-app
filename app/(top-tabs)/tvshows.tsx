// app/(top-tabs)/tvshows.tsx

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { TV_ENDPOINTS } from "@/constants/apiConfig";
import { MediaItem, useFetchMedia } from "@/hooks/use-fetch-media";

const TV_OPTIONS = [
  {
    label: "On The Air",
    value: TV_ENDPOINTS.onTheAir,
    display: "On The Air",
  },
  {
    label: "Airing Today",
    value: TV_ENDPOINTS.airingToday,
    display: "Airing Today",
  },
  { label: "Popular", value: TV_ENDPOINTS.popular, display: "Popular" },
  { label: "Top Rated", value: TV_ENDPOINTS.topRated, display: "Top Rated" },
];

type TVEndpoint = (typeof TV_ENDPOINTS)[keyof typeof TV_ENDPOINTS];

export default function TVShowsScreen() {
  const [selectedEndpoint, setSelectedEndpoint] = React.useState<TVEndpoint>(
    TV_OPTIONS[0].value
  );
  const [isModalVisible, setModalVisible] = React.useState(false);

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchMedia<MediaItem[]>(selectedEndpoint);

  const currentOption =
    TV_OPTIONS.find((opt) => opt.value === selectedEndpoint) || TV_OPTIONS[0];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelect = (endpoint: TVEndpoint) => {
    setSelectedEndpoint(endpoint);
    setModalVisible(false);
  };

  if (mediaLoading) {
    return <LoadingIndicator />;
  }

  if (mediaError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error Loading TV Shows:</Text>
        <Text style={styles.errorDetail}>{mediaError}</Text>
        <Text style={styles.errorInstruction}>
          Please check your API key and network connection.
        </Text>
      </View>
    );
  }

  // --- モーダル内のリストアイテムコンポーネント ---
  const ModalOptionItem = ({ option }: { option: (typeof TV_OPTIONS)[0] }) => {
    const isSelected = option.value === selectedEndpoint;
    return (
      <TouchableOpacity
        style={[styles.modalItem, isSelected && styles.modalItemSelected]}
        onPress={() => handleSelect(option.value)}
      >
        <Text style={styles.modalItemText}>
          {option.display.toLowerCase().replace(" ", "_")}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.listContainer}>
        {mediaData ? (
          <MediaList data={mediaData} />
        ) : (
          <Text style={styles.noData}>
            No data available for this category.
          </Text>
        )}
      </View>

      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.bottomModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          {TV_OPTIONS.map((option) => (
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
    paddingBottom: 40,
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
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  modalItemText: {
    fontSize: 16,
    textTransform: "uppercase",
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
