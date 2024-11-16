"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log("Payment submitted");
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            className="bg-gray-700 border-none focus:outline-none text-white"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <Label htmlFor="expiry-date">Expiry Date</Label>
            <Input
              id="expiry-date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YY"
              className="bg-gray-700 border-none focus:outline-none text-white"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="123"
              className="bg-gray-700 border-none focus:outline-none text-white"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="name">Name on Card</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="bg-gray-700 border-none focus:outline-none text-white"
          />
        </div>
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 w-full"
        >
          Upgrade Now
        </Button>
      </form>
    </section>
  );
}
