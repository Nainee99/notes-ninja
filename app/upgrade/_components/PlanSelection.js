"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const plans = [
  { id: "basic", name: "Free", price: "$0/month", highlight: false },
  { id: "pro", name: "Pro", price: "$19.99/month", highlight: true },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom pricing",
    highlight: false,
  },
];

export function PlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Select Your Plan</h2>
      <RadioGroup
        value={selectedPlan}
        onValueChange={setSelectedPlan}
        className="space-y-4"
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex items-center space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${
              selectedPlan === plan.id
                ? "bg-purple-700 text-white"
                : "bg-gray-700 hover:bg-gray-600"
            } ${plan.highlight ? "border-2 border-purple-500 shadow-lg" : ""}`}
            onClick={() => setSelectedPlan(plan.id)}
          >
            {/* Styled Radio Button */}
            <div
              className={`w-6 h-6 flex justify-center items-center border-2 rounded-full transition ${
                selectedPlan === plan.id
                  ? "border-white bg-purple-500"
                  : "border-gray-400 bg-gray-800"
              }`}
            >
              {selectedPlan === plan.id && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
            {/* Label Content */}
            <Label
              htmlFor={plan.id}
              className="flex justify-between w-full text-lg font-medium"
            >
              <span>{plan.name}</span>
              <span>{plan.price}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </section>
  );
}
