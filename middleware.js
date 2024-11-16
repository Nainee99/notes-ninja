import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher to check if the URL path matches the protected routes (e.g., "/dashboard")
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

/**
 * Step-by-step explanation for the middleware logic:
 * 1. **Check for Protected Routes**:
 *    - If the route matches the protected route pattern (e.g., `/dashboard`), the user must be authenticated.
 * 2. **Protect Route**:
 *    - If the user is not authenticated, the `auth.protect()` method is called, blocking access to the route.
 */
export default clerkMiddleware(async (auth, req) => {
  // If the route matches the protected route pattern, enforce authentication
  if (isProtectedRoute(req)) await auth.protect();
});

// Configuration for the middleware matcher
export const config = {
  matcher: [
    /**
     * Step-by-step explanation for matching routes:
     * 1. **Exclude Static Files and Next.js Internals**:
     *    - The middleware is applied to all routes except Next.js internal files and static assets (like images, fonts, and JavaScript).
     *    - This prevents the middleware from applying to public routes that don't require authentication.
     * 2. **Apply to API Routes**:
     *    - The middleware is applied to all routes under `/api` and `/trpc` to ensure these endpoints are protected and require authentication.
     */
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always apply this middleware to API routes (e.g., `/api` and `/trpc`)
    "/(api|trpc)(.*)",
  ],
};
