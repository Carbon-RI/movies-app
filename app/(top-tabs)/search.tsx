// app/(top-tabs)/search.tsx (最終修正版)

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// 🚨 ReactNativeModal は SelectionModal に移動したため削除

import MediaListContainer from "@/components/containers/MediaListContainer";
import SelectionModal from "@/components/ui/SelectionModal";
import { SearchType, useFetchSearch } from "@/hooks/use-fetch-search";

// searchTypes を SelectionModal に適合する形式に修正
const searchTypes = [
  { label: "multi", value: "multi", display: "multi" },
  { label: "movie", value: "movie", display: "movie" },
  { label: "tv", value: "tv", display: "tv" },
];
type SearchOption = (typeof searchTypes)[0];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState<string>(
    searchTypes[0].value
  );
  const [isModalVisible, setModalVisible] = useState(false);

  // 検索実行時にのみ更新されるステート
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSearchType, setCurrentSearchType] = useState<string>(
    searchTypes[0].value
  );
  const [hasSearched, setHasSearched] = useState(false);

  // currentSearchType が常に SearchType 型であることを保証
  const currentSearchTypeCasted = currentSearchType as SearchType;

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchSearch(currentSearchTerm, currentSearchTypeCasted);

  const currentOption =
    searchTypes.find((type) => type.value === selectedSearchType) ||
    searchTypes[0];

  const handleSearch = () => {
    if (!searchText.trim()) {
      Alert.alert("Error", "Please enter a search keyword.");
      return;
    }
    setCurrentSearchTerm(searchText.trim());
    setCurrentSearchType(selectedSearchType);
    setHasSearched(true);
    setSearchText("");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectType = (type: string) => {
    setSelectedSearchType(type);
    setModalVisible(false);
  };

  // 🚨 ModalTypeItem と getCurrentOptionLabel、renderContent は削除

  return (
    <View style={styles.container}>
      <View style={styles.searchForm}>
        <Text style={styles.label}>Search Movie/TV Show Name</Text>
        <View style={styles.inputWrapper}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="i.e. James Bond, CSI"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
          />
        </View>

        <Text style={styles.label}>Choose Search Type</Text>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
            <Text style={styles.dropdownText}>
              {/* display を使って表示、大文字化ロジックは不要 */}
              {currentOption.display}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color="#333"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>

          <View style={styles.searchButtonContainer}>
            <Button title="Search" onPress={handleSearch} />
          </View>
        </View>

        <Text style={styles.warningText}>Please select a search type</Text>
      </View>

      {/* 🚨 MediaListContainer に置き換え */}
      <View style={styles.listContainer}>
        <MediaListContainer
          hasSearched={hasSearched}
          mediaLoading={mediaLoading}
          mediaError={mediaError}
          mediaData={mediaData}
          currentSearchTerm={currentSearchTerm}
          currentSearchType={currentSearchType}
        />
      </View>

      {/* 🚨 SelectionModal に置き換え */}
      <SelectionModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        options={searchTypes}
        selectedValue={selectedSearchType}
        onSelect={handleSelectType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchForm: {
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "white",
    marginBottom: 10,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingRight: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    height: 44,
  },
  dropdownButton: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "white",
    height: "100%",
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
  },
  searchButtonContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
  },
  warningText: {
    textAlign: "left",
    marginTop: 5,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
  },
});
