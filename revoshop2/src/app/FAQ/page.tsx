export const metadata = {
  title: "FAQ | Revoshop",
  description: "Frequently Asked Questions about Revoshop",
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Revoshop?",
      answer:
        "Revoshop is one of the top e-commerce platforms in Indonesia, generating 1 billion Rupiah in revenue every 100 years.",
    },
    {
      question: "What items are sold by Revoshop?",
      answer:
        "Revoshop sells clothing, apparel, accessories, and a few mysterious test items.",
    },
    {
      question: "When was Revoshop established?",
      answer: "Revoshop was established in 1990.",
    },
    {
      question: "Is there any free delivery?",
      answer:
        "Only if you purchase more than Rp100 million worth of items.",
    },
    {
      question: "Any promotion?",
      answer:
        "Psst… it’s a secret! But if you shout to the sky five times saying 'I love Revoshop', you might just get a free item 😉",
    },
  ];

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2 text-blue-700">
              {faq.question}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}