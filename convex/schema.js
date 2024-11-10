import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define user table to store basic user information
  user: defineTable({
    userName: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),

  // Define pdfFiles table to store details of uploaded PDF files
  pdfFiles: defineTable({
    fileId: v.string(), // Unique identifier for each file
    fileUrl: v.string(), // URL to access the uploaded file
    storageId: v.string(), // ID referencing the storage location of the file
    fileName: v.string(), // Original or assigned name of the file
    createdBy: v.string(), // Email or ID of the user who uploaded the file
  }),

  // Define documents table to store processed document data and embeddings
  documents: defineTable({
    embedding: v.array(v.number()), // Array storing vector embeddings for text
    text: v.string(), // Raw or processed text from documents
    metadata: v.any(), // Additional metadata related to the document
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding", // Field storing vector embeddings for indexing
    dimensions: 1536, // Number of dimensions in the vector embeddings
  }),
});

/* 
This schema defines three tables used in the application:

1. **user**: Stores information about each user, including their name, email, and profile image URL.
2. **pdfFiles**: Manages details of PDF files uploaded by users, including identifiers, file URL, storage information, name, and the uploader's identity.
3. **documents**: Contains processed document data, such as text and embeddings, for tasks like vector-based searching or machine learning. A vector index (`byEmbedding`) is created on the "embedding" field to optimize queries that require similarity search or retrieval based on vector distance, with 1536 dimensions specified for the embeddings.

This schema supports storing user data, managing file metadata, and enabling vector-based indexing for document search.
*/
