"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function SecuritySection() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleCurrentPasswordVisibility = () =>
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  const toggleNewPasswordVisibility = () =>
    setIsNewPasswordVisible(!isNewPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword && confirmPassword) {
      // Add your password change logic here
      console.log("Password change submitted");
    } else {
      console.log("Please fill all fields");
    }
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Security</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="current-password" className="text-white">
            Current Password
          </Label>
          <div className="relative">
            <Input
              id="current-password"
              type={isCurrentPasswordVisible ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-gray-700 border-none outline-none text-white pr-10"
            />
            <button
              type="button"
              onClick={toggleCurrentPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              {isCurrentPasswordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="new-password" className="text-white">
            New Password
          </Label>
          <div className="relative">
            <Input
              id="new-password"
              type={isNewPasswordVisible ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-gray-700 border-none outline-none text-white pr-10"
            />
            <button
              type="button"
              onClick={toggleNewPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              {isNewPasswordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div>
          <Label htmlFor="confirm-password" className="text-white">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              type={isConfirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-700 border-none outline-none text-white pr-10"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              {isConfirmPasswordVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Change Password
        </Button>
      </form>
    </section>
  );
}
