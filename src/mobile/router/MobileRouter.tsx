import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack: any = createNativeStackNavigator();

interface MobileRouterProps {
  isAuthenticated: boolean;
  Home: React.ComponentType;
  Login: React.ComponentType;
}

export function MobileRouter({
  isAuthenticated,
  Home,
  Login,
}: MobileRouterProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // 1. RUTAS PRIVADAS: Siempre Home
        <Stack.Screen name="Home" component={Home} />
      ) : (
        // 2. RUTAS PÚBLICAS: Siempre Login
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}
