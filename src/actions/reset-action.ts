"use server";

import { UserRepo } from "@/data/repo/user-repo";
import { ResendService } from "@/data/service/resend-service";
import { TokenService } from "@/data/service/token-service";
import { resetSchema } from "@/schemas/reset-schema";
import { ServerResponse } from "@/types/server-response";
import { z } from "zod";

export const resetAction = async (
  values: z.infer<typeof resetSchema>
): Promise<ServerResponse<{}>> => {
  try {
    const validatedFields = resetSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        status: "error",
        message: "Invalid fields",
      };
    }

    const { email } = validatedFields.data;
    const existingUserRes = await UserRepo.getUserByEmail(email);
    if (existingUserRes.status === "error") return existingUserRes;

    const existingUser = existingUserRes.data;
    if (!existingUser) {
      return { status: "error", message: "Email does not exist" };
    }

    const generateTokenRes = await TokenService.generatePasswordResetToken(
      email
    );
    if (generateTokenRes.status === "error") return generateTokenRes;

    const { email: verificationEmail, token } = generateTokenRes.data;
    const sendEmailRes = await ResendService.sendPasswordResetEmail({
      email: verificationEmail,
      token,
    });
    if (sendEmailRes.status === "error") return sendEmailRes;

    return {
      status: "success",
      data: {},
      message: "Check your email for a password reset link",
    };
  } catch {
    return { status: "error", message: "Failed to send reset email" };
  }
};
