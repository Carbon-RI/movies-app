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

import MediaListContainer from "@/components/containers/MediaListContainer";
import SelectionModal from "@/components/ui/SelectionModal";
import { SearchType, useFetchSearch } from "@/hooks/use-fetch-search";

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
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentSearchType, setCurrentSearchType] = useState<string>(
    searchTypes[0].value
  );
  const [hasSearched, setHasSearched] = useState(false);
  const currentSearchTypeCasted = currentSearchType as SearchType;

  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchSearch(currentSearchTerm, currentSearchTypeCasted);

  // 💡 修正点: currentOptionにSearchOption型を適用
  const currentOption: SearchOption =
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

  // Errorオブジェクトを安全に文字列化するロジックを再利用
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
            <Text style={styles.dropdownText}>{currentOption.display}</Text>
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

      <View style={styles.listContainer}>
        <MediaListContainer
          hasSearched={hasSearched}
          mediaLoading={mediaLoading}
          mediaError={errorString}
          mediaData={mediaData}
          currentSearchTerm={currentSearchTerm}
          currentSearchType={currentSearchType}
        />
      </View>

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
