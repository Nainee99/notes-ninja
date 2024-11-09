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
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addEntryToDb = useMutation(api.fileStorage.addEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddedDocument = useAction(api.myActions.ingest);
  const { user } = useUser();

  const [fileName, setFileName] = useState("");
  const [uploadedName, setUploadedName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadedName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!fileName) {
      alert("Please select a file first");
      return;
    }

    setIsUploading(true);

    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
      // Step 2: POST the file to the URL
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

      const { storageId } = await result.json();
      console.log(
        `File uploaded successfully! Storage ID: ${storageId} File Name: ${uploadedName}`
      );

      // Step 3: Save the newly allocated storage id to the database
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
      // After upload, set the uploaded name (modified name)
      setUploadedName(uploadedName);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      setFileName("");
      setUploadedName("");
    }
  };

  const handleClose = async () => {
    // setFileName("");
    // setUploadedName("");
    // setIsUploading(false);
    // if (fileInputRef.current) {
    //   fileInputRef.current.value = "";
    // }
    //Api call to fetch pdf process data
    const ApiResponse = await axios.get("/api/pdf-loader");
    console.log(ApiResponse.data.result);
    embeddedDocument({});
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
