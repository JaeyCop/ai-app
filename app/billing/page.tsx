"use client";

import React, { useState } from "react";

const plans = [
  { name: "Starter", price: 0, features: ["5 generations/month", "Basic templates", "Community support"] },
  { name: "Pro", price: 20, features: ["Unlimited generations", "Advanced templates", "Export & analytics", "Priority support"] },
];

export default function BillingPage() {
  const [selected, setSelected] = useState("Pro");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    // Simulate subscription (replace with Stripe integration in production)
    setSubscribed(true);
    alert("Subscription successful! (Simulated)");
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-ai-black via-gray-900 to-ai-black">
      <h1 className="text-3xl font-bold mb-6 text-ai-green">Subscription & Billing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {plans.map(plan => (
          <div key={plan.name} className={`bg-ai-black border rounded-lg p-6 flex flex-col items-center ${selected === plan.name ? 'border-ai-orange' : 'border-ai-green'}`}>
            <h2 className="text-2xl font-bold text-ai-green mb-2">{plan.name}</h2>
            <div className="text-4xl font-bold text-ai-orange mb-2">{plan.price === 0 ? 'Free' : `$${plan.price}/mo`}</div>
            <ul className="mb-4 text-gray-300 list-disc list-inside">
              {plan.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <button
              className={`px-4 py-2 rounded font-semibold transition-colors ${selected === plan.name ? 'bg-ai-orange text-white' : 'bg-gray-700 text-gray-300 hover:bg-ai-green hover:text-white'}`}
              onClick={() => setSelected(plan.name)}
            >
              {selected === plan.name ? 'Selected' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="bg-ai-green text-white px-6 py-3 rounded font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          onClick={handleSubscribe}
          disabled={subscribed || selected === 'Starter'}
        >
          {subscribed ? 'Subscribed!' : selected === 'Starter' ? 'Current Plan' : 'Subscribe Now'}
        </button>
      </div>
      <p className="text-center text-gray-400 mt-4">(Stripe or payment integration goes here in production)</p>
    </div>
  );
}
