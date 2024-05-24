"use server";

import { UserRepo } from '@/data/repo/user-repo';
import { VerificationTokenRepo } from "@/data/repo/verification-token-repo";
import { ServerResponse } from "@/types/server-response";

export const newVerificationAction = async (
  token: string
): Promise<ServerResponse<{}>> => {
  try {
    const existingTokenRes =
      await VerificationTokenRepo.getVerificationTokenByToken(token);
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

    const updateUserRes = await UserRepo.updateUser(existingUser.id, {
      id: existingUser.id,
      emailVerified: new Date(),
    });
    if (updateUserRes.status === "error") return updateUserRes;

    const deleteTokenRes = await VerificationTokenRepo.deleteVerificationToken(
      existingToken.id
    );
    if (deleteTokenRes.status === "error") return deleteTokenRes;

    return { status: "success", data: {} };
  } catch {
    return { status: "error", message: "Failed to verify email" };
  }
};
