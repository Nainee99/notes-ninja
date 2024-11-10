import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values"; // Import v for argument validation

// Define the ingest action for processing text and storing embeddings
export const ingest = action({
  args: {
    splitText: v.any(), // The text to be processed and stored
    fileId: v.string(), // Unique identifier for the document being ingested
  },
  handler: async (ctx, args) => {
    // Create a ConvexVectorStore from the split text
    await ConvexVectorStore.fromTexts(
      args.splitText, // The processed text chunks
      args.fileId, // The file ID associated with this text
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY, // API key for Google Generative AI service
        model: "text-embedding-004", // Embedding model with 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT, // Specifies the task type for document retrieval
        title: "Document title", // Title for the document being processed
      }),
      { ctx } // Context for the operation
    );

    // Return a success message to indicate that the ingestion is complete
    return "Ingestion completed successfully";
  },
});

/* 
This action performs the following steps:

1. **Text Processing and Embedding**: The `ingest` function accepts two arguments:
   - `splitText`: An array or list of text chunks that have been extracted from a document.
   - `fileId`: A unique identifier for the document being processed.

2. **Vector Store Creation**: It uses the `ConvexVectorStore.fromTexts` method to store the text in a vector store, creating embeddings using the `GoogleGenerativeAIEmbeddings` model. The embeddings are based on the "text-embedding-004" model, which has 768 dimensions, and it configures the task as document retrieval (`TaskType.RETRIEVAL_DOCUMENT`).

3. **Completion Message**: Once the vector store is created and the text is stored as embeddings, it returns a success message indicating the process has completed successfully.

This action integrates Convex for managing storage and Google Generative AI for embedding text, supporting document retrieval tasks.
*/
