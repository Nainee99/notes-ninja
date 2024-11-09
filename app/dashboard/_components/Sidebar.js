// /app/dashboard/-components/Sidebar.js
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FileText,
  Upload,
  Settings,
  HelpCircle,
  BrainCircuit,
  ListChecks,
} from "lucide-react";

export function Sidebar() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "Notes", id: "notes" },
    {
      icon: BrainCircuit,
      label: "Question Generator",
      id: "question-generator",
    },
    { icon: ListChecks, label: "Quiz Builder", id: "quiz-builder" },
    { icon: Settings, label: "Account Settings", id: "settings" },
    { icon: HelpCircle, label: "Help & Support", id: "help" },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-900 text-white p-6 fixed h-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold">NotesNinja</h2>
      </div>
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`#${item.id}`}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                  activeSection === item.id
                    ? "bg-purple-700 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          Upgrade Plan
        </motion.button>
      </div>
    </motion.aside>
  );
}
