import { MediaItem } from "@/hooks/use-fetch-media";
import React, { ReactElement, useRef, useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MediaListItem from "./MediaListItem";

interface MediaListProps {
  data: MediaItem[];
  listFooter?: ReactElement | null;
  currentPage: number;
}

export default function MediaList({
  data,
  listFooter,
  currentPage,
}: MediaListProps) {
  const flatListRef = useRef<FlatList<MediaItem>>(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  }, [currentPage]);

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={({ item }) => <MediaListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={true}
      style={styles.list}
      ListFooterComponent={listFooter}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
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
