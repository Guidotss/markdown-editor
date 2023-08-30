"use client"
import { AuthProvider } from "@/context/auth";
import { NotesProvider } from "@/context/notes";
import { UiProvider } from '@/context/ui'; 

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return (
    <AuthProvider>
      <UiProvider>
        <NotesProvider>
          {children}
        </NotesProvider>
      </UiProvider>
    </AuthProvider>
  )
};
