import { Note } from "@/interfaces";
import { NotesState } from ".";

type NotesActionType =
  | { type: "[NOTE] - set_current_note"; payload: string }
  | { type: "[NOTE] - create_note"; payload: Note }
  | { type: "[NOTE] - type_note"; payload: string }

export const notesReducer = (
  state: NotesState,
  action: NotesActionType
): NotesState => {
  switch (action.type) {
    case "[NOTE] - set_current_note":
      return {
        ...state,
        currentNote: state.notes.find((note) => note.id === action.payload)!,
      };

    case "[NOTE] - create_note":
      return {
        ...state,
        notes: [...state.notes, action.payload],
        currentNote: action.payload,
      };
    
    case "[NOTE] - type_note":
      return { 
        ...state,
        currentNote: {
          ...state.currentNote,
          content: action.payload
        }
      }
    default:
      return state;
  }
};
