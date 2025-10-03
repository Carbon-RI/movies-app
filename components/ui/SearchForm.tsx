// components/ui/SearchForm.tsx

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
import SelectionModal from "./SelectionModal";

const searchTypes = [
  { label: "multi", value: "multi", display: "multi" },
  { label: "movie", value: "movie", display: "movie" },
  { label: "tv", value: "tv", display: "tv" },
];

type SearchOption = (typeof searchTypes)[0];

interface SearchFormProps {
  onSearch: (searchTerm: string, searchType: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState<string>(
    searchTypes[0].value
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const currentOption: SearchOption =
    searchTypes.find((type) => type.value === selectedSearchType) ||
    searchTypes[0];

  const handleSearch = () => {
    if (!searchText.trim()) {
      Alert.alert("Error", "Please enter a search keyword.");
      return;
    }
    onSearch(searchText.trim(), selectedSearchType);
    setSearchText("");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSelectType = (type: string) => {
    setSelectedSearchType(type);
    setModalVisible(false);
  };

  return (
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

      <SelectionModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        options={searchTypes}
        selectedValue={selectedSearchType}
        onSelect={handleSelectType}
      />
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
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
});
