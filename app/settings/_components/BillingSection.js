"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function BillingSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const router = useRouter();

  const handleChangePlan = () => {
    router.push("/upgrade");
  };

  const handleCancelSubscription = () => {
    setIsDialogOpen(true);
  };

  const handleSubmitCancel = () => {
    console.log("Cancelling subscription with reason:", reason);
    setIsDialogOpen(false);
    setReason("");
    toast.success(`Subscription canceled. Reason: ${reason}`);
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Billing Information
      </h2>
      <div className="space-y-4">
        <p className="text-gray-300">
          Current Plan: <span className="font-semibold text-white">Pro</span>
        </p>
        <p className="text-gray-300">
          Next billing date:{" "}
          <span className="font-semibold text-white">June 1, 2023</span>
        </p>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            onClick={handleChangePlan}
          >
            Change Plan
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white transition-colors"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border border-gray-700">
              <DialogTitle className="text-2xl font-semibold text-white">
                Confirm Cancellation
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Please let us know why you're canceling your subscription. Your
                feedback helps us improve.
              </DialogDescription>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right text-gray-300">
                    Reason
                  </Label>
                  <Input
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="col-span-3 bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter your reason"
                  />
                </div>
              </div>

              <DialogFooter className="sm:justify-between">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleSubmitCancel}
                >
                  Confirm Cancellation
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
