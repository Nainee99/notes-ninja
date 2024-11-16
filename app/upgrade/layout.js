// app/upgrade/layout.js
import { NavigationBar } from "../workspace/_components/NavigationBar";

export default function UpgradeLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
