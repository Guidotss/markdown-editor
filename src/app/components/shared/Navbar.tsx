"use client";
import { useContext } from "react";
import { UiContext } from "@/context/ui";
import { NoteContext } from "@/context/notes";
import { DeleteIcon, DocumentIcon, MenuIcon, SaveIcon } from "./icons";
import "animate.css";

export const Navbar = () => {
  const { toggleSidebar, isSidebarOpen } = useContext(UiContext);
  const { notes } = useContext(NoteContext);

  const onToggleSidebar = () => {
    toggleSidebar();
  };

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
            {notes.map((note) => (
              <div key={note.id} className="flex items-center">
                <div className="h-10 w-[1px] bg-graphite_gray ml-5" />
                <div className="flex items-center gap-5 ml-4 cursor-pointer">
                  <DocumentIcon />
                  <div className="flex flex-col">
                    <h4 className="text-white font-extralight text-xs">
                      Document Name
                    </h4>
                    <h2 className="text-white font-light text-sm">
                      {note.title}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button>
            <DeleteIcon />
          </button>
          <button className="bg-coral w-[130px] p-3 flex items-center justify-center gap-2 mr-5 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out">
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
