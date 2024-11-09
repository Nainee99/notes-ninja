"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import FileUploadDialog from "./FileUploadDialog";

export function NewNoteButton() {
  return (
    <FileUploadDialog>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg"
      >
        <Plus size={24} />
      </motion.button>
    </FileUploadDialog>
  );
}
