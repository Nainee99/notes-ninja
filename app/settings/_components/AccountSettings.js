// app/account/_components/AccountSettings.jsx
import { ProfileSection } from "./ProfileSection";
import { SecuritySection } from "./SecuritySection";
import { NotificationSection } from "./NotificationSection";
import { BillingSection } from "./BillingSection";

export function AccountSettings() {
  return (
    <div className="space-y-8">
      <ProfileSection />
      <SecuritySection />
      <NotificationSection />
      <BillingSection />
    </div>
  );
}
