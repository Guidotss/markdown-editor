"use client";
import { useContext } from "react";
import { UiContext } from "@/context/ui";
import { NoteContext } from "@/context/notes";
import { DeleteIcon, DocumentIcon, MenuIcon, SaveIcon } from "./icons";
import "animate.css";

export const Navbar = () => {
  const { toggleSidebar, isSidebarOpen, openSaveModal } = useContext(UiContext);
  const { notes,currentNote,setCurrentNote, remove } = useContext(NoteContext);

  const onToggleSidebar = () => {
    toggleSidebar();
  };

  const handleOpenSaveModal = () => {
    openSaveModal();
  };

  const handleSetCurrentNote = (id:string) => {
    setCurrentNote(id);
  }

  const handleRemove = (id: string) => {
    remove(id);
  }


  return (
    <div className="flex items-center">
      <div className="flex justify-between items-center w-full bg-slate_gray ">
        <div
          className={`w-full flex items-center ${
            isSidebarOpen && "lg:ml-36 2xl:ml-44"
          }`}
        >
          <button
            className={`bg-steel_blue w-16 lg:p-5 flex justify-center items-center ${
              isSidebarOpen &&
              "animate__animated animate__slideInLeft animate__faster"
            }`}
            onClick={onToggleSidebar}
          >
            <MenuIcon />
          </button>
          <div className="p-[9px] flex items-center w-full">
            <h1 className="text-white font-semibold tracking-widest">
              Markdown
            </h1>
            <div
              className={`overflow-auto flex scroll ${
                isSidebarOpen ? "2xl:w-[70vw]" : "2xl:w-[80vw]"
              }`}
            >
              {notes.map((note) => (
                <div key={note.id} className="flex items-center" onClick={() => handleSetCurrentNote(note.id)}>
                  <div
                    className={`h-10 w-[1px] bg-graphite_gray ${
                      !isSidebarOpen ? "ml-4" : ""
                    }`}
                  />
                  <div
                    className={`flex items-center gap-5  ${
                      isSidebarOpen ? "ml-2" : "ml-4"
                    } cursor-pointer`}
                  >
                    <DocumentIcon />
                    <div className="flex flex-col">
                      <h4 className="text-white font-extralight text-xs">
                        Document Name
                      </h4>
                      <h2 className="text-white font-light text-sm">
                        {note.title}.md
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => handleRemove(currentNote.id)}>
            <DeleteIcon />
          </button>
          <button
            className="bg-coral w-[130px] p-3 flex items-center justify-center gap-2 mr-5 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out"
            onClick={handleOpenSaveModal}
          >
            <figure>
              <SaveIcon />
            </figure>
            <span className="text-xs font-light text-white flex">
              Save changes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
