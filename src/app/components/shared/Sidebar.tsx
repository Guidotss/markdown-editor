"use client"
import { useContext } from 'react';
import { UiContext } from '@/context/ui';
import "animate.css"
import Link from 'next/link';
import { NoteContext } from '@/context/notes';

export const Sidebar = () => {
  const { isSidebarOpen } = useContext(UiContext); 
  const { createNote } = useContext(NoteContext); 

  const handleCreateNote = () => { 
    createNote();
  }

  return (
    <>
      {isSidebarOpen && ( 
        <aside className="flex flex-col items-center bg-dark_charcoal lg:w-[40vw] 2xl:w-[30vw] py-3 animate__animated animate__slideInLeft animate__faster">
          <header>
            <h3 className='text-dove_gray'>MY DOCUMENTS</h3>
          </header> 
          <div className="flex flex-col items-center gap-2 mt-5">
            <button 
              className='bg-coral text-white font-light px-5 py-2 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out'
              onClick={handleCreateNote}
            >
              + New Document
            </button>
          </div>
          <div className="lg:h-[72vh] 2xl:h-[80vh] flex  items-end">
            <Link href="/auth/login" className='bg-coral text-white font-semibold px-14 py-2 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out'>
              Login
            </Link>
          </div>
        </aside>
      )}
    </>
  )
}