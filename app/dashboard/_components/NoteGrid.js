"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

export function NoteGrid() {
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
