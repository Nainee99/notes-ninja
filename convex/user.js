import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Mutation to create a new user in the database
export const createUser = mutation({
  args: {
    email: v.string(), // User's email
    userName: v.string(), // User's name
    imageUrl: v.string(), // User's profile image URL
  },
  handler: async (ctx, args) => {
    try {
      // Check if the user already exists by querying the database with the user's email
      const user = await ctx.db.query("user", { email: args.email });

      console.log("User query result:", user); // Log the result of the user query for debugging

      // If the user doesn't exist, insert the new user into the database
      if (!user.length) {
        await ctx.db.insert("user", {
          email: args.email,
          userName: args.userName,
          imageUrl: args.imageUrl,
        });
        return "Inserted new user.....";
      }

      // If the user already exists, return a message indicating that
      return "User already exists.....";
    } catch (error) {
      console.error("Error creating user:", error); // Log any error that occurs during the process
      return "An error occurred while creating the user."; // Return an error message
    }
  },
});

/* 
This mutation handles user creation by:

1. **Checking for Existing User**: It queries the database to check if a user with the provided email already exists.
2. **Inserting New User**: If no user is found with the given email, it inserts a new user into the "user" table with the provided email, username, and image URL.
3. **Error Handling**: If any error occurs during the process (e.g., database query or insertion fails), it logs the error and returns a message indicating the failure.

This mutation ensures that each user is unique based on their email address and prevents creating duplicate users in the system.
*/
