import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Step-by-step process for `generateUploadUrl` mutation:
 * 1. **Generate Upload URL**:
 *    - This mutation generates a short-lived URL from the storage service that allows the user to upload a file.
 * 2. **Return the URL**:
 *    - It returns the generated URL that can be used for the file upload.
 */
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

/**
 * Step-by-step process for `addEntryToDb` mutation:
 * 1. **Input Arguments**:
 *    - Accepts the `fileId`, `storageId`, `fileName`, `fileUrl`, and `createdBy` as inputs to store file metadata.
 * 2. **Insert Metadata**:
 *    - Inserts the provided file metadata into the `pdfFiles` table in the database.
 */
export const addEntryToDb = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const { fileId, storageId, fileName, fileUrl, createdBy } = args;
    return await ctx.db.insert("pdfFiles", {
      fileId,
      storageId,
      fileName,
      fileUrl,
      createdBy,
    });
  },
});

/**
 * Step-by-step process for `getFileUrl` mutation:
 * 1. **Input Arguments**:
 *    - Accepts a `storageId` to retrieve the URL of the file.
 * 2. **Retrieve File URL**:
 *    - Uses the storage service to get the URL of the file associated with the given `storageId`.
 * 3. **Return the URL**:
 *    - Returns the file URL to the user.
 */
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

/**
 * Step-by-step process for `GetFileRecord` query:
 * 1. **Input Arguments**:
 *    - Accepts `fileId` to query the file record in the database.
 * 2. **Query the Database**:
 *    - Fetches the file metadata from the `pdfFiles` table using the provided `fileId`.
 * 3. **Return the Record**:
 *    - Returns the record corresponding to the `fileId`.
 */
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

/**
 * Step-by-step process for `GetUserFiles` query:
 * 1. **Input Arguments**:
 *    - Accepts `userEmail` to retrieve files uploaded by the user.
 * 2. **Query the Database**:
 *    - Fetches all file metadata from the `pdfFiles` table where the `createdBy` field matches the provided `userEmail`.
 * 3. **Return the Files**:
 *    - Returns the list of files uploaded by the user.
 */
export const GetUserFiles = query({
  args: {
    userEmail: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();

    return result;
  },
});
