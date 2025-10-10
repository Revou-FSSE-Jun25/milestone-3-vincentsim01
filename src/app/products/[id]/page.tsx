"use client"
import React from 'react';
import {getProduct} from '../../lib/api';
import {useState,useEffect} from 'react';
import { Product } from '../../types/product';
import { setTimeout } from 'timers';
import axios from 'axios';
import Image from "next/image";
import AddToCartButton from '@/app/component/addToCartButton';

// const page = async ({ params }: { params: { id: string } }) => {
function page ({ params }: { params: { id: string } }):any {
    const { id } = React.use(params);
    const numberId = Number(id);
    // alert(id);
    // const productId = params.id;
    const isValidId = /^\d+$/.test(id);
    const [loading, setLoading] = useState<boolean>(false);
    const [products,setProducts] = useState<Product[]>([]);
    // const fetchedData = getProduct(Number(productId));
            // const fetchProducts = async () =>{
            //     try{
            //         setLoading(true);
            //         // setError(null);
            //         const response = await getProduct(Number(productId));
            //         setProducts(response);
            //         // console.log(response);
            //     }catch(error){
            //         // setError('Failed to fetch products. Please try again')
            //         console.error('Error fetching products:', err);
    
            //     }finally{
            //         setLoading(false);
            //     }
    
           async function makeLoading(){
             setLoading(true)
             const fetchedData = await getProduct(numberId);
              // const fetchedData = await axios.get(`https://api.escuelajs.co/api/v1/products/${numberId}`);

             setProducts(fetchedData);

           }

           function removeLoading(){
            setLoading(false)
           }

           useEffect(()=>{
              makeLoading();


           },[])

          setTimeout(removeLoading,1000);


          if (loading) {
            return (
            <div className="flex justify-center items-center h-64">
                {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div> */}
                LOADING...
            </div>
            );
        }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-gray-800 truncate max-w-xs">Product {id}</li>
          </ol>
        </nav>

        {/* <div className='m-2 p-5 border border-black shadow-lg rounded-lg flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Product Title</h1>
            <p>Rp 50.000</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Woman%27s_shirt_from_Kutch%2C_Gujarat%2C_India%2C_IMA_55114.jpg/640px-Woman%27s_shirt_from_Kutch%2C_Gujarat%2C_India%2C_IMA_55114.jpg' className='rounded-md border border-black'></img>
              <br></br><br></br>
              <button className='border border-black rounded-md mr-1 text-sm p-1 shadow-xl cursor-pointer hover:scale-110 active:scale-90'>Add To Cart</button>
        </div> */}


          <div className='m-2 p-5 border border-black shadow-lg rounded-lg flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>        {products.title}</h1>
            <p>       ${products.price}</p>
            <br></br>
            <p>       {products.description}</p>
            <br></br>
            <Image
                src={products?.images?.[0] || "/placeholder.png"} // fallback image
                alt={products?.title || "Product image"}
                width={400}
                height={400}
                priority
              />
            {/* <img src={products.images[0]}></img> */}
              <br></br><br></br>
              {/* <button className='border border-black rounded-md mr-1 text-sm p-1 shadow-xl cursor-pointer hover:scale-110 active:scale-90'>Add To Cart</button> */}
              <AddToCartButton product={products} />
        </div>

        {/* {products.title}
        {products.price}
        {products.description} */}
        {/* <img src={fetchedData.images[0]}></img> */}
        <div className="mb-6">
          <a
            href="/products"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Products
          </a>
        </div>

        {/* TODO 17: Add ProductDetail component */}
        {/* This component will handle all product display logic */}
        {/* <ProductDetail /> */}
        {/* This is Product {id} */}
      </div>
    </div>
  )
}

export default page
