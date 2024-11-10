"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

export function PDFViewer({ fileUrl }) {
  const [pdfScale, setPdfScale] = useState(1);

  const handleZoomIn = () => {
    setPdfScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setPdfScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-1/2 p-6 bg-gray-800 border-l border-gray-700"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">PDF Viewer</h2>
        <div className="flex space-x-2">
          <Button
            onClick={handleZoomOut}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleZoomIn}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        className="bg-gray-700 rounded-lg overflow-hidden"
        style={{ height: "calc(100% - 60px)" }}
      >
        {/* Display the PDF using an iframe */}
        {fileUrl ? (
          <iframe
            src={fileUrl + "#toolbar=0"}
            title="PDF Viewer"
            className="w-full h-full"
            style={{
              transform: `scale(${pdfScale})`,
              transformOrigin: "top left",
            }}
            frameBorder="0"
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No PDF available
          </div>
        )}
      </div>
    </motion.div>
  );
}
