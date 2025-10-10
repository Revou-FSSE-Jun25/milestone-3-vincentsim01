import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import Script from "next/script";
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
      <head>
        {/* <script src="https://kit.fontawesome.com/b7f46329c5.js" crossorigin="anonymous"></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className='flex justify-between items-center h-[10vh] sticky top-0 bg-white z-50'>
          <div className='flex justify-evenly items-center w-[40%]'>
            <Link href='/'><span>Home</span></Link>
            <Link href='/FAQ/'><span>FAQ</span></Link>
            <Link href='/products/'><span>Products</span></Link>
            <Link href='/Promotion/'><span>Promotion</span></Link>
          </div>
          <div className='w-[10%]'>
            <img className='w-[100px]' src='https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png'></img>
          </div>
          <div className='w-[40%] flex justify-evenly items-center w-[40%]'>
            {/* <Link href='/User/'><span>User</span></Link> */}
            <Link href='/AddToCart/'>Cart</Link>
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
