

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import ToggleButton from "./component/toggleButton";
import Script from "next/script";
// import { useState } from 'react';
// import HeaderComponent from "./component/header/headercomponent"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



//   if (btn && menu) {
//     btn.addEventListener('click', () => {
//       btn.classList.toggle('open');
//       menu.classList.toggle('hidden');
//       menu.classList.toggle('flex');
//       menu.classList.toggle('flex-col');
//       menu.classList.toggle('items-center');
//       menu.classList.toggle('justify-center');
//     });
//   }
// }

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revoshop",
  description: "An ECommerce that revolutionize your shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://kit.fontawesome.com/b7f46329c5.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white z-50 relative'>
          <div className='hidden md:flex md:justify-evenly md:items-center w-[40%]'>
            <Link href='/'><span className='hover:underline'>Home</span></Link>
            <Link href='/products/'><span className='hover:underline'>Products</span></Link>
            <Link href='/FAQ/'><span className='hover:underline'>FAQ</span></Link>
            <Link href='/Promotion/'><span className='hover:underline'>Promotion</span></Link>
          </div>

          <ToggleButton />  
    
          {/* <div className='w-[60%] md:hidden rounded-md bg-white p-5 flex flex-col justify-end items-center absolute top-10 z-50 border border-black' id='mobile-menu'>
    
            <Link href='/'><span className='hover:underline'>Home</span></Link>
            <Link href='/products/'><span className='hover:underline'>Products</span></Link>
            <Link href='/FAQ/'><span className='hover:underline'>FAQ</span></Link>
            <Link href='/Promotion/'><span className='hover:underline'>Promotion</span></Link>
          </div> */}
          <div className='w-[10%]'>
            <Link href='/'>
                <img className='w-[100px] hover:scale-110' src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'></img>
            </Link>
            
          </div>
          <div className='w-[40%] flex justify-evenly items-center w-[40%]'>
            {/* <Link href='/User/'><span>User</span></Link> */}
            <Link href='/AddToCart/'><i className="fa-solid fa-cart-shopping"></i></Link>
          </div>

        </div>
        {/* <HeaderComponent></HeaderComponent> */}
        {children}
        <div className='border border-t border-black bg-white z-50 h-[10vh] flex justify-center items-center mt-5'>
            &copy; Vincent 2025
        </div>
      </body>
    </html>
  );
}
