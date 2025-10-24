"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Product, ProductFormData } from '@/app/types/product';
import { createProduct, updateProduct } from '@/app/lib/api';

interface ProductFormProps {
  product?: Product;
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
        title: product?.title || '',
        price: product?.price || 0,
        description: product?.description || '',
        categoryId: product?.categoryId || 0,
        // images: [product?.images?.join(', ') || '']
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // TODO 12: Implement form submission handler
  // This should handle both create and update operations, validate data
  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      const productData = {
        title: data?.title || '',
        price: Number(data.price) || 0,
        description: data?.description || '',
        categoryId: Number(data?.categoryId) || 0,
      };


      let result: Product;
      if (product) {
        result = await updateProduct(product.id, productData);
        setSuccessMessage('Product updated successfully!');
      } else {
        result = await createProduct(productData);
        setSuccessMessage('Product created successfully!');
        reset();
      }

      onSuccess?.(result);
    } catch (err) {
      setError(product ? 'Failed to update product. Please try again.' : 'Failed to create product. Please try again.');
      console.error('Error saving product:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-black mb-6">
        {product ? 'Edit Product' : 'Create New Product'}
      </h2>

      {error && (
        <div className="bg-red-600 text-black p-4 rounded-md mb-4">{error}</div>
      )}
      {successMessage && (
        <div role='status' className="bg-green-600 text-black p-4 rounded-md mb-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor='Title'>Product Title *</label>
            <input
              {...register('title', {
                // required: 'Title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              id='Title'
              className="w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product title" 
            />
            {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="Description">Description *</label>
            <textarea
              {...register('description', {
                // required: 'description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
              id='Description'
              rows={4}
              className="w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"
            />
            {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor='Price'>Price ($) *</label>
            <input
              type="number"
              step="0.01"
              {...register('price', {
                // required: 'Price is required',
                min: { value: 0, message: 'Price must be positive' }
              })}
              id='Price'
              className="w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
            {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>}
          </div>

        </div>

                            <div>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor='categoryId'>CategoryId *</label>
            <input
              type="number"
       
              {...register('categoryId', {
                // required: 'categoryId is required',
                min: { value: 0, message: 'id must be positive' }
              })}
              id='categoryId'
              className="w-full px-3 py-2 bg-white border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
            {errors.categoryId && <p className="text-red-400 text-sm mt-1">{errors.categoryId.message}</p>}
          </div>

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-md transition-colors disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </button>
        </div>
      </form>
    </div>
  );
}