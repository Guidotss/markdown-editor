"use client";
import { useContext } from "react";
import { NoteContext } from "@/context/notes";

export const Editor = () => {
  const { typeNote, currentNote } = useContext(NoteContext);

  return (
    <textarea
      className="w-full h-full bg-black text-light_gray p-5 outline-none resize-none overflow-auto"
      onChange={(e) => typeNote?.(e.target.value)}
      value={currentNote?.content}
    />
  );
};
