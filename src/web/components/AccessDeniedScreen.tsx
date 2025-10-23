import React from "react";
import { useAuth } from "../../shared/auth/useAuth";

export const AccessDeniedScreen = () => {
  const { logout } = useAuth();

  return (
    <div
      style={{
        padding: 50,
        background: "#fee",
        color: "#c00",
        height: "100vh",
      }}
    >
      <h1>Acceso No Autorizado 🛑</h1>
      <p>
        Tu rol no tiene una interfaz web de escritorio. Por favor, usa la
        aplicación móvil.
      </p>
      <button
        onClick={logout}
        style={{
          background: "red",
          color: "white",
          border: "none",
          padding: "10px",
        }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};
