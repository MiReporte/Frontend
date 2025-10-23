export type UserRole =
  | "Administrador"
  | "Mesa de Servicios"
  | "Supervisor Técnico"
  | "Usuario Ciudadano";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const loginApi = (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    if (credentials.password !== "password") {
      reject(new Error("Contraseña incorrecta."));
      return;
    }

    setTimeout(() => {
      let role: UserRole;
      let name: string;

      switch (credentials.email) {
        case "admin@demo.com":
          role = "Administrador";
          name = "Administrador Principal";
          break;
        case "mesa@demo.com":
          role = "Mesa de Servicios";
          name = "Mesa de Servicios";
          break;
        case "super@demo.com":
          role = "Supervisor Técnico";
          name = "Supervisor Técnico";
          break;
        default:
          role = "Usuario Ciudadano";
          name = "Ciudadano Registrado";
          break;
      }

      resolve({
        id: "user-" + credentials.email.split("@")[0],
        name: name,
        email: credentials.email,
        role: role,
      });
    }, 1500);
  });
};

export const fetchUserApi = (token: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!token) {
        resolve(null);
        return;
      }

      const emailPart = token.replace("valid_token_for_", "");

      let role: UserRole = "Usuario Ciudadano";

      if (emailPart.includes("admin")) {
        role = "Administrador";
      } else if (emailPart.includes("mesa")) {
        role = "Mesa de Servicios";
      }

      resolve({
        id: emailPart,
        name: `Usuario ${emailPart}`,
        email: emailPart + "@demo.com",
        role: role,
      });
    }, 500);
  });
};
