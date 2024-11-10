"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { NavigationBar } from "../_components/NavigationBar";
import { TextEditor } from "../_components/TextEditor";
import { PDFViewer } from "../_components/PDFViewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <NavigationBar />
      <div className="flex flex-1 overflow-hidden">
        <TextEditor />
        <PDFViewer fileUrl={fileInfo?.fileUrl} />
      </div>
    </div>
  );
}
