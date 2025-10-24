
"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
};

export default function CheckoutPage() {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const storedItems = localStorage.getItem("checkoutItems");
    if (storedItems) {
      const items = JSON.parse(storedItems);
      setCheckoutItems(items);
      const totalPrice = items.reduce(
        (sum: number, item: Product) => sum + item.price * (item.quantity || 1),
        0
      );
      setTotal(totalPrice);
    }
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {checkoutItems.length === 0 ? (
        <p>No items selected for checkout.</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Your Items</h2>

          {checkoutItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b py-2 text-gray-700"
            >
              <span>
                {item.title} × {item.quantity || 1}
              </span>
              <span>${item.price * (item.quantity || 1)}</span>
            </div>
          ))}

          <div className="mt-4 text-right text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => (window.location.href = "/payment")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}