// app/tv/[id].tsx

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
import { TVShowDetail } from "../../types/media";

const { width } = Dimensions.get("window");

const POSTER_VIEW_WIDTH = width * 0.75;
const POSTER_VIEW_HEIGHT = POSTER_VIEW_WIDTH * 1.0;

export default function TVShowDetailScreen() {
  const { id } = useLocalSearchParams();
  const {
    data: mediaData,
    loading,
    error,
  } = useFetchMediaDetail<TVShowDetail>(id, "tv");

  if (!id) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>TVshow ID not found.</Text>
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

  if (!mediaData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          TVshow details could not be loaded.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>{mediaData.title || mediaData.name}</Text>
        <View style={styles.posterContainer}>
          <MediaPoster
            posterPath={mediaData.poster_path}
            style={styles.detailPoster}
            size="w500"
          />
        </View>

        <Text style={styles.content}>
          {mediaData.overview || "No overview available for this media."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            poplularity:{" "}
            <Text style={styles.highlight}>
              {mediaData.popularity != null
                ? mediaData.popularity.toFixed(1)
                : "N/A"}
            </Text>
          </Text>
          <Text style={styles.infoText}>
            | released_date:{" "}
            {mediaData.release_date || mediaData.first_air_date || "N/A"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
    textAlign: "center",
    width: "100%",
  },
  posterContainer: {},
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
    color: "darkcyan",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
});
