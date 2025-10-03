// components/ui/CustomBackButton.tsx

import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomBackButton = () => {
  const router = useRouter();
  const BLUE_COLOR = "#007AFF";

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <Ionicons name="chevron-back" size={24} color={BLUE_COLOR} />
      <Text style={[styles.text, { color: BLUE_COLOR }]}>Back to List</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -10,
    paddingRight: 15,
  },
  text: {
    fontSize: 17,
    marginLeft: 0,
  },
});

export default CustomBackButton;
