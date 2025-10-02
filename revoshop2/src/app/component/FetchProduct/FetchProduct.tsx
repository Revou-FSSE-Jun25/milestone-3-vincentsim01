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
                <div>{item.title} - {item.price}</div>
            )
        })}
      
    </div>
  )
}

export default FetchProduct
