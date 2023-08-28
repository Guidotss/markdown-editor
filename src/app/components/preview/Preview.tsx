"use client";
import { useContext } from "react";
import Markdown from "markdown-to-jsx";
import { NoteContext } from "@/context/notes";
import { options } from '@/constants/editorOptions'; 

export const Preview = () => {
  const { currentNote } = useContext(NoteContext);
  return (
    <div className="w-full h-full bg-black p-5 outline-none resize-none">
      <Markdown
        options={{
          overrides: options,
        }}
      >
        {currentNote}
      </Markdown>
    </div>
  );
};
