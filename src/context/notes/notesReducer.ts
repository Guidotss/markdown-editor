import { Note } from "@/interfaces";
import { NotesState } from ".";

type NotesActionType =
  | { type: "[NOTE] - load_notes"; payload: Note[] | [] }
  | { type: "[NOTE] - create_note"; payload: Note }
  | { type: "[NOTE] - update_note"; payload: Note }
  | { type: "[NOTE] - delete_note"; payload: string }
  | { type: "[NOTE] - set_current_note"; payload: string }
  | { type: "[NOTE] - type_note"; payload: string };

export const notesReducer = (
  state: NotesState,
  action: NotesActionType
): NotesState => {
  switch (action.type) {
    case "[NOTE] - load_notes":
      return {
        ...state,
        notes: [...state.notes, ...action.payload],
      };
    case "[NOTE] - create_note":
      return {
        ...state,
        notes: [...state.notes, action.payload],
        currentNote: action.payload,
      };

    case "[NOTE] - update_note":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "[NOTE] - delete_note":
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case "[NOTE] - set_current_note":
      return {
        ...state,
        currentNote: state.notes.find((note) => note.id === action.payload)!,
      };

    case "[NOTE] - type_note":
      return {
        ...state,
        currentNote: {
          ...state.currentNote,
          content: action.payload,
        },
      };
    default:
      return state;
  }
};
