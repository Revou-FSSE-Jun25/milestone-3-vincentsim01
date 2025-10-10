// "use client"

import React from 'react'
import { Metadata } from 'next';
import productPage from './productPage';


export const metadata:Metadata = {
    title: 'Products - Our Product Catalog',
    description: 'Browse our complete catalog of products.',
    keywords: ['products','catalog','shopping','clothing'],
    openGraph:{
        title: 'Products - Our Product Catalog',
        description: 'Browse our complete catalog of products with detailed information and pricing.',
        type: 'website',
    },
    twitter:{
        title:'Products - Our Product Catalog',
        card: 'summary_large_image',
        description: 'Browse our complete catalog of products with detailed information and pricing.',
    }
};

export default productPage
