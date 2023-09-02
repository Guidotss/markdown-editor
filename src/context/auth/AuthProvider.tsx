"use client";
import { useReducer } from "react";
import Cookies from "js-cookie";
import { AuthUserResponse, User } from "@/interfaces";
import { AuthContext, authReducer } from ".";
import { toast } from "react-hot-toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const AUTH_INITIAL_STATE: AuthState = {
  user: null,
  token: null,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const login = async (email: string, password: string): Promise<boolean> => {
    const user = { email, password };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data: AuthUserResponse = await response.json();

      if (data.ok) {
        Cookies.set("token", data.token);
        dispatch({
          type: "[AUTH] - login",
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        return true;
      }
      toast.error(data.message || "Error al iniciar sesión", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const user = { name, email, password };
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
      });
      const data: AuthUserResponse = await response.json();

      if (data.ok) {
        Cookies.set("token", data.token);
        dispatch({
          type: "[AUTH] - login",
          payload: {
            user: data.user,
            token: data.token,
          },
        });
        return true;
      }
      toast.error(data.message || "Error al iniciar sesión", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
