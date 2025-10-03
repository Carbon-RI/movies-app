// components/ui/SelectionModal.tsx

// components/ui/SelectionModal.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

// 汎用的なオプションの型を定義
interface Option {
  label: string;
  value: string;
  display: string;
}

interface SelectionModalProps {
  isVisible: boolean;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const SelectionModal: React.FC<SelectionModalProps> = ({
  isVisible,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  // モーダル内の個別の選択肢コンポーネント
  const ModalOptionItem: React.FC<{ option: Option }> = ({ option }) => {
    const isSelected = option.value === selectedValue;
    return (
      <TouchableOpacity
        style={[styles.modalItem, isSelected && styles.modalItemSelected]}
        onPress={() => onSelect(option.value)}
      >
        <Text style={styles.modalItemText}>
          {/* displayを小文字にし、スペースをアンダースコアに変換するロジックを適用 */}
          {option.display.toLowerCase().replace(" ", "_")}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.bottomModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <View style={styles.modalContent}>
        {options.map((option) => (
          // key は value で問題ありません（stringであるため）
          <ModalOptionItem key={option.value} option={option} />
        ))}
      </View>
    </ReactNativeModal>
  );
};

export default SelectionModal;

// --- スタイルシート ---

const styles = StyleSheet.create({
  // --- モーダル関連のスタイル ---
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 40,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  modalItemSelected: {
    backgroundColor: "#E8F5E9", // 薄い緑の背景
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  modalItemText: {
    fontSize: 16,
    textTransform: "none", // 小文字で表示
  },
});
