"use client"

import Banner from "./component/banner";
import FetchProduct from './component/FetchProduct/FetchProduct';
import { useState, useEffect } from 'react';


export default function Home() {
  const [showAct, setshowAct] = useState<boolean>(true)

  // useEffect(()=>{
  //   givePrompt();
  //     localStorage.setItem("userType", JSON.stringify(showAct));
  // },[])

  // function givePrompt(){
  //   const answer = prompt("Are you an admin or a customer?")?.toLowerCase();

  //   if (answer === "admin") {
  //   setshowAct(true);
  //   } else if (answer === "customer") {
  //   setshowAct(false);
  //   } else {
  //   alert("Please type either 'user' or 'customer'");
  //   }
  // }


  return (
    <div>
      <Banner></Banner>
      {/* <ProductsClient></ProductsClient> */}
      <FetchProduct></FetchProduct>
    </div>
  );
}
