"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const FileUploadDialog = ({ children }) => {
  // Define API mutations and actions
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addEntryToDb = useMutation(api.fileStorage.addEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddedDocument = useAction(api.myActions.ingest);
  const { user } = useUser();

  // Local state management
  const [fileName, setFileName] = useState(""); // The name of the selected file
  const [uploadedName, setUploadedName] = useState(""); // The name to be displayed after upload
  const [isUploading, setIsUploading] = useState(false); // To track the upload process
  const fileInputRef = useRef(null); // Reference for the file input element

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedName(file.name);
    }
  };

  // Handle file upload process
  const handleUpload = async () => {
    if (!fileName) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true); // Set uploading state to true while the file uploads

    try {
      // Step 1: Generate a short-lived URL for uploading the file
      const postUrl = await generateUploadUrl();

      // Step 2: Send the selected file to the upload URL
      const file = fileInputRef.current.files[0];
      if (!file) {
        alert("No file selected");
        setIsUploading(false);
        return;
      }

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // Retrieve the storage ID after upload
      const { storageId } = await result.json();
      console.log(
        `File uploaded successfully! Storage ID: ${storageId} File Name: ${uploadedName}`
      );

      // Step 3: Save file metadata in the database
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId: storageId });
      const response = await addEntryToDb({
        fileId: fileId,
        storageId: storageId,
        fileName: uploadedName ?? "untitled file",
        fileUrl: fileUrl,
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
      });
      console.log(response);

      // Call an API to process the PDF data
      const ApiResponse = await axios.get("/api/pdf-loader?PDFUrl=" + fileUrl);
      console.log(ApiResponse.data.result);

      // Ingest the processed PDF data
      await embeddedDocument({
        splitText: ApiResponse.data.result,
        fileId: fileId,
      });

      // Close the dialog box after a successful upload
      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      // Reset states after upload
      setIsUploading(false);
      setFileName("");
      setUploadedName("");
    }
  };

  // Handle dialog close action
  const handleClose = () => {
    setFileName("");
    setUploadedName("");
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select a File</DialogTitle>
          <DialogDescription>
            Choose a file to upload. The file name will be displayed below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-upload" className="col-span-4">
              Select File
            </Label>
            <Input
              id="file-upload"
              type="file"
              className="col-span-4"
              onChange={handleFileChange}
              ref={fileInputRef}
              accept="application/pdf"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file-name" className="text-right">
              File Name
            </Label>
            <Input
              id="file-name"
              className="col-span-3"
              value={uploadedName}
              onChange={(e) => setUploadedName(e.target.value)} // Allow editing the name
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || !fileName}
          >
            {isUploading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;

/* 
This code defines a file upload dialog component. The process involves:
1. **Retrieving an Upload URL**: Generates a short-lived URL for the user to upload their file.
2. **Uploading the File**: The file is uploaded to the generated URL.
3. **Saving Metadata**: File metadata (such as the storage ID, URL, and the user who uploaded the file) is stored in a database.
4. **Processing PDF Data**: The file URL is sent to an API for further processing, such as extracting or splitting the PDF content.
5. **State Management**: The component manages the uploading state, input values, and dialog visibility.

This setup helps manage file uploads, database updates, and document processing in an efficient way.
*/
