// components/media/MediaPoster.tsx

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from "@/constants/apiConfig";

interface MediaPosterProps {
  posterPath: string | null;
}

export default function MediaPoster({ posterPath }: MediaPosterProps) {
  if (!posterPath) {
    return <View style={styles.placeholder} />;
  }

  const imageUrl = `${TMDB_IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`;

  return (
    <View style={styles.container}>
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
    height: 135, // 2:3 ratio for posters
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
    height: 135,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
});
