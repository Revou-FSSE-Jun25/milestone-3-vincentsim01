"use client";

import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const handleAddToCart = () => {
    // Get existing cart items or create empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if item already exists
    const isExisting = existingCart.some((item: Product) => item.id === product.id);

    if (isExisting) {
      alert("Item is already in your cart!");
      return;
    }

    // Add new item
    const updatedCart = [...existingCart, product];

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert(`${product.title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
    >
      Add to Cart
    </button>
  );
}
