import { Product } from '@/app/types/product';

export const mockProductList: Product[] = [{
  id: 1,
  title: "Wireless Bluetooth Headphones",
  slug: "wireless-bluetooth-headphones",
  price: 199.99,
  description: "High-quality over-ear wireless headphones with noise cancellation and long battery life.",
  categoryId: 2,
  images: [
    "https://via.placeholder.com/300x200?text=Headphones+1",
    "https://via.placeholder.com/300x200?text=Headphones+2"
  ]},
  {
    id: 2,
  title: "Cable Headphones",
  slug: "Cable-headphones",
  price: 99.99,
  description: "High-quality cable headphones with noise cancellation and long cable.",
  categoryId: 2,
  images: [
    "https://via.placeholder.com/300x200?text=Headphones+1",
    "https://via.placeholder.com/300x200?text=Headphones+2"
  ],
    }  ,
       {
    id: 3,
  title: "Magnet Headphones",
  slug: "Magnet-headphones",
  price: 1099.99,
  description: "High-quality magnet headphones with noise cancellation and long cable.",
  categoryId: 2,
  images: [
    "https://via.placeholder.com/300x200?text=Headphones+1",
    "https://via.placeholder.com/300x200?text=Headphones+2"
  ],
    }  
];