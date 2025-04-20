import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/profile(.*)", "/forum(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api/webhook/clerk).*)", // ❗ exclude api/webhook/clerk
    "/(api|trpc)(.*)", // <- อย่าลืมมันรวมหมด
  ],
};
