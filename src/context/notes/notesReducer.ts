import { NotesState } from ".";

type NotesActionType = { type: "[NOTE] - set_current_note"; payload: string };

export const notesReducer = (
  state: NotesState,
  action: NotesActionType
): NotesState => {
  switch (action.type) {
    case "[NOTE] - set_current_note":
      return {
        ...state,
        currentNote: action.payload,
      };
  }
};
