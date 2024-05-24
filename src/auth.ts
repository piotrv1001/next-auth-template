import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRepo } from "./data/repo/user-repo";
import { db } from "./lib/db";

declare module "next-auth" {
  interface User {
    //** The email verification date */
    emailVerified: Date | null;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    //** The email verification date */
    emailVerified: Date | null;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      if (!user?.id) return;
      await UserRepo.updateUser(user.id, {
        emailVerified: new Date(),
      });
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.emailVerified = token.emailVerified;
        if (token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUserRes = await UserRepo.getUserById(token.sub);
      if (existingUserRes.status === "error") return token;

      const existingUser = existingUserRes.data;
      token.emailVerified = existingUser?.emailVerified ?? null;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
