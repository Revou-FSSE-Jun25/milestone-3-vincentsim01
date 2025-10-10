"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductForm from '@/app/component/productForm';
import { Product } from '@/app/types/product';
import { getProduct } from '@/app/lib/api';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // TODO 20: Add product data fetching
  // Fetch product data when component mounts
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await getProduct(Number(productId));
      setProduct(productData);
    } catch (err) {
      setError('Failed to fetch product details.');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductUpdate = async (updatedProduct: Product) => {
    alert(`Product "${updatedProduct.title}" updated successfully!`);
    router.push(`/products/${productId}`);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      router.push(`/products/${productId}`);
    }
  };

  const isValidId = /^\d+$/.test(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !isValidId || !product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">
            {!isValidId ? 'Invalid Product ID' : 'Product Not Found'}
          </h1>
          <p className="text-gray-400 mb-8">
            {!isValidId ? 'The product ID is not valid.' : error || 'The product doesn\'t exist.'}
          </p>
          <a href="/products" className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-md transition-colors inline-block">
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
              <p className="text-gray-400">Update information for "{product.title}"</p>
            </div>
            <button
              onClick={handleCancel}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
            </li>
            <li className="text-gray-600">/</li>
            <li>
              <a href={`/products/${productId}`} className="text-gray-400 hover:text-white transition-colors">
                {product.title}
              </a>
            </li>
            <li className="text-gray-600">/</li>
            <li className="text-white">Edit</li>
          </ol>
        </nav>

        {/* TODO 21: Add product summary and form */}
        <div className="mb-6 bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="text-white font-medium">{product.title}</h3>
              <p className="text-gray-400 text-sm">
          • ${product.price.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
            </div>
          </div>
        </div>

        <ProductForm
          product={product}
          onSuccess={handleProductUpdate}
          onCancel={handleCancel}
        />

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.push(`/products/${productId}`)}
            className="bg-white hover:scale-105 text-gray-900 px-6 py-2 rounded-md transition-colors"
          >
            ← Back to Product
          </button>
          <button
            onClick={() => router.push('/products')}
            className="bg-white hover:scale-105 text-gray-900 px-6 py-2 rounded-md transition-colors"
          >
            Products List →
          </button>
        </div>
      </div>
    </div>
  );
}