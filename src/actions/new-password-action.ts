"use server";

import { PasswordResetTokenRepo } from "@/data/repo/password-reset-token-repo";
import { UserRepo } from "@/data/repo/user-repo";
import { newPasswordSchema } from "@/schemas/new-password-schema";
import { ServerResponse } from "@/types/server-response";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const newPasswordAction = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
): Promise<ServerResponse<{}>> => {
  try {
    if (!token) return { status: "error", message: "Token is missing" };

    const validatedFields = newPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
      return { status: "error", message: "Invalid token" };
    }

    const existingTokenRes =
      await PasswordResetTokenRepo.getPasswordResetTokenByToken(token);
    if (existingTokenRes.status === "error") return existingTokenRes;

    const existingToken = existingTokenRes.data;
    if (!existingToken) {
      return { status: "error", message: "Token does not exist" };
    }

    const hasExpired = new Date() > new Date(existingToken.expires);
    if (hasExpired) {
      return { status: "error", message: "Token has expired" };
    }

    const existingUserRes = await UserRepo.getUserByEmail(existingToken.email);
    if (existingUserRes.status === "error") return existingUserRes;

    const existingUser = existingUserRes.data;
    if (!existingUser) {
      return { status: "error", message: "User does not exist" };
    }

    const { password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUserRes = await UserRepo.updateUser(existingUser.id, {
      password: hashedPassword,
    });
    if (updateUserRes.status === "error") return updateUserRes;

    const deleteTokenRes =
      await PasswordResetTokenRepo.deletePasswordResetToken(existingToken.id);
    if (deleteTokenRes.status === "error") return deleteTokenRes;

    return { status: "success", data: {} };
  } catch {
    return { status: "error", message: "Failed to reset password" };
  }
};
