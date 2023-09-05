import { UiState } from ".";

type UiActionType =   { type: "[UI] - toggle_sidebar" }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - toggle_sidebar":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};
