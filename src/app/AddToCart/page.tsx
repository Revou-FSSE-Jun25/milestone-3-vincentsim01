"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  if (cartItems.length === 0)
    return <div className="text-center mt-10">🛒 Your cart is empty.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="text-white hover:scale-110 active:scale-90 bg-blue-800 p-5 rounded-lg cursor-pointer"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <Link href="/checkout">
        <button className="mt-4 bg-blue-800 text-white p-4 rounded-lg">
          Checkout
        </button>
      </Link>
    </div>
  );
}
