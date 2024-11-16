import { v } from "convex/values";
import { mutation } from "./_generated/server";

/**
 * Step-by-step process for `createUser` mutation:
 * 1. **Input Arguments**:
 *    - Accepts `email`, `userName`, and `imageUrl` as input to identify and create a new user.
 *
 * 2. **Check for Existing User**:
 *    - Queries the database to check if a user with the provided email already exists.
 *
 * 3. **Insert New User**:
 *    - If no user is found, inserts a new record into the "user" table with the provided details.
 *
 * 4. **Handle Duplicate Users**:
 *    - If a user with the same email already exists, returns a message indicating this.
 *
 * 5. **Error Handling**:
 *    - Logs any errors that occur during the process and returns an appropriate error message.
 */
export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const user = await ctx.db.query("user", { email: args.email });

      if (!user.length) {
        await ctx.db.insert("user", {
          email: args.email,
          userName: args.userName,
          imageUrl: args.imageUrl,
        });
        return "Inserted new user.";
      }

      return "User already exists.";
    } catch (error) {
      console.error("Error creating user:", error);
      return "An error occurred while creating the user.";
    }
  },
});
