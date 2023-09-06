import { UiState } from ".";

type UiActionType =
  | { type: "[UI] - toggle_sidebar" }
  | { type: "[UI] - open_save_modal" }
  | { type: "[UI] - close_save_modal" };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - toggle_sidebar":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case "[UI] - open_save_modal":
      return {
        ...state,
        isSaveModalOpen: true,
      };
    case "[UI] - close_save_modal":
      return {
        ...state,
        isSaveModalOpen: false,
      };
    default:
      return state;
  }
};
