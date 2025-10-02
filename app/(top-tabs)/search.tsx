// app/(top-tabs)/search.tsx

import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
// 📌 Pickerのインポートを修正
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

// 必要な型とフックをインポート
import MediaList from "@/components/media/MediaList";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
// 🔍 SearchTypeをフックからインポートし、型を明示的に使用
import { SearchType, useFetchSearch } from "@/hooks/use-fetch-search";
// MediaItemはuse-fetch-mediaなどからインポートされているはず

// SearchTypeの型を適用した検索オプション
const searchTypes: { label: string; value: SearchType }[] = [
  { label: "マルチ (全て)", value: "multi" },
  { label: "映画のみ", value: "movie" },
  { label: "TV番組のみ", value: "tv" },
];

// 📌 ファイル名を app/(top-tabs)/search.tsx に変更
export default function SearchScreen() {
  const [searchText, setSearchText] = useState("");
  // 🔍 useStateに型を明示的に指定
  const [selectedSearchType, setSelectedSearchType] = useState<SearchType>(
    searchTypes[0].value
  );

  // 検索実行時にフックに渡す状態
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  // 🔍 SearchTypeまたは空文字列を許容
  const [currentSearchType, setCurrentSearchType] = useState<SearchType | "">(
    ""
  );
  const [hasSearched, setHasSearched] = useState(false);

  // 検索フックの呼び出し
  const {
    data: mediaData,
    loading: mediaLoading,
    error: mediaError,
  } = useFetchSearch(currentSearchTerm, currentSearchType as SearchType);
  // currentSearchTypeが空でないことを確認してから渡す（またはフック側で処理する）

  const handleSearch = () => {
    if (!searchText.trim()) {
      Alert.alert("エラー", "検索キーワードを入力してください。");
      return;
    }

    // 状態を更新し、フックに再フェッチさせる
    setCurrentSearchTerm(searchText.trim());
    setCurrentSearchType(selectedSearchType);
    setHasSearched(true);
  };

  const renderContent = () => {
    if (!hasSearched) {
      return (
        <Text style={styles.noData}>
          検索キーワードとタイプを入力し、検索を実行してください。
        </Text>
      );
    }

    if (mediaLoading) {
      return <LoadingIndicator />;
    }

    if (mediaError) {
      // エラー表示は既存のMoviesScreenと同様のスタイルを使用
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>検索エラーが発生しました。</Text>
          <Text style={styles.errorDetail}>{mediaError}</Text>
        </View>
      );
    }

    if (mediaData && mediaData.length > 0) {
      // 既存のMediaListコンポーネントを使ってリスト表示
      return <MediaList data={mediaData} />;
    }

    // 検索結果が0件の場合
    return (
      <Text style={styles.noData}>
        「{currentSearchTerm}」（タイプ: {currentSearchType}
        ）の検索結果は見つかりませんでした。
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchForm}>
        {/* 1. 検索入力 */}
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
          />
        </View>

        {/* 2. 検索タイプ選択 */}
        <Text style={styles.label}>Choose Search Type</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={selectedSearchType}
            style={styles.dropdown}
            // 🔍 onValueChangeの型を明示的に指定
            onValueChange={(itemValue: SearchType, itemIndex: number) =>
              setSelectedSearchType(itemValue)
            }
          >
            {searchTypes.map((type) => (
              <Picker.Item
                key={type.value}
                label={type.label}
                value={type.value}
              />
            ))}
          </Picker>
        </View>

        {/* 3. 検索ボタン */}
        <Button title="Search" onPress={handleSearch} />

        {/* 4. 選択を促すメッセージ */}
        <Text style={styles.warningText}>Please select a search type</Text>
      </View>

      {/* 5. 結果リストのコンテナ */}
      <View style={styles.listContainer}>{renderContent()}</View>
    </View>
  );
}

// ... stylesは前回の回答と同じものを使用
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchForm: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f7f7f7",
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
  dropdownContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    ...(Platform.OS === "ios" && {
      overflow: "hidden",
    }),
  },
  dropdown: {
    height: Platform.OS === "ios" ? 44 : 50,
    width: "100%",
  },
  warningText: {
    color: "#D32F2F",
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
  },
  listContainer: {
    flex: 1,
  },
  noData: {
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
    color: "#999",
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F",
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 4,
  },
});
