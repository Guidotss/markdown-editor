"use client"
import { Note } from '@/interfaces';
import { createContext } from 'react';


interface NoteContextProps{ 
    notes: Note[]; 
    currentNote: Note;
    setCurrentNote: (id: string) => void;
    typeNote: (content: string) => void; 
    createNote: (note:Note) => void; 
    remove: (id: string) => void; 
    update: (note: Note) => void; 
}


export const NoteContext = createContext({} as NoteContextProps);