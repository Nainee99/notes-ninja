// app/upgrade/_components/UpgradePlan.jsx
import { PlanComparison } from "./PlanComparison";
import { PlanSelection } from "./PlanSelection";
import { PaymentForm } from "./PaymentForm";

export function UpgradePlan() {
  return (
    <div className="space-y-8 ">
      <PlanComparison />
      <PlanSelection />
      <PaymentForm />
    </div>
  );
}
