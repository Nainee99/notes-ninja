"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function NotificationSection() {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Notification Settings
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-notifications" className="text-white">
            Email Notifications
          </Label>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
            className="bg-gray-600 data-[state=checked]:bg-purple-600 ring-offset-2 ring-gray-700 focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="push-notifications" className="text-white">
            Push Notifications
          </Label>
          <Switch
            id="push-notifications"
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
            className="bg-gray-600 data-[state=checked]:bg-purple-600 ring-offset-2 ring-gray-700 focus:ring-2 focus:ring-purple-600"
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="newsletter" className="text-white">
            Newsletter Subscription
          </Label>
          <Switch
            id="newsletter"
            checked={newsletter}
            onCheckedChange={setNewsletter}
            className="bg-gray-600 data-[state=checked]:bg-purple-600 ring-offset-2 ring-gray-700 focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>
    </section>
  );
}
