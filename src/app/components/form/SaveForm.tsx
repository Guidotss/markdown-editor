"use client";
import { UiContext } from "@/context/ui";
import { useState, useContext } from "react";
export const SaveForm = () => {
  const [title, setTitle] = useState<string>("");
  const { isSaveModalOpen, closeSaveModal } = useContext(UiContext);

  const handleSave = (e:React.FormEvent) => {
    e.preventDefault();
    console.log(title);
    closeSaveModal();
  }

  return (
    <>
      {isSaveModalOpen && (
        <div className="h-full w-full bg-opacity-30 bg-dove_gray absolute flex items-center justify-center">
          <form 
            className="bg-dark_charcoal 2xl:h-80 2xl:w-[25vw] flex flex-col items-center rounded-lg animate__animated animate__fadeIn animate__faster"
            onSubmit={handleSave}
        >
            <h3 className="text-light_gray text-3xl mt-2 mb-20 underline decoration-coral decoration-dashed tracking-wide font-semibold">
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
            <button 
                className="bg-coral 2xl:w-[400px] py-2 rounded-lg mt-10 text-white text-xl font-semibold hover:bg-apricot transition-colors duration-300 ease-out"
            >
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};
