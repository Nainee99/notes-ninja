import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * Step-by-step schema definition:
 * 1. **`user` Table**:
 *    - Stores user information such as name, email, and profile image URL.
 *
 * 2. **`pdfFiles` Table**:
 *    - Tracks metadata for uploaded PDF files, including file identifiers, URLs, storage IDs, names, and the uploader's identity.
 *
 * 3. **`documents` Table**:
 *    - Stores processed document data, including text, vector embeddings, and metadata.
 *    - A vector index (`byEmbedding`) is created for the "embedding" field to enable similarity search and retrieval tasks. This index assumes embeddings with 768 dimensions.
 *
 * 4. **`notes` Table**:
 *    - Stores notes associated with a specific file, including the note content and the user who created it.
 */
export default defineSchema({
  user: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),

  pdfFiles: defineTable({
    fileId: v.string(),
    fileUrl: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
  }),

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),

  notes: defineTable({
    fileId: v.string(),
    notes: v.string(),
    createdBy: v.string(),
  }),
});
