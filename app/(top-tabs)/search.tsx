import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import MediaListContainer from "@/components/containers/MediaListContainer";
import SearchForm from "@/components/ui/SearchForm";
import { SearchType, useFetchSearch } from "@/hooks/use-fetch-search";

export default function SearchScreen() {
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSearchType, setCurrentSearchType] = useState<string>("multi");
  const [hasSearched, setHasSearched] = useState(false);
  const currentSearchTypeCasted = currentSearchType as SearchType;
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = (searchTerm: string, searchType: string) => {
    setCurrentSearchTerm(searchTerm);
    setCurrentSearchType(searchType);
    setHasSearched(true);
    setCurrentPage(1);
  };

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchSearch(currentSearchTerm, currentSearchTypeCasted);

  const errorString =
    mediaError == null
      ? null
      : mediaError instanceof Error
      ? mediaError.message
      : typeof mediaError === "string"
      ? mediaError
      : String(mediaError);

  return (
    <View style={styles.container}>
      <SearchForm onSearch={handleSearch} />

      <View style={styles.listContainer}>
        <MediaListContainer
          hasSearched={hasSearched}
          mediaLoading={mediaLoading}
          mediaError={errorString}
          mediaData={mediaData}
          currentSearchTerm={currentSearchTerm}
          currentSearchType={currentSearchType}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    flex: 1,
  },
});
