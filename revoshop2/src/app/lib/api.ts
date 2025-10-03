"use client"
import {Product,ProductsResponse} from '../types/product';
import axios from 'axios';

const DUMMY_URL = 'https://api.escuelajs.co/api/v1/'


export async function getProducts():Promise<ProductsResponse>{
    try{
        const response = await axios.get(`${DUMMY_URL}products`)
        return response.data;
    }catch (error){
        console.error('Error Fetching Products:', error);
        throw new Error('failed to fetch products');

    }
}

export async function getProduct(id:number):Promise<Product>{
    try{
        const response = await axios.get(`${DUMMY_URL}products/${id}`);
        return response.data;
    }catch(error){
        console.error("Error Fetching Product", error);
        throw new Error('Failed to fetch product');

    }
}