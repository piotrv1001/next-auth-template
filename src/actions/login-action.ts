"use server";

import { ResendService } from "@/data/service/resend-service";
import { UserRepo } from "@/data/repo/user-repo";
import { loginSchema } from "@/schemas/login-schema";
import { ServerResponse } from "@/types/server-response";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { TokenService } from "@/data/service/token-service";

export const loginAction = async (
  values: z.infer<typeof loginSchema>
): Promise<ServerResponse<{}> | undefined> => {
  try {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success)
      return { status: "error", message: "Invalid fields" };

    const { email, password } = validatedFields.data;
    const existingUserRes = await UserRepo.getUserByEmail(email);
    if (existingUserRes.status === "error") return existingUserRes;

    const existingUser = existingUserRes.data;
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        status: "error",
        message: "Email does not exist",
      };
    }
    const doPasswordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!doPasswordsMatch) {
      return {
        status: "error",
        message: "Invalid credentials",
      };
    }

    if (!existingUser.emailVerified) {
      const generateTokenRes = await TokenService.generateVerificationToken(
        email
      );
      if (generateTokenRes.status === "error") return generateTokenRes;

      const { email: verificationEmail, token } = generateTokenRes.data;
      const sendEmailRes = await ResendService.sendVerificationEmail({
        email: verificationEmail,
        token,
      });
      if (sendEmailRes.status === "error") return sendEmailRes;

      return {
        status: "error",
        message: "Verify your email to continue",
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      status: "success",
      data: {},
    };
  } catch {
    return { status: "error", message: "An error occurred" };
  }
};
