import {Product,ProductsResponse,ProductFormData} from '@/app/types/product';
import axios from 'axios';

const DUMMY_URL = 'https://api.escuelajs.co/api/v1/';

export async function getProduct(id:number):Promise<Product>{
    try{
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        console.log("from getproductid"+response)
        return response.data;
    }catch(error){
        console.error("Error Fetching Product", error);
        throw new Error('Failed to fetch product');

    }
}


export async function updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
  try {
    const productData = {
        // id: id,
        title: data.title,
        // slug: data.title,
         price: data.price ? Number(data.price) : undefined,
        description: data.description,
        categoryId: data.categoryId ? Number(data.categoryId) : undefined,
        images: ['https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png']
    };

    const response = await axios.put(`${DUMMY_URL}products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id:number): Promise<void>{
    try{
        await axios.delete(`${DUMMY_URL}products/${id}`);
        console.log('product deleted');

    }catch(error){
        console.error('Error deleting a product',error);
        throw new Error('failed to delete a product');
    }
}