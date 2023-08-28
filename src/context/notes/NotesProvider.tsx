"use client";
import { useReducer } from "react";
import { NoteContext, notesReducer } from ".";

interface NotesProviderProps {
  children: React.ReactNode;
}

export interface NotesState {
  notes: string[];
  currentNote: string;
}

const NOTES_INITIAL_STATE: NotesState = {
  notes: [],
  currentNote: ""

};

export const NotesProvider = ({ children }: NotesProviderProps) => {
  const [state, dispatch] = useReducer(notesReducer, NOTES_INITIAL_STATE);

  const setNote = (note: string) =>
    dispatch({ type: "[NOTE] - set_current_note", payload: note });

  return (
    <NoteContext.Provider
      value={{
        ...state,

        setNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
