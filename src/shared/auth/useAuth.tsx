import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";

import { LoginCredentials, User, fetchUserApi, loginApi } from "./authService";

const TOKEN_KEY = "auth_token";

const getStoredToken = async (): Promise<string | null> => {
  if (Platform.OS === "web") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
};

const setStoredToken = async (token: string | null) => {
  if (Platform.OS === "web") {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = await getStoredToken();
      if (token) {
        const fetchedUser = await fetchUserApi(token);
        if (fetchedUser) setUser(fetchedUser);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const newUser = await loginApi(credentials);
      await setStoredToken("valid_token_for_" + newUser.id);
      setUser(newUser);
    } catch (error) {
      await setStoredToken(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setStoredToken(null);
    setUser(null);
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
