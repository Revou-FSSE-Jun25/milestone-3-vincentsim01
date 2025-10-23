interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export const mockProductCard: Product = {
  id: 1,
  title: "Wireless Bluetooth Headphones",
  price: 199.99,
  images: [
    "https://via.placeholder.com/300x200?text=Headphones+1"
  ],
};
