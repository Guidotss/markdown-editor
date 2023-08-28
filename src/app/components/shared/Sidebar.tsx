"use client"
import { useContext } from 'react';
import { UiContext } from '@/context/ui';
import "animate.css"

export const Sidebar = () => {
  const { isSidebarOpen } = useContext(UiContext); 
  return (
    <>
      {isSidebarOpen && ( 
        <aside className="flex flex-col items-center bg-dark_charcoal lg:w-[40vw] py-3 animate__animated animate__slideInLeft">
          <header>
            <h3 className='text-dove_gray'>MY DOCUMENTS</h3>
          </header> 
          <div className="flex flex-col items-center gap-2 mt-5">
            <button className='bg-coral text-white font-light px-5 py-2 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out'>
              + New Document
            </button>
          </div>
          <div className="lg:h-[72vh] flex  items-end">
            <button className='bg-coral text-white font-semibold px-14 py-2 rounded-md hover:bg-apricot transition-colors duration-300 ease-in-out'>
              Login
            </button>
          </div>
        </aside>
      )}
    </>
  )
}