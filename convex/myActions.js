import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

/**
 * Step-by-step process for `ingest` function:
 * 1. Accepts two inputs:
 *    - `splitText`: A list of text chunks to process.
 *    - `fileId`: A unique identifier for the document.
 * 2. Creates a vector store from the text chunks using `ConvexVectorStore`.
 * 3. Generates embeddings for the text using Google Generative AI with the specified model.
 * 4. Stores the embeddings in the vector store for future searches.
 * 5. Returns a success message once the process completes.
 */
export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    return "Ingestion completed successfully";
  },
});

/**
 * Step-by-step process for `search` function:
 * 1. Accepts two inputs:
 *    - `query`: The search query string.
 *    - `fileId`: The document identifier to filter results.
 * 2. Initializes a vector store using Google Generative AI embeddings.
 * 3. Searches the vector store for the most similar embeddings to the query.
 * 4. Filters results based on `fileId` and formats the output as a single string.
 * 5. Returns the concatenated search results in JSON format.
 */
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const allResults = await vectorStore.similaritySearch(args.query, 5);

    const resultOne = allResults
      .filter((q) => Object.values(q.metadata).join("") === args.fileId)
      .map((q) => q.pageContent)
      .join(" ");

    return JSON.stringify(resultOne);
  },
});
