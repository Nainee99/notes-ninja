"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export function NoteGrid() {
  const { user } = useUser(); // Retrieve the current user using Clerk's hook
  // Fetch the user's files from the server using the Convex query
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  // Function to format the timestamp into a readable date
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-8">
      {/* The grid layout to display the files */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fileList?.map((file) => (
          // Wrap each file in a link to navigate to the workspace page for the file
          <Link key={file.fileId} href={"/workspace/" + file.fileId}>
            <motion.div
              // Animation using framer-motion for smooth transition effects
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-700 p-4 rounded-lg shadow-lg"
            >
              {/* File name */}
              <h3 className="text-xl font-semibold mb-2">{file.fileName}</h3>
              {/* File size or a fallback message */}
              <p className="text-gray-300 mb-4">
                {file.size
                  ? `File size: ${file.size} KB`
                  : "No additional details"}
              </p>
              <div className="flex justify-between items-center">
                {/* File creation timestamp */}
                <span className="text-sm text-gray-400">
                  {file._creationTime
                    ? formatTimestamp(file._creationTime)
                    : "Unknown date"}
                </span>
                {/* Action buttons (Edit and Delete) */}
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
          </Link>
        ))}
      </div>
    </div>
  );
}
