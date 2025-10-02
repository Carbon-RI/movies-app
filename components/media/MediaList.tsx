// components/media/MediaList.tsx (Vertical Listへ修正)

import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { MediaItem } from "@/hooks/use-fetch-media";
import MediaListItem from "./MediaListItem"; // 新しいListItemをインポート

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

  // 縦スクロールのリスト（FlatList）として使用
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <MediaListItem item={item} />} // 新しいListItemを使用
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={true} // 縦スクロールインジケーターを表示
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    padding: 20,
    flex: 1, // 親コンテナに合わせるために必要
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
