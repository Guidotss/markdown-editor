"use client"
import { createContext } from 'react'; 


interface UiContextProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}


export const UiContext = createContext({} as UiContextProps);