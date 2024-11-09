"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export function TopNavBar() {
  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-gray-800 p-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <Sparkles className="h-8 w-8 text-purple-400" />
        <h1 className="text-xl font-bold">NotesNinja</h1>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      <UserButton />
    </motion.nav>
  );
}
