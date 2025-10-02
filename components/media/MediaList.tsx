// components/media/MediaList.tsx (FlatListに直接flex: 1を適用)

import { MediaItem } from "@/hooks/use-fetch-media";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MediaListItem from "./MediaListItem";

interface MediaListProps {
  data: MediaItem[];
}

export default function MediaList({ data }: MediaListProps) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MediaListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={true}
      style={styles.list} // flex: 1 を適用
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
