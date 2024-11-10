import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher to check if the URL path matches the protected routes (e.g., "/dashboard")
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

// Default middleware to protect routes that match the pattern
export default clerkMiddleware(async (auth, req) => {
  // If the route matches the protected route pattern, enforce authentication
  if (isProtectedRoute(req)) await auth.protect();
});

// Configuration for the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and static files (like images, fonts, etc.), unless specified in the search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always apply this middleware to API routes (e.g., `/api` and `/trpc`)
    "/(api|trpc)(.*)",
  ],
};

/* 
This middleware ensures that:

1. **Protected Routes**: Any route under `/dashboard` is protected by authentication. If a user is not authenticated, they will be redirected or blocked from accessing it.
2. **Static and Public Routes**: Routes like Next.js internals (`_next`) and static files (images, stylesheets, fonts, etc.) are excluded from authentication enforcement.
3. **API Routes**: The middleware is applied to all API routes (`/api` and `/trpc`) to ensure these endpoints are protected as well.

The `createRouteMatcher` is used to specify the protected route pattern, and the `clerkMiddleware` ensures that only authenticated users can access those routes.
*/
