"use client"
import { Note } from '@/interfaces';
import { createContext } from 'react';


interface NoteContextProps{ 
    notes: Note[]; 
    currentNote: Note;
    setCurrentNote: (id: string) => void;
    typeNote: (content: string) => void; 
    createNote: () => void; 
    saveNote: (note: Note) => void;
    remove: (id: string) => void; 
}


export const NoteContext = createContext({} as NoteContextProps);