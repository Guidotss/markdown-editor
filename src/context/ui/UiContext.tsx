"use client"
import { createContext } from 'react'; 


interface UiContextProps {
    toggleSidebar: () => void;
    openSaveModal: () => void;
    closeSaveModal: () => void;
    isSidebarOpen: boolean;
    isSaveModalOpen: boolean;
}


export const UiContext = createContext({} as UiContextProps);