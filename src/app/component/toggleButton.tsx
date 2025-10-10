"use client"

import React,{useState} from 'react';
import Link from 'next/link';




const ToggleButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle(){
    setIsOpen(!isOpen);
  }

  return (
    <div>


    <button className='block hamburger md:hidden focus:outline-none' onClick={toggle}>
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-grip-lines'}`}></i>
    </button>

      {isOpen && (
    <div className={`w-[60%] md:hidden h-[70vh] rounded-md bg-white p-5 flex flex-col justify-start items-center absolute top-10 z-50`} id='mobile-menu'>

        <>
          <Link href='/'><span className='hover:underline m-4'>Home</span></Link>
          <Link href='/products/'><span className='hover:underline m-4'>Products</span></Link>
          <Link href='/FAQ/'><span className='hover:underline m-4'>FAQ</span></Link>
          <Link href='/Promotion/'><span className='hover:underline m-4'>Promotion</span></Link>
        </>
     
          </div>
           )}
    </div>

  )
}

export default ToggleButton

