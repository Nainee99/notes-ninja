import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Define your schema here
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
    dimensions: 1536,
  }),
});
