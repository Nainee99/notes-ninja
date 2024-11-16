import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0/month",
    features: [
      "Up to 5 PDFs",
      "Basic AI analysis",
      "Email support",
      "1 GB storage",
    ],
  },
  {
    name: "Pro",
    price: "$19.99/month",
    features: [
      "Unlimited PDFs",
      "Advanced AI analysis",
      "Priority support",
      "10 GB storage",
      "Collaboration features",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom pricing",
    features: [
      "Unlimited PDFs",
      "Advanced AI analysis",
      "24/7 dedicated support",
      "Unlimited storage",
      "Advanced collaboration",
      "Custom integrations",
    ],
  },
];

export function PlanComparison() {
  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Plan Comparison</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="text-green-500 mr-2" size={16} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
