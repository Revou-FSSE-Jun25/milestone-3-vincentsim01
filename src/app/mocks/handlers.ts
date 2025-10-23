import { rest } from 'msw';

// DummyJSON API base URL
const API_BASE = 'https://dummyjson.com';

// Mock users data
const mockUsers = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    image: 'https://dummyjson.com/icon/johndoe/128',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    username: 'janesmith',
    image: 'https://dummyjson.com/icon/janesmith/128',
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob.johnson@example.com',
    username: 'bobjohnson',
    image: 'https://dummyjson.com/icon/bobjohnson/128',
  },
];

// Mock products data
const mockProducts = [
  {
    id: 1,
    title: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced features',
    price: 999,
    brand: 'Apple',
    category: 'smartphones',
    thumbnail: 'https://dummyjson.com/image/300',
  },
  {
    id: 2,
    title: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone',
    price: 899,
    brand: 'Samsung',
    category: 'smartphones',
    thumbnail: 'https://dummyjson.com/image/300',
  },
  {
    id: 3,
    title: 'MacBook Pro',
    description: 'Powerful laptop for professionals',
    price: 1999,
    brand: 'Apple',
    category: 'laptops',
    thumbnail: 'https://dummyjson.com/image/300',
  },
];


export const handlers = [];