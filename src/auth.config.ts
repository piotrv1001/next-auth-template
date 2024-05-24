import { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserRepo } from "./data/repo/user-repo";
import { loginSchema } from "./schemas/login-schema";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;
        const userRes = await UserRepo.getUserByEmail(email);
        if (userRes.status === "error") return null;

        const user = userRes.data;
        if (!user) return null;

        const existingPassword = user.password;
        if (!existingPassword) return null;

        const doPasswordsMatch = await bcrypt.compare(
          password,
          existingPassword
        );
        return doPasswordsMatch ? user : null;
      },
    }),
  ],
} satisfies NextAuthConfig;
