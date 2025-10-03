// components/ui/SelectionModal.tsx

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";

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

interface ModalOptionItemProps {
  option: Option;
  selectedValue: string;
  onSelect: (value: string) => void;
}

const ModalOptionItem: React.FC<ModalOptionItemProps> = ({
  option,
  selectedValue,
  onSelect,
}) => {
  const isSelected = option.value === selectedValue;
  return (
    <TouchableOpacity
      style={[styles.modalItem, isSelected && styles.modalItemSelected]}
      onPress={() => onSelect(option.value)}
    >
      <Text style={styles.modalItemText}>
        {option.display.toLowerCase().replace(" ", "_")}
      </Text>
      {isSelected && (
        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
      )}
    </TouchableOpacity>
  );
};

const SelectionModal: React.FC<SelectionModalProps> = ({
  isVisible,
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
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
          <ModalOptionItem
            key={option.value}
            option={option}
            selectedValue={selectedValue}
            onSelect={onSelect}
          />
        ))}
      </View>
    </ReactNativeModal>
  );
};

export default SelectionModal;

const styles = StyleSheet.create({
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
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  modalItemText: {
    fontSize: 16,
    textTransform: "none",
  },
});
