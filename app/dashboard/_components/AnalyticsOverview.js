"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Clock, TrendingUp } from "lucide-react";

export function AnalyticsOverview() {
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
