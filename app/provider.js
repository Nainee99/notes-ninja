"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Provider component to wrap your app with Convex context
const Provider = ({ children }) => {
  // Initialize the Convex client with the URL from environment variables
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <div>
      {/* Wrap children components with ConvexProvider to provide Convex context */}
      <ConvexProvider client={convex}>{children}</ConvexProvider>;
    </div>
  );
};

export default Provider;

/* 
This component is used to wrap the React app with the Convex provider. It initializes the `ConvexReactClient` using the URL of the Convex API, which is fetched from the environment variable `NEXT_PUBLIC_CONVEX_URL`. The `ConvexProvider` is then used to make the Convex context available throughout the app, enabling components to interact with the Convex backend.

- **Convex Client**: The client connects to Convex API, enabling real-time data updates and easy interaction with the backend.
- **Environment Variable**: The URL for the Convex API is stored in an environment variable, which ensures flexibility and security.

By wrapping the app in this provider, all children components can access the Convex client and use its functionality, such as actions, mutations, and queries.
*/
