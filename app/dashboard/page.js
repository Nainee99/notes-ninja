"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import {
  Home,
  FileText,
  Upload,
  Settings,
  HelpCircle,
  Search,
  Edit2,
  Trash2,
  Plus,
  Clock,
  TrendingUp,
  BrainCircuit,
  ListChecks,
  Sparkles,
} from "lucide-react";

// Sidebar Component
function Sidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "Notes", id: "notes" },
    { icon: Upload, label: "Uploads", id: "uploads" },
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

// TopNavBar Component
function TopNavBar() {
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

// NoteGrid Component
function NoteGrid() {
  const dummyNotes = [
    {
      id: 1,
      title: "Meeting Notes",
      preview: "Discussed project timeline and...",
      timestamp: "2023-04-15 14:30",
    },
    {
      id: 2,
      title: "Ideas for New Feature",
      preview: "User authentication using...",
      timestamp: "2023-04-14 09:15",
    },
    {
      id: 3,
      title: "Bug Fixes",
      preview: "Fixed issue with data loading...",
      timestamp: "2023-04-13 16:45",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-700 p-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-300 mb-4">{note.preview}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">{note.timestamp}</span>
              <div className="space-x-2">
                <button className="text-blue-400 hover:text-blue-300">
                  <Edit2 size={18} />
                </button>
                <button className="text-red-400 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// AnalyticsOverview Component
function AnalyticsOverview() {
  const stats = [
    { icon: FileText, label: "Total Notes", value: "42" },
    { icon: Clock, label: "Recently Accessed", value: "12" },
    { icon: TrendingUp, label: "Usage This Week", value: "78%" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-gray-700 p-6 rounded-lg shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <stat.icon className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// NewNoteButton Component
function NewNoteButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg"
    >
      <Plus size={24} />
    </motion.button>
  );
}

// Main Dashboard Component
export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <div className="flex flex-col flex-1 overflow-hidden ml-64">
        <TopNavBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <AnalyticsOverview />
            <NoteGrid />
          </motion.div>
        </main>
      </div>
      <NewNoteButton />
    </div>
  );
}
