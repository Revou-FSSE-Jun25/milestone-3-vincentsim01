"use client"
import {useState,useEffect} from 'react';
import { Product } from '@/types/product';
import { getProducts, deleteProduct } from '@/app/lib/api';
import React from 'react';
import ProductCard from './productCard';

interface ProductListProps{
    showActions?: boolean;
    searchResults?: Product[] | null;
    isSearching?: boolean;
    // searchQuery?: string;
}

export default function ProductList(
    {
        showActions = false,
        searchResults = null,
        isSearching = false
        // ,searchQuery = ''
    }:ProductListProps

)

    {
        const [products, setProducts] = useState<Product[]>([]);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string|null>(null);

        const fetchProducts = async () =>{
            try{
                setLoading(true);
                setError(null);
                const response = await getProducts();
                setProducts(response);
                // console.log(response);
            }catch(error){
                setError('Failed to fetch products. Please try again')
                console.error('Error fetching products:', err);

            }finally{
                setLoading(false);

            }
        }

        useEffect(() => {
            fetchProducts();
        },[]);

        // useEffect(()=>{
        //     if(searchResults!==null){
        //         setLoading(false);
        //     }
        // },[searchResults]);


        // const handleDelete = async (id:number) =>{
        //     try{
        //         await deleteProduct(id);
        //         setProducts(products.filter(product => product.id !== id));
        //     }catch(err){
        //         setError('Failed to delete product. Please try again.');
        //         console.error('Error deleting product:', err);
        //     }
        // }

          // Show loading spinner when searching
        // if (isSearching) {
        //     return (
        //     <div className="flex justify-center items-center h-64">
        //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        //     </div>
        //     );
        // }

        // Show loading spinner when initially loading
        if (loading) {
            return (
            <div className="flex justify-center items-center h-64">
                {/* <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div> */}
                LOADING...
            </div>
            );
        }

          if (error) {
                return (
                <div className="text-center py-12">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={fetchProducts} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                    Retry
                    </button>
                </div>
                );
            }

            // Determine which products to display
            // const displayProducts = searchResults !== null ? searchResults : products;
            const displayProducts = products;

              // Show no results message for search
            // if (searchResults !== null && searchResults.length === 0) {
            //     return (
            //     <div className="text-center py-12">
            //         <p className="text-gray-400">No products found for "{searchQuery}".</p>
            //     </div>
            //     );
            // }

            // Show no products message for empty catalog
            // if (displayProducts.length === 0||null) {
            //     return (
            //     <div className="text-center py-12">
            //         <p className="text-gray-400">No products available.</p>
            //     </div>
            //     );
            // }

            return(
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* {displayProducts.map((product) => 


                    (
                        <ProductCard
                        key={product.id}
                        product={product}
                        // onDelete={handleDelete}
                        showActions={showActions}
                        />
                   

                    

                    )
                    
                    
                    
                    
                    )} */}

                    {displayProducts.map((item)=>{
                        return(
                        
                                    <ProductCard
                                    key={item.id}
                                    product={item}
                                    // onDelete={handleDelete}
                                    showActions={showActions}
                                    />
                            
                        )
                    })}
                </div>

            )

};
