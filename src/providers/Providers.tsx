"use client"
import { NotesProvider } from "@/context/notes";
import { UiProvider } from '@/context/ui'; 

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <UiProvider>
      <NotesProvider>
        {children}
      </NotesProvider>
    </UiProvider>
  )
};
