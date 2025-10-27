// "use client"
import {Product,ProductsResponse,ProductFormData} from '../types/product';
import axios from 'axios';

const DUMMY_URL = 'https://api.escuelajs.co/api/v1/'

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  image: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export async function getProducts(offset: number):Promise<Product[]>{
    try{
        const response = await axios.get(`${DUMMY_URL}products?offset=${offset}&limit=12`)
        return response.data;

    }catch (error){
        console.error('Error Fetching Products:', error);
        throw new Error('failed to fetch products');

    }
}

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

export async function searchProducts(query:string):Promise<ProductsResponse>{
    try{
        const response = await axios.get(`${DUMMY_URL}products/slug/${query}`);
        return response.data;

    }catch(error){
        console.error('Error Searching Product:', error);
        throw new Error ('Failed to search products');
    }
}


export const api = {
  // Authentication
  login: async (username: string, password: string) => {
    const response = await fetch(`${DUMMY_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        expiresInMins: 30, // optional, defaults to 60
      }),
      // Note: Removed credentials: 'include' due to CORS issues
      // We'll handle cookies manually in the login page
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    return response.json();
  },

  // Get current user info
  getCurrentUser: async () => {
    const token = getCookie('accessToken');

    const response = await fetch(`${DUMMY_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      // Note: No credentials needed since we'll send Authorization header
    });

    if (!response.ok) {
      throw new Error('Failed to get user info');
    }

    return response.json();
  },

  // Users - NEW: For async testing examples
  getUsers: async (): Promise<UsersResponse> => {
    const response = await fetch(`${DUMMY_URL}/users`);

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await fetch(`${DUMMY_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${id}`);
    }

    return response.json();
  },

  // Products (existing)
  getProducts: async (limit: number = 10): Promise<Product[]> => {
    const response = await fetch(`${DUMMY_URL}/products?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    return data.products;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await fetch(`${DUMMY_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return response.json();
  },

  // Search products (enhanced)
  searchProducts: async (query: string): Promise<ProductsResponse> => {
    const response = await fetch(`${DUMMY_URL}/products/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return response.json();
  },

  // NEW: Error simulation for testing error states
  triggerError: async (): Promise<void> => {
    const response = await fetch(`${DUMMY_URL}/error`);

    if (!response.ok) {
      throw new Error('Simulated API error for testing');
    }

    return response.json();
  }
};