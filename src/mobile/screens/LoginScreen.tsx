import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard, // ⬅️ Necesitas importar Keyboard
  StyleSheet,
} from "react-native";
import { useAuth } from "../../shared/auth/useAuth"; // Ajusta la ruta si es necesario

export function MobileLoginScreen() {
  const { login, isLoading } = useAuth(); // 💡 Credenciales de mock precargadas para testing
  const [email, setEmail] = useState("test@demo.com");
  const [password, setPassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // 1. Evita múltiples envíos
    if (isLoading) return; // 2. Validación simple (no enviamos campos vacíos)

    if (!email || !password) {
      Alert.alert("Error", "Por favor, ingresa correo y contraseña.");
      return;
    }

    try {
      // 3. Llama a la lógica de login compartida (con el mock)
      await login({ email, password }); // 4. Si es exitoso, el useAuth cambia el estado, y el MobileRouter //    redirige automáticamente a HomeScreen.
    } catch (error) {
      // 5. Muestra el mensaje de error del mock
      Alert.alert("Error de Inicio de Sesión", error.message);
    }
  };

  return (
    // ⬅️ Toca cualquier parte fuera de un input para esconder el teclado
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión Móvil</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword} // Oculta/Muestra contraseña
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordButton}
          >
            <Text>{showPassword ? "Ocultar" : "Mostrar"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.hintText}>Usar: test@demo.com / password</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    height: "100%",
  },
  showPasswordButton: {
    paddingHorizontal: 15,
  },
  loginButton: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  hintText: {
    marginTop: 20,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
});
