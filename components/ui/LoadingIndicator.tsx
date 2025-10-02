// components/ui/LoadingIndicator.tsx

import React from "react";
import { ActivityIndicator, StyleSheet, View, Text } from "react-native";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.text}>Loading results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
  },
});
