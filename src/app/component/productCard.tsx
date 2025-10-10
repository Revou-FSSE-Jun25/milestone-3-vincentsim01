"use client"
import { Product } from '@/app/types/product';
import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './addToCartButton';

interface ProductCardProps{
    product: Product;
    onDelete?: (id:number) => void;
    showActions?: boolean;
}

export default function ProductCard({product, onDelete, showActions = false}: ProductCardProps){
    const handleDelete = () =>{
        if(window.confirm("Are you sure you want to delete this product?")){
            onDelete?.(product.id);
        }
    };

    return(
        <div className="bg-gray-800 rounded-lg shadow-lg border overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-120 bg-white p-5 rounded-md flex flex-col items-center">
            <Link href={`http://localhost:3000/products/${product.id}`}>
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized
                    width="300"
                    height="200"
                    onError={
                        (e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }
                    }
                />
            </Link>


                <div className="p-4">
                    <Link href={`http://localhost:3000/products/${product.id}`}>
                        <h3 className="text-lg font-semibold text-black mb-1 line-clamp-2">{product.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-black font-bold mx-auto">${product.price.toFixed(2)}</span>
                        </div>
                    </Link>

                    <AddToCartButton product={product} />


                        {showActions ? (
                            <div className="flex gap-2 mt-3">
                                <Link href={`/products/${product.id}/edit`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:scale-110 active:scale-90 px-3 py-2 rounded-md text-sm font-medium text-center">
                                Edit
                                </Link>
                                <button onClick={handleDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white cursor-pointer hover:scale-110 active:scale-90 px-3 py-2 rounded-md text-sm font-medium">
                                Delete
                                </button>
                            </div>
                            ) : 
                            
                            (
                            <Link href={`../products/${product.id}`} className="mt-3 bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 rounded-md text-center text-sm font-medium block cursor-pointer hover:scale-110 active:scale-90 transition-transform">
                                View Details
                            </Link>
                        )
                        }
                </div>
            </div>
        </div>
    )
}