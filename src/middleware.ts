import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./utils/get-current-user";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const user = await getCurrentUser();
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth && !!user?.emailVerified;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiRoute) {
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  const isPublic = publicRoutes.includes(nextUrl.pathname);
  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
