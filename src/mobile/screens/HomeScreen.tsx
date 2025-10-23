import React from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../../shared/auth/useAuth";
import { CitizenHomeView } from "../views/CitizenHomeView";

export function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MiReporte Ciudadano</Text>
        <Button title="Logout" onPress={logout} color="#C0392B" />
      </View>

      <ScrollView style={styles.content}>
        <CitizenHomeView />

        <Text style={styles.debugInfo}>Bienvenido, {user?.name}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  debugInfo: {
    marginTop: 20,
    fontSize: 12,
    color: "#666",
  },
});
