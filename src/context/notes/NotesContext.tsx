"use client"
import { createContext } from 'react';


interface NoteContextProps{ 
    notes: string[]; 
    currentNote: string;
    setNote: (note: string) => void;
}


export const NoteContext = createContext({} as NoteContextProps);