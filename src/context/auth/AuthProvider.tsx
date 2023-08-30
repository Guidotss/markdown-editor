"use client";
import { useReducer } from "react";
import Cookies from "js-cookie";
import { AuthContext, authReducer } from ".";
import { AuthUserResponse, User } from "@/interfaces";

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

  const login = async (user: User) => {
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
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
