import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to generate a short-lived upload URL for file upload
export const generateUploadUrl = mutation(async (ctx) => {
  // Generate and return the upload URL from the storage service
  return await ctx.storage.generateUploadUrl();
});

// Mutation to add a new entry in the database for the uploaded file
export const addEntryToDb = mutation({
  args: {
    fileId: v.string(), // Unique identifier for the file
    storageId: v.string(), // Storage identifier for the uploaded file
    fileName: v.string(), // Name of the uploaded file
    fileUrl: v.string(), // URL to access the uploaded file
    createdBy: v.string(), // Identifier for the user who uploaded the file
  },
  handler: async (ctx, args) => {
    const { fileId, storageId, fileName, fileUrl, createdBy } = args;

    // Insert file metadata into the 'pdfFiles' table in the database
    return await ctx.db.insert("pdfFiles", {
      fileId,
      storageId,
      fileName,
      fileUrl,
      createdBy,
    });
  },
});

// Mutation to retrieve the URL of a file from the storage service
export const getFileUrl = mutation({
  args: {
    storageId: v.string(), // Storage ID of the file
  },
  handler: async (ctx, args) => {
    // Retrieve and return the file URL using the storage service
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    return result[0];
  },
});

/* 
This module defines three mutations for interacting with the file storage system and database:

1. **generateUploadUrl**: This mutation generates a short-lived URL that can be used to upload files to the storage service.

2. **addEntryToDb**: This mutation inserts metadata about an uploaded file (including the file ID, storage ID, file name, file URL, and the user who uploaded it) into the `pdfFiles` table in the database.

3. **getFileUrl**: This mutation retrieves the URL of a file stored in the storage service based on the provided storage ID.

These mutations enable file handling in the application, such as uploading files, storing their metadata, and fetching their URLs.
*/
