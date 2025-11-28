import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // If token exists, user is logged in
  useEffect(() => {
    if (token) {
      // You can decode the token here to get user info
      setUser({ token });
    } else {
      setUser(null);
    }
  }, [token]);

  // Login function
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    logout,
    authenticated: !!token, // Changed from isAuthenticated to authenticated
    isAuthenticated: !!token, // Keep both for compatibility
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};