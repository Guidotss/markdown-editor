import { User } from "@/interfaces";
import { AuthState } from ".";

type AuthActionType =
  | { type: "[AUTH] - login"; payload: { user: User; token: string } }
  | { type: "[AUTH] - logout" };

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case "[AUTH] - login":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    default: 
        return state;
  }
};
