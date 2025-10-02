// components/media/MediaListItem.tsx

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MediaItem } from "@/hooks/use-fetch-media";
import MediaPoster from "./MediaPoster";

interface MediaListItemProps {
  item: MediaItem;
}

export default function MediaListItem({ item }: MediaListItemProps) {
  const title = item.title || item.name;
  const date = item.release_date || item.first_air_date;

  // Popularityを丸めて表示（小数点以下を四捨五入）
  const popularity = (item as any).popularity
    ? Math.round((item as any).popularity)
    : "N/A";

  // 日付のフォーマット (例: 2024-01-01)
  const formattedDate = date
    ? new Date(date).toDateString().substring(4)
    : "N/A";

  return (
    <View style={styles.container}>
      <MediaPoster posterPath={item.poster_path} />

      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Popularity */}
        <Text style={styles.detailText}>
          Popularity: <Text style={styles.highlight}>{popularity}</Text>
        </Text>

        {/* Release Date */}
        <Text style={styles.detailText}>
          Release Date: <Text style={styles.highlight}>{formattedDate}</Text>
        </Text>

        {/* More Detail ボタン */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log(`More details for ID: ${item.id}`);
          }} // 次のステップでナビゲーションを実装
        >
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
    // flex-startではなく、スペースを空けるために space-between を利用
    justifyContent: "space-between",
    paddingVertical: 5,
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
    backgroundColor: "teal",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
