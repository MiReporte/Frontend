import React from "react";
import { useAuth } from "../../shared/auth/useAuth";
import { AdminView } from "../components/views/AdminView";
import { MesaServiciosView } from "../components/views/MesaServiciosView";
import { SupervisorView } from "../components/views/SupervisorTecnicoView";

export function DashboardScreen() {
  const { user, logout } = useAuth();

  const renderContentByRole = () => {
    switch (user?.role) {
      case "Administrador":
        return <AdminView />;
      case "Mesa de Servicios":
        return <MesaServiciosView />;
      case "Supervisor Técnico":
        return <SupervisorView />;
      default:
        return (
          <div style={{ padding: 20 }}>Error de Rol. Contacta a Soporte.</div>
        );
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          padding: 15,
          background: "#333",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "bold" }}>MiReporte | {user?.role}</span>
        <button
          onClick={logout}
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
          }}
        >
          Cerrar Sesión
        </button>
      </header>

      <main style={{ flexGrow: 1, padding: 20 }}>{renderContentByRole()}</main>
    </div>
  );
}
