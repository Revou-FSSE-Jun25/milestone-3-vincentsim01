"use client";

import React, { useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Load cart from localStorage
  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // Update total whenever selected items change
  useEffect(() => {
    const totalPrice = cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  }, [selectedItems, cartItems]);

  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-4">
                <div>
                  <h2 className="text-lg font-medium">{item.title}</h2>
                  <p className="text-gray-500">${item.price}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-5 h-5"
                />
              </li>
            ))}
          </ul>

          <div className="border-t mt-6 pt-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-xl font-bold">${total}</span>
          </div>

          <button
            disabled={selectedItems.length === 0}
            className={`mt-6 w-full py-3 rounded-lg text-white font-medium ${
              selectedItems.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={() => {
  const selected = cartItems.filter((item) => selectedItems.includes(item.id));
  localStorage.setItem("checkoutItems", JSON.stringify(selected));
  localStorage.setItem("checkoutTotal", JSON.stringify(total));
  window.location.href = "/payment";
}}
          >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}