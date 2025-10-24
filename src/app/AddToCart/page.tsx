
"use client";
import { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, getTotal, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleProceedToCheckout = () => {
    const selectedProducts = cart.filter((item) =>
      selectedItems.includes(item.id)
    );
    localStorage.setItem("checkoutItems", JSON.stringify(selectedProducts));
    router.push("/checkout");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                />
                <span>
                  {item.title} × {item.quantity} — $
                  {item.price * (item.quantity || 1)}
                </span>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <h2 className="text-xl mt-4 font-semibold">
            Total: ${getTotal().toFixed(2)}
          </h2>

          <div className="mt-6 flex gap-4">
            <button
              onClick={clearCart}
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Clear Cart
            </button>

            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0}
              className={`px-4 py-2 rounded-md ${
                selectedItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}