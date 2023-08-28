"use client"
import { NotesProvider } from "@/context/notes";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  return <NotesProvider>{children}</NotesProvider>;
};
