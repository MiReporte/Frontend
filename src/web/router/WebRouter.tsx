import React from "react";
import { WebLoginScreen } from "../screens/LoginScreen";
import { DashboardScreen } from "../screens/DashboardScreen";
import { useAuth } from "../../shared/auth/useAuth";
import { AccessDeniedScreen } from "../components/AccessDeniedScreen";

export function WebRouter() {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          padding: 50,
          textAlign: "center",
          height: "100vh",
          background: "#fff",
        }}
      >
        <h1>Procesando Sesión...</h1>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <WebLoginScreen />;
  }

  if (!user || !user.role) {
    useAuth().logout();
  }

  if (user.role === "Usuario Ciudadano") {
    return <AccessDeniedScreen />;
  }

  return <DashboardScreen />;
}
