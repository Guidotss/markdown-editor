"use client";
import { useReducer } from "react";
import { UiContext, uiReducer } from ".";

interface UiProviderProps {
  children: React.ReactNode;
}

export interface UiState {
  isSidebarOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isSidebarOpen: false,
};

export const UiProvider = ({ children }: UiProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSidebar = () => {
    dispatch({ type: "[UI] - toggle_sidebar" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        toggleSidebar,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
