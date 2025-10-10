export const metadata = {
  title: "Promotions | Revoshop",
  description: "Check out the latest Revoshop promotions and discounts.",
};

export default function PromotionPage() {
  const promotions = [
    {
      title: "🎉 New User Discount",
      description: "If you’re a new user, you’ll receive a 10% discount on your first purchase!",
    },
    {
      title: "🕓 Limited Time Offer",
      description:
        "Buy before 31st October 2025 and enjoy an additional 10% discount off your total order.",
    },
  ];

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Revoshop Promotions</h1>

      <p className="text-lg text-gray-700 mb-8 text-center">
        Don’t miss these exclusive Revoshop offers! Shop smart, save big.
      </p>

      <div className="space-y-8">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              {promo.title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{promo.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 italic">
          *Terms and conditions apply. Promotions valid while stocks last.
        </p>
      </div>
    </main>
  );
}