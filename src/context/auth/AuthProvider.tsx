"use client";
import { useReducer } from "react";
import Cookies from "js-cookie";
import { AuthUserResponse, User } from "@/interfaces";
import { AuthContext, authReducer } from ".";
import { toast } from 'react-hot-toast';

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

  const login = async (email: string, password: string) => {
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
      console.log(data); 

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
      console.log(response.status); 
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
