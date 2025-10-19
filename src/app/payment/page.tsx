// "use client";

// import React, { useEffect, useState } from "react";

// type CheckoutItem = {
//   id: number;
//   title: string;
//   price: number;
// };

// export default function PaymentPage() {
//   const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
//   const [total, setTotal] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string>("");

//   useEffect(() => {
//     const items = localStorage.getItem("checkoutItems");
//     const totalPrice = localStorage.getItem("checkoutTotal");

//     if (items && totalPrice) {
//       setCheckoutItems(JSON.parse(items));
//       setTotal(JSON.parse(totalPrice));
//     }
//   }, []);

//   const handlePayment = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method before proceeding.");
//       return;
//     }
//     alert(`Payment successful with ${paymentMethod}! Total: $${total}`);
//     // Here you could clear cart or redirect to confirmation page
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
//       <h1 className="text-2xl font-semibold mb-6 text-center">Payment</h1>

//       {checkoutItems.length === 0 ? (
//         <p className="text-gray-500 text-center">
//           No items selected for checkout.
//         </p>
//       ) : (
//         <>
//           <ul className="divide-y mb-6">
//             {checkoutItems.map((item) => (
//               <li key={item.id} className="flex justify-between py-3">
//                 <span>{item.title}</span>
//                 <span className="font-medium">${item.price}</span>
//               </li>
//             ))}
//           </ul>

//           <div className="flex justify-between items-center border-t pt-4 mb-6">
//             <span className="text-lg font-semibold">Total:</span>
//             <span className="text-xl font-bold">${total}</span>
//           </div>

//           <div className="mb-6">
//             <h2 className="font-medium mb-3">Select Payment Method:</h2>
//             <div className="space-y-2">
//               {["Credit Card", "Bank Transfer", "Cash on Delivery", "Cryptocurrency"].map(
//                 (method) => (
//                   <label key={method} className="flex items-center gap-3">
//                     <input
//                       type="radio"
//                       name="payment"
//                       value={method}
//                       checked={paymentMethod === method}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                     />
//                     {method}
//                   </label>
//                 )
//               )}
//             </div>
//           </div>

//           <button
//             onClick={handlePayment}
//             className={`w-full py-3 rounded-lg text-white font-medium ${
//               paymentMethod
//                 ? "bg-green-600 hover:bg-green-700"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//             disabled={!paymentMethod}
//           >
//             Confirm Payment
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
};

export default function PaymentPage() {
  const [checkoutItems, setCheckoutItems] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit_card");

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

  const handlePayment = () => {
    alert(`Payment successful using ${paymentMethod}! Total: $${total}`);
    localStorage.removeItem("checkoutItems");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>

      {checkoutItems.length === 0 ? (
        <p>No items to pay for.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

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
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Choose Payment Method</h2>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full mb-4"
            >
              <option value="credit_card">💳 Credit Card</option>
              <option value="bank_transfer">🏦 Bank Transfer</option>
              <option value="cod">🚚 Cash on Delivery</option>
              <option value="crypto">🪙 Cryptocurrency</option>
              <option value="kidney">🧫 Kidney</option>
            </select>

            <button
              onClick={handlePayment}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-full"
            >
              Confirm Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
}