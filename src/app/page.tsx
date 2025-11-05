"use client"

import Banner from "./component/banner";
import FetchProduct from './component/FetchProduct/FetchProduct';
import { useState, useEffect } from 'react';
import ThemeToggle from "@/app/component/themeToggle";


export default function Home() {
  const [showAct, setshowAct] = useState<boolean>(true)



  return (
    <div>

      <Banner></Banner>
            <ThemeToggle></ThemeToggle>

      <FetchProduct></FetchProduct>
    </div>
  );
}
