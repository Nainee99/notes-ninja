"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Settings,
  HelpCircle,
  BrainCircuit,
  ListChecks,
} from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  // State to track the active section in the sidebar
  const [activeSection, setActiveSection] = useState("dashboard");

  // Define the navigation items for the sidebar
  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard", link: "/dashboard" },
    {
      icon: BrainCircuit,
      label: "Question Generator",
      id: "question-generator",
      link: "/question-generator",
    },
    {
      icon: ListChecks,
      label: "Quiz Builder",
      id: "quiz-builder",
      link: "/quiz-builder",
    },
    {
      icon: Settings,
      label: "Account Settings",
      id: "settings",
      link: "/settings",
    },
    { icon: HelpCircle, label: "Help & Support", id: "help", link: "/help" },
  ];

  return (
    <motion.aside
      initial={{ x: -250 }} // Slide in from left
      animate={{ x: 0 }} // End at position 0
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
              whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
              whileTap={{ scale: 0.95 }} // Shrink on tap/click
            >
              <Link href={item.link}>
                <div
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? "bg-purple-700 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setActiveSection(item.id)} // Set active section on click
                >
                  <item.icon className="w-5 h-5" /> {/* Icon size */}
                  <span>{item.label}</span> {/* Navigation label */}
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6">
        {/* Wrap the button with Link for navigation */}
        <Link href="/upgrade">
          <motion.button
            whileHover={{ scale: 1.05 }} // Button hover effect
            whileTap={{ scale: 0.95 }} // Button tap effect
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Upgrade Plan
          </motion.button>
        </Link>
      </div>
    </motion.aside>
  );
}
