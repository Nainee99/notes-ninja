import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
  args: {
    email: v.string(),
    userName: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if the user exists already
      const user = await ctx.db.query("user", { email: args.email });

      console.log("User query result:", user); // Log the user query result

      // If not exist, insert a new entry
      if (!user.length) {
        await ctx.db.insert("user", {
          email: args.email,
          userName: args.userName,
          imageUrl: args.imageUrl,
        });
        return "Inserted new user.....";
      }

      return "User already exists.....";
    } catch (error) {
      console.error("Error creating user:", error);
      return "An error occurred while creating the user.";
    }
  },
});
