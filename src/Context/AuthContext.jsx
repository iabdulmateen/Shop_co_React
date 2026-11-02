import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("shopco_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("shopco_user", JSON.stringify(user));
        localStorage.setItem("token", user.token || "mock_jwt_token_sample");
      } else {
        localStorage.removeItem("shopco_user");
        localStorage.removeItem("token");
      }
    } catch (err) {
      console.warn("Auth sync error", err);
    }
  }, [user]);

  const login = async (email, password = "") => {
    // If credentials contain admin or admin@shop.co, assign admin role
    const isAdmin =
      email.toLowerCase().includes("admin") || email === "admin@shop.co" || password.includes("admin");

    const userData = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: isAdmin ? "Admin Manager" : email.split("@")[0].replace(/[._]/g, " "),
      email,
      role: isAdmin ? "admin" : "customer",
      token: "jwt_" + Math.random().toString(36).substring(2, 12),
      phone: "+92 300 1234567",
      address: "Main Boulevard, Phase 5",
      city: "Karachi",
      postalCode: "75000",
      country: "Pakistan",
    };

    setUser(userData);
    return userData;
  };

  const register = async (name, email, password = "") => {
    const isAdmin = email.toLowerCase().includes("admin") || password.includes("admin");
    const userData = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      name: name || email.split("@")[0],
      email,
      role: isAdmin ? "admin" : "customer",
      token: "jwt_" + Math.random().toString(36).substring(2, 12),
      phone: "+92 300 1234567",
      address: "Main Boulevard, Phase 5",
      city: "Karachi",
      postalCode: "75000",
      country: "Pakistan",
    };

    setUser(userData);
    return userData;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
