"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileSection() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20 bg-purple-600">
          {" "}
          {/* Changed the background color */}
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt={name} />
          <AvatarFallback className="bg-purple-600">
            {" "}
            {/* Set fallback background color */}
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <Button className="bg-indigo-500 text-white hover:bg-indigo-600">
          {" "}
          {/* Custom button color */}
          Change Avatar
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-700 focus:ring-0 border-none text-white outline-none" // Removed outline and customized color
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-700 focus:ring-0 border-none text-white outline-none" // Removed outline and customized color
          />
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white ">
          Save Changes
        </Button>
      </div>
    </section>
  );
}
