// components/containers/MediaListContainer.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";

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
}

const MediaListContainer: React.FC<MediaListContainerProps> = ({
  hasSearched,
  mediaLoading,
  mediaError,
  mediaData,
  currentSearchTerm,
  currentSearchType,
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
    return <MediaList data={mediaData} />;
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
});
