// components/media/MediaPoster.tsx

import { POSTER_SIZE, TMDB_IMAGE_BASE_URL } from "@/constants/apiConfig";
import React from "react";
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type TMDBImageSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

interface MediaPosterProps {
  posterPath: string | null;
  style?: StyleProp<ViewStyle>;
  size?: TMDBImageSize;
}

export default function MediaPoster({
  posterPath,
  style,
  size = POSTER_SIZE,
}: MediaPosterProps) {
  if (!posterPath) {
    return <View style={[styles.placeholder, style]} />;
  }

  const imageUrl = `${TMDB_IMAGE_BASE_URL}${size}${posterPath}`;

  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#eee",
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
});
