"use client";
import { useState, useContext } from "react";
import { NoteContext } from "@/context/notes";
import { UiContext } from "@/context/ui";

export const SaveForm = () => {
  const { saveNote, currentNote } = useContext(NoteContext);
  const { isSaveModalOpen, closeSaveModal } = useContext(UiContext);

  const [title, setTitle] = useState<string>(currentNote.title || "");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    closeSaveModal();
    saveNote({
      id: currentNote.id,
      title: `${title}.md`,
      content: currentNote.content,
    });
  };

  const handleCloseModal = () => {
    closeSaveModal();
  };

  return (
    <>
      {isSaveModalOpen && (
        <div className="h-full w-full bg-opacity-30 bg-dove_gray absolute flex items-center justify-center">
          <button
            className="rounded-full text-white absolute z-10 lg:top-[22vh] lg:right-[32.3vw] bg-dark_charcoal px-2 hover:text-coral transition-colors duration-300 ease-in-out"
            onClick={handleCloseModal}
          >
            X
          </button>
          <form
            className="bg-dark_charcoal lg:h-80 2xl:lg:w-[25vw] lg:w-[35vw] flex flex-col items-center rounded-lg animate__animated animate__fadeIn animate__faster"
            onSubmit={handleSave}
          >
            <h3 className="text-light_gray text-3xl mt-2 2xl:mb-20 lg:mb-16 underline decoration-coral decoration-dashed tracking-wide font-semibold">
              Save
            </h3>
            <input
              className="bg-dark_charcoal text-white font-light 2xl:w-[400px] lg:w-[350px] px-5 py-3 border-b-[1px] focus:outline-none focus:border-b-[1px] focus:border-coral transition-colors duration-300 ease-in-out"
              placeholder="Document name"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="bg-coral 2xl::w-[400px] lg:w-[350px] py-2 rounded-lg mt-10 text-white text-xl font-semibold hover:bg-apricot transition-colors duration-300 ease-out">
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};
