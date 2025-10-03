import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { MediaItem } from "@/hooks/use-fetch-media";

interface MediaListContainerProps {
  hasSearched: boolean;
  mediaLoading: boolean;
  mediaError: string | null;
  mediaData: MediaItem[] | null;
  currentSearchTerm: string;
  currentSearchType: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const ITEMS_PER_PAGE = 10;

const MediaListContainer: React.FC<MediaListContainerProps> = ({
  hasSearched,
  mediaLoading,
  mediaError,
  mediaData,
  currentSearchTerm,
  currentSearchType,
  currentPage,
  onPageChange,
}) => {
  if (!hasSearched) {
    return (
      <Text style={styles.initialMessage}>Please initiate a research</Text>
    );
  }

  if (mediaLoading) {
    return <LoadingIndicator />;
  }

  if (mediaError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>A search error occurred.</Text>
        <Text style={styles.errorDetail}>{mediaError}</Text>
      </View>
    );
  }

  if (mediaData && mediaData.length > 0) {
    const totalItems = mediaData.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = currentPage * ITEMS_PER_PAGE;
    const displayedData = mediaData.slice(startIndex, endIndex);
    const PaginationControls = (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={[
            styles.pageButton,
            currentPage === 1 && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              currentPage === 1 && styles.disabledText,
            ]}
          >
            {"< Prev"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          {`Page ${currentPage} of ${totalPages}`}
        </Text>

        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.disabledButton,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              currentPage === totalPages && styles.disabledText,
            ]}
          >
            {"Next >"}
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <MediaList
        data={displayedData}
        listFooter={totalItems > ITEMS_PER_PAGE ? PaginationControls : null}
        currentPage={currentPage}
      />
    );
  }

  return (
    <Text style={styles.noData}>
      No results found for "{currentSearchTerm}" (Type: {currentSearchType}).
    </Text>
  );
};

export default MediaListContainer;

const styles = StyleSheet.create({
  initialMessage: {
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
    color: "#666",
    fontSize: 18,
    fontWeight: "bold",
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
    color: "#999",
    fontSize: 16,
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
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f9f9f9",
    marginTop: 10,
  },
  pageButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
  disabledText: {
    color: "#666",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
