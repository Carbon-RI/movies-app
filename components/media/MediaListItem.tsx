// components/media/MediaListItem.tsx

import { MediaItem } from "@/hooks/use-fetch-media";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MediaPoster from "./MediaPoster";

interface MediaListItemProps {
  item: MediaItem;
}

export default function MediaListItem({ item }: MediaListItemProps) {
  const router = useRouter();
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;
  const popularity = (item as any).popularity
    ? Math.round((item as any).popularity)
    : "N/A";

  const formattedDate = date
    ? new Date(date).toDateString().substring(4)
    : "N/A";

  const handlePress = () => {
    const mediaType = item.name ? "tv" : "movie";
    router.push(`/${mediaType}/${item.id}`);
  };

  return (
    <View style={styles.container}>
      <MediaPoster posterPath={item.poster_path} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        <Text style={styles.detailText}>
          Popularity: <Text style={styles.highlight}>{popularity}</Text>
        </Text>

        <Text style={styles.detailText}>
          Release Date: <Text style={styles.highlight}>{formattedDate}</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>More Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 5,
    marginRight: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 13,
    color: "#666",
    marginBottom: 3,
  },
  highlight: {
    fontWeight: "600",
    color: "#333",
  },
  button: {
    marginTop: 8,
    backgroundColor: "skyblue",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
