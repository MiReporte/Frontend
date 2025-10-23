import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function CitizenHomeView() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Citizen Home!</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Report an Issue</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
