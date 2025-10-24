"use client";

import React from "react";
import { useCart } from "@/app/context/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  // totalItems: number;
}

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    // Get existing cart items or create empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists
    const isExisting = existingCart.some((item: Product) => item.id === product.id);

    if (isExisting) {
      alert("Item is already in your cart!");
      return;
    }

    addToCart(product);

    // Add new item
    const updatedCart = [...existingCart, product];

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
    >
      Add to Cart
    </button>
  );
}
