// components/screens/MediaListScreen.tsx

import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import SelectionModal from "@/components/ui/SelectionModal";
import { MediaItem, useFetchMedia } from "@/hooks/use-fetch-media";

interface MediaOption {
  label: string;
  value: string;
  display: string;
}

interface MediaListScreenProps {
  options: MediaOption[];
  mediaType: "Movies" | "TV Shows";
}

export default function MediaListScreen({
  options,
  mediaType,
}: MediaListScreenProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>(
    options[0].value
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchMedia<MediaItem[]>(selectedEndpoint);

  const currentOption =
    options.find((opt) => opt.value === selectedEndpoint) || options[0];

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  const handleSelect = useCallback((endpoint: string) => {
    setSelectedEndpoint(endpoint);
    setModalVisible(false);
  }, []);

  if (mediaLoading) {
    return <LoadingIndicator />;
  }

  if (mediaError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error Loading {mediaType}:</Text>
        <Text style={styles.errorDetail}>{mediaError.message}</Text>
        <Text style={styles.errorInstruction}>
          Please check your API key and network connection.
        </Text>
      </View>
    );
  }

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
