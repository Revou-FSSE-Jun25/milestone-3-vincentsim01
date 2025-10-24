

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import ToggleButton from "./component/toggleButton";
import Script from "next/script";
import "./globals.css";
import { AuthProvider} from '@/app/context/AuthContext';
import HeaderComponent from "./component/header/headercomponent";
import { CartProvider } from "@/app/context/CartContext";

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
        <script src="https://kit.fontawesome.com/b7f46329c5.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

 
                <AuthProvider>
                  <CartProvider>
                  <HeaderComponent />
                  {children}
                  </CartProvider>
                </AuthProvider>
        <div className='border border-t border-black bg-white z-50 h-[10vh] flex justify-center items-center mt-5'>
            &copy; Vincent 2025
        </div>
      </body>
    </html>
  );
}
