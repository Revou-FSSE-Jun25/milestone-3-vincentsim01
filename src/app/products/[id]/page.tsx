// "use client"
// import React from 'react';
// import {getProduct} from '../../lib/api';
// import {useState,useEffect} from 'react';
// import { Product } from '../../types/product';
// import { setTimeout } from 'timers';
// import axios from 'axios';
// import Image from "next/image";
// import AddToCartButton from '@/app/component/addToCartButton';
// import { useCart } from "@/app/context/CartContext";

// // const page = async ({ params }: { params: { id: string } }) => {
// function page ({ params }: { params: { id: string } }):any {
//     const { addToCart } = useCart();
//     const { id } = params;
//     const numberId = Number(id);
//     const [showAct, setshowAct] = useState<boolean>(true)
//     const isValidId = /^\d+$/.test(id);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [products,setProducts] = useState<Product>();
//     const [currentPage, setCurrentPage] = useState<number>(Number(id));


//            async function makeLoading(){
//              setLoading(true)
//              const fetchedData = await getProduct(numberId);
//              setProducts(fetchedData);
//            }

//             function nextPage(){
//             const newPage = Number(currentPage)+1;
//             setCurrentPage(newPage);
//             window.location.href = `/products/${newPage}`;
//            }

//            function prevPage(){
//             if(currentPage > 1){
//               const newPage = currentPage - 1;
//               setCurrentPage(newPage);
//               window.location.href = `/products/${newPage}`;
//             }
//           }

//            function removeLoading(){
//             setLoading(false)
//            }

//            useEffect(()=>{
//               makeLoading();
//               const userType = JSON.parse(localStorage.getItem("userType") || "false");

//               setshowAct(userType);
//            },[])

//           setTimeout(removeLoading,1000);


//           if (loading) {
//             return (
//             <div className="flex justify-center items-center h-64">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//                 LOADING...
//             </div>
//             );


//         }

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <nav className="mb-8">
//           <ol className="flex items-center space-x-2 text-sm">
//             <li>
//               <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
//             </li>
//             <li className="text-gray-600">/</li>
//             <li>
//               <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
//             </li>
//             <li className="text-gray-600">/</li>
//             <li className="text-gray-800 truncate max-w-xs">Product {id}</li>
//           </ol>
//         </nav>
//         <button onClick={prevPage} disabled={currentPage <= 1} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">
//           Previous
//         </button>
//         <button onClick={nextPage} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
//           Next
//         </button>
//         <div className="mt-8 flex flex-col items-center">
//         {isValidId ? null : (
//             <p className="text-red-400 mb-4">Invalid product ID. Please enter a valid numeric ID.</p>
//           )}
//         </div>

//           <div className='m-2 p-5 border border-black shadow-lg rounded-lg flex flex-col items-center'>
//             <h1 className='text-4xl font-bold'>        {products?.title}</h1>
//             <p>       ${products?.price}</p>
//             <br></br>
//             <p>       {products?.description}</p>
//             <br></br>
//             <Image
//                 src={products?.images?.[0] || "/placeholder.png"} // fallback image
//                 alt={products?.title || "Product image"}
//                 width={400}
//                 height={400}
//                 priority
//               />
  
//               <br></br><br></br>
//               <div className='flex justify-center items-center'>              
//                 {products && <AddToCartButton product={products} />}
//                   {showAct ? (
//                 <button className='border border-black rounded-md m-2 text-sm p-2 shadow-xl cursor-pointer hover:scale-110 active:scale-90 transition-transform' onClick={() => window.location.href = `/products/${id}/edit`}>Edit Product</button>
//                 ) : null}
//               </div>

//         </div>
//         <div className="mb-6">

//             <div className='m-3 p-3'>
//         <button onClick={prevPage} disabled={currentPage <= 1} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2">
//           Previous
//         </button>
//         <button onClick={nextPage} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
//           Next
//         </button>
//             </div>

//     <br></br>
//               <a
//             href="/products"
//             className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Products
//           </a>
//         </div>

//         {/* TODO 17: Add ProductDetail component */}
//         {/* This component will handle all product display logic */}
//       </div>
//     </div>
//   )
// }
// // }

// export default page



import { getProduct } from "../../lib/api";
import { Product } from "../../types/product";
import ProductClient from "./ProductClient"; // Client-side component for cart/admin logic

// Enable ISR by defining `revalidate`
export const revalidate = 60; // ✅ Regenerate every 60 seconds (ISR)

export default async function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  // Fetch data on the server for ISR
  const product: Product = await getProduct(id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  // Pass product data to the client-side component
  return <ProductClient product={product} id={id} />;
}