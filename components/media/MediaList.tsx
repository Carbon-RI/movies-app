// components/media/MediaList.tsx (Vertical Listへ修正)

import { MediaItem } from "@/hooks/use-fetch-media";
import React from "react";
import { FlatList, StyleSheet, Text, View, ViewStyle } from "react-native";
import MediaListItem from "./MediaListItem"; // 新しいListItemをインポート

interface MediaListProps {
  data: MediaItem[];
  style?: ViewStyle; //
}

export default function MediaList({ data, style }: MediaListProps) {
  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );
  }

  return (
    // 【修正】外部から渡されたスタイル（flex: 1）を適用
    <View style={[styles.container, style]}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MediaListItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={true}
        // 【追加】リストのスクロール領域がビューの高さを占有するように設定
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // これを追加することで、親がflex: 1ならこのコンテナも高さを占有
  },
  list: {
    // FlatList自体にも高さを占有させる
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
