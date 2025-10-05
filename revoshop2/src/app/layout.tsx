import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
// import HeaderComponent from "./component/header/headercomponent"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white z-50'>
          <div className='flex justify-evenly items-center w-[40%]'>
            <Link href='/'><span>Home</span></Link>
            <Link href='/About/'><span>About</span></Link>
            <Link href='/products/'><span>Products</span></Link>
            <Link href='/Contact/'><span>Contact</span></Link>
          </div>
          <div className='w-[10%]'>
            <img className='w-[100px]' src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'></img>
          </div>
          <div className='w-[40%] flex justify-evenly items-center w-[40%]'>
            <Link href='/User/'><span>User</span></Link>
            <span>Register</span>
          </div>

        </div>
        {/* <HeaderComponent></HeaderComponent> */}
        {children}
      </body>
    </html>
  );
}
