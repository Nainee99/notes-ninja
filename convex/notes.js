import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Step-by-step process for `AddNote` mutation:
 * 1. Accepts three inputs:
 *    - `fileId`: A unique identifier for the file.
 *    - `notes`: The note content to be added or updated.
 *    - `createdBy`: The user who created the note.
 * 2. Checks if a note already exists for the given `fileId`.
 *    - If no record exists, a new note is inserted into the database.
 *    - If a record exists, it updates the existing note with the new content.
 * 3. Returns a message indicating whether the note was added or updated.
 */
export const AddNote = mutation({
  args: {
    fileId: v.string(),
    notes: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("Arguments received:", args);

    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .first();

    if (!record) {
      await ctx.db.insert("notes", {
        fileId: args.fileId,
        notes: args.notes,
        createdBy: args.createdBy,
      });
      return "Note added successfully";
    } else {
      await ctx.db.patch(record._id, {
        notes: args.notes,
      });
      return "Note updated successfully";
    }
  },
});

/**
 * Step-by-step process for `getNotes` query:
 * 1. Accepts one input:
 *    - `fileId`: A unique identifier for the file to fetch notes for.
 * 2. Queries the database for a note associated with the given `fileId`.
 * 3. If no note is found, returns a message indicating no notes were found.
 * 4. If a note is found, returns the content of the note.
 * 5. Handles any potential errors by logging them and throwing an appropriate error message.
 */
export const getNotes = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db
        .query("notes")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .first();

      if (!result) {
        return { message: "No notes found for the given fileId" };
      }

      return { notes: result.notes || "" };
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw new Error("Failed to fetch notes");
    }
  },
});
