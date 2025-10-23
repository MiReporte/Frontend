import React, { useState } from "react";
import { useAuth } from "../../shared/auth/useAuth";
import styles from "../styles/LoginScreen.module.css";

export function WebLoginScreen() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("super@demo.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, rellena todos los campos.");
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    }
  };

  const buttonClass = `${styles.loginButton} ${
    isLoading || !email || !password ? styles.loginButtonDisabled : ""
  }`;

  return (
    <div className={styles.splitScreen}>
      {/* ------------------- SECCIÓN DE LOGIN (ROJO) ------------------- */}
      <div className={styles.loginSection}>
        <div className={styles.loginHeader}>
          <p className={styles.logo}>MiReporte 📍</p>
        </div>

        <h1 className={styles.mainTitle}>Iniciar Sesión</h1>
        <p className={styles.welcomeMessage}>¡Bienvenido!</p>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          {/* Input de Usuario */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="username">
              Ingresa tu usuario
            </label>
            <input
              id="username"
              type="email"
              placeholder="Usuario"
              className={styles.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Input de Contraseña */}
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">
              Ingresa tu contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p
              style={{
                color: "yellow",
                marginTop: "-10px",
                marginBottom: "10px",
              }}
            >
              {error}
            </p>
          )}

          {/* Botón de Ingreso */}
          <button
            type="submit"
            className={buttonClass}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>

          <a href="#" className={styles.forgotPassword}>
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </div>

      {/* ------------------- SECCIÓN DEL MAPA (GRIS) ------------------- */}
      <div className={styles.mapSection}>
        <p style={{ color: "#777" }}>Simulación de Mapa</p>
      </div>
    </div>
  );
}
