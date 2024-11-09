"use client";

import { motion } from "framer-motion";
import { AnalyticsOverview } from "./_components/AnalyticsOverview";
import { NoteGrid } from "./_components/NoteGrid";

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <AnalyticsOverview />
      <NoteGrid />
    </motion.div>
  );
}
