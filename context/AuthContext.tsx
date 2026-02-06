// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";

// type AuthContextType = {
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null);

//   // Load token on first render
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const login = (token: string) => {
//     localStorage.setItem("token", token);
//     setToken(token);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         isAuthenticated: !!token,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within AuthProvider");
//   }
//   return context;
// };

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserProfile } from "@/modules/profile/services/profile.api";

/* ================= TYPES ================= */

type JwtPayload = {
  id: string;
  role: string;
};

type UserProfile = {
  name?: string;
  email?: string;
  phone?: string;
};

/* ================= CONTEXT ================= */

const AuthContext = createContext<any>(null);

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  /* -------- LOAD PROFILE (SAFE) -------- */
  const loadProfile = async () => {
    try {
      const res = await getUserProfile();
      setProfile(res);
    } catch (err) {
     
      setProfile(null);
    }
  };

  /* -------- LOAD FROM LOCAL STORAGE -------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode<JwtPayload>(storedToken);
        setUser(decoded);
        loadProfile(); // 👈 IMPORTANT
      } catch (err) {
        
        localStorage.removeItem("token");
      }
    }
  }, []);

  /* -------- LOGIN -------- */
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const decoded = jwtDecode<JwtPayload>(token);
    setUser(decoded);

    loadProfile(); // 👈 IMPORTANT
  };

  /* -------- LOGOUT -------- */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  /* ================= PROVIDER VALUE ================= */

  return (
    <AuthContext.Provider
      value={{
        token,
        user,        // JWT payload (id, role)
        profile,     // REAL user data (name, email, phone)
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuthContext = () => {
  return useContext(AuthContext);
};
