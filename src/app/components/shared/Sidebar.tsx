"use client"
import { useContext } from 'react';
import { UiContext } from '@/context/ui';
import "animate.css"

export const Sidebar = () => {
  const { isSidebarOpen } = useContext(UiContext); 
  return (
    <>
      {isSidebarOpen && ( 
        <aside className="flex flex-col items-center bg-dark_charcoal lg:w-[40vw] py-4 animate__animated animate__slideInLeft">
          <header>
            <h3 className='text-dove_gray'>MY DOCUMENTS</h3>
          </header>
        </aside>
      )}
    </>
  )
}