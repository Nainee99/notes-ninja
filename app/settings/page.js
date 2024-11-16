"use client";

import { NavigationBar } from "../workspace/_components/NavigationBar";
import { AccountSettings } from "./_components/AccountSettings";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
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
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>
        <AccountSettings />
      </div>
    </div>
  );
}
