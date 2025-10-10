"use client"

import React, {useState, useEffect} from 'react'
import Link from 'next/link';
import AddToCartButton from '../addToCartButton';

const FetchProduct = () => {

    type productProp = {

    }

    const [data,setData] = useState([]);

    useEffect(()=>{
        fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=9')
        .then((res)=>res.json())
        .then((item)=>item)
        .then((productData)=>setData(productData))
    },[]);

  return (
    <div>                    
        <h1 className='text-2xl text-center font-bold m-3'>Best-Selling Products</h1>
        {data.map((item)=>{
            return(
                <div className='inline' key={item.id}>

                    <div className='inline-block w-[30%] h-[60vh] border border-black rounded-md shadow-2xl m-3 p-5 flex flex-col items-center' key={item.id}>
                        <Link href={`../products/${item.id}`}>
                            <div className='text-center text-md font-bold'><h1>{item.title}</h1></div>
                            <div className='text-center text-sm'>${item.price}</div>
                            <br></br>
                            <div className='text-center flex justify-center'>
                                <img className='w-[200px] rounded-md text-center' src={item.images[0]}></img>
                            </div>
                        </Link>
                        <br></br>
                        <div className='flex justify-center'>
                            {/* <button className='border border-black rounded-md m-3 p-3 cursor-pointer hover:scale-110 active:scale-95'>Add To Cart</button> */}
                            {/* <button className='border border-black rounded-md m-3 p-3 cursor-pointer hover:scale-110 active:scale-95'>Checkout</button> */}
                            <AddToCartButton product={item}/>

                        </div>

                    </div>

                </div>
                
            )
        })}
      
    </div>
  )
}

export default FetchProduct
