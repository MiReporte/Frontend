import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/shared/auth/useAuth";

import { WebRouter } from "./src/web/router/WebRouter";
import { MobileRouter } from "./src/mobile/router/MobileRouter";

import { MobileLoginScreen } from "./src/mobile/screens/LoginScreen";

import { HomeScreen } from "./src/mobile/screens/HomeScreen";

const AppRoot = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Cargando aplicación...</Text>
      </View>
    );
  }

  if (Platform.OS === "web") {
    return <WebRouter />;
  } else {
    return (
      <NavigationContainer>
        <MobileRouter
          isAuthenticated={isAuthenticated}
          Home={HomeScreen}
          Login={MobileLoginScreen}
        />
      </NavigationContainer>
    );
  }
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoot />
    </AuthProvider>
  );
};

export default App;
