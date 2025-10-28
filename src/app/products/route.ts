import {Product,ProductsResponse,ProductFormData} from '@/app/types/product';
import axios from 'axios';

const DUMMY_URL = 'https://api.escuelajs.co/api/v1/';

export async function getProducts(offset: number):Promise<Product[]>{
    try{
        const response = await axios.get(`${DUMMY_URL}products?offset=${offset}&limit=12`)
        return response.data;

    }catch (error){
        console.error('Error Fetching Products:', error);
        throw new Error('failed to fetch products');

    }
}

export async function createProduct(data:ProductFormData):Promise<Product>{
    try{
        const productData = {
            title: data.title,
            // slug: data.title,
            price: Number(data.price),
            description: data.description,
            categoryId: data.categoryId,
            images: ["https://i.ibb.co/zh3Wx2Lj/revoshop-logo-cropped.png"],


        }

        const response = await axios.post(`https://api.escuelajs.co/api/v1/products/`, productData);
        return response.data;

    }catch(error){
        console.error('Error Creating Product', error);
        throw new Error('Failed to create product');
    }

}