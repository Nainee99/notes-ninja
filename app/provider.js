"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Provider component to wrap the app with Convex context
const Provider = ({ children }) => {
  // Initialize the Convex client using the API URL from environment variables
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <div>
      {/* Provide the Convex context to the entire app, enabling access to the backend */}
      <ConvexProvider client={convex}>{children}</ConvexProvider>;
    </div>
  );
};

export default Provider;

/* 
This component wraps the React app with the Convex provider to enable access to the Convex API for all child components.

- **Convex Client Initialization**: The `ConvexReactClient` is instantiated using the API URL stored in the `NEXT_PUBLIC_CONVEX_URL` environment variable. This client manages interactions with the Convex backend.
- **ConvexProvider**: It provides the `convex` client to the app's component tree, making it accessible for querying, mutations, and real-time updates.

By wrapping the app in this provider, child components can interact seamlessly with the Convex API for backend operations.
*/
