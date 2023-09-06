"use client";
import { useReducer } from "react";
import { UiContext, uiReducer } from ".";

interface UiProviderProps {
  children: React.ReactNode;
}

export interface UiState {
  isSidebarOpen: boolean;
  isSaveModalOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isSidebarOpen: false,
  isSaveModalOpen: false,
};

export const UiProvider = ({ children }: UiProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSidebar = () => {
    dispatch({ type: "[UI] - toggle_sidebar" });
  };

  const openSaveModal = () => {
    dispatch({ type: "[UI] - open_save_modal" });
  };

  const closeSaveModal = () => {
    dispatch({ type: "[UI] - close_save_modal" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        toggleSidebar,
        openSaveModal,
        closeSaveModal,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
