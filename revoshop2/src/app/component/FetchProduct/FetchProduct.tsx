"use client"

import React, {useState, useEffect} from 'react'

const FetchProduct = () => {

    type productProp = {

    }

    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products')
        .then((res)=>res.json())
        .then((productData)=>setData(productData))
    },[]);

  return (
    <div>
        {data.map((item)=>{
            return(
                <div className='inline'>
                    <div className='inline-block w-[30%] h-[60vh] border border-black rounded-md shadow-2xl m-3 p-5 flex flex-col items-center'>
                        <div className='text-center text-md font-bold'><h1>{item.title}</h1></div>
                        <div className='text-center text-sm'>${item.price}</div>
                        <br></br>
                        <div className='text-center flex justify-center'>
                            <img className='w-[200px] rounded-md text-center' src={item.images[0]}></img>
                        </div>
                        <br></br>
                        <div className='flex justify-center'>
                            <button className='border border-black rounded-md m-3 p-3 cursor-pointer hover:scale-110 active:scale-95'>Add To Cart</button>
                            <button className='border border-black rounded-md m-3 p-3 cursor-pointer hover:scale-110 active:scale-95'>Checkout</button>
                        </div>

                    </div>

                </div>
                
            )
        })}
      
    </div>
  )
}

export default FetchProduct
