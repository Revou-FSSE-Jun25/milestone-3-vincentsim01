"use client"; // if using App Router

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
};

export default function ProductsClient() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Client Fetched Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} – ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
