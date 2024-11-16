"use client";

import { UpgradePlan } from "./_components/UpgradePlan";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleGoBack}
            className="mr-4 text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft size={24} />
            <span className="sr-only">Go back</span>
          </Button>
          <h1 className="text-3xl font-bold">Upgrade Your Plan</h1>
        </div>
        <UpgradePlan />
      </div>
    </div>
  );
}
