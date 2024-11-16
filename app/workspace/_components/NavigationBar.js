"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";

export function NavigationBar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-purple-700">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-2xl font-bold flex items-center space-x-2 "
      >
        <Sparkles className="h-8 w-8 text-purple-400" />
        <span>NoteNinja</span>
      </motion.div>
      <UserButton
        appearance={{
          elements: {
            avatarBox: "h-10 w-10",
            userButtonPopoverCard: "bg-gray-800 border border-gray-700",
            userButtonPopoverText: "text-gray-200",
          },
        }}
      />
    </nav>
  );
}
