"use client"
import React from 'react'
import {getProduct} from '../../lib/api'

const page = async ({ params }: { params: { id: string } }) => {
    const productId = await params.id;
    const isValidId = /^\d+$/.test(productId);
    // const fetchedData = await getProduct(Number(productId));

  return (
    <div className="min-h-screen bg-gray-900">
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
            <li className="text-white truncate max-w-xs">Product {productId}</li>
          </ol>
        </nav>

        <div className='m-2 p-5 border border-black shadow-lg rounded-lg flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Produt Title</h1>
            <p>Rp 50.000</p>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Woman%27s_shirt_from_Kutch%2C_Gujarat%2C_India%2C_IMA_55114.jpg/640px-Woman%27s_shirt_from_Kutch%2C_Gujarat%2C_India%2C_IMA_55114.jpg' className='rounded-md border border-black'></img>
        </div>
        {/* {fetchedData.title}
        {fetchedData.price}
        {fetchedData.description} */}
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
        This is Product {productId}
      </div>
    </div>
  )
}

export default page
