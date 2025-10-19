// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
// }

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   const handleRemove = (id: number) => {
//     const updated = cartItems.filter((item) => item.id !== id);
//     setCartItems(updated);
//     localStorage.setItem("cart", JSON.stringify(updated));
//   };

//   if (cartItems.length === 0)
//     return <div className="text-center mt-10">🛒 Your cart is empty.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       <ul className="space-y-4">
//         {cartItems.map((item) => (
//           <li
//             key={item.id}
//             className="border rounded-lg p-4 flex justify-between items-center"
//           >
//             <div className="flex items-center space-x-4">
//               <img src={item.image} alt={item.title} className="w-16 h-16 rounded" />
//               <div>
//                 <h2 className="font-semibold">{item.title}</h2>
//                 <p>${item.price}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleRemove(item.id)}
//               className="text-white hover:scale-110 active:scale-90 bg-blue-800 p-5 rounded-lg cursor-pointer"
//             >
//               Remove
//             </button>
//           </li>
//         ))}
//       </ul>
//       <Link href="/checkout">
//         <button className="mt-4 bg-blue-800 text-white p-4 rounded-lg">
//           Checkout
//         </button>
//       </Link>
//     </div>
//   );
// }



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