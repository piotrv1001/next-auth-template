import { ServerResponse } from "@/types/server-response";
import { PasswordResetToken, VerificationToken } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { VerificationTokenRepo } from "@/data/repo/verification-token-repo";
import { PasswordResetTokenRepo } from "../repo/password-reset-token-repo";

export class TokenService {
  static async generateVerificationToken(
    email: string
  ): Promise<ServerResponse<VerificationToken>> {
    try {
      const existingTokenRes =
        await VerificationTokenRepo.getVerificationTokenByEmail(email);
      if (existingTokenRes.status === "error") return existingTokenRes;

      if (existingTokenRes.data != null) {
        const deleteTokenRes =
          await VerificationTokenRepo.deleteVerificationToken(
            existingTokenRes.data.id
          );
        if (deleteTokenRes.status === "error") return deleteTokenRes;
      }

      const token = uuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now
      const createTokenRes =
        await VerificationTokenRepo.createVerificationToken({
          email,
          token,
          expires,
        });
      if (createTokenRes.status === "error") return createTokenRes;

      return { status: "success", data: createTokenRes.data };
    } catch {
      return { status: "error", message: "Failed to generate token" };
    }
  }
  static async generatePasswordResetToken(
    email: string
  ): Promise<ServerResponse<PasswordResetToken>> {
    try {
      const existingTokenRes =
        await PasswordResetTokenRepo.getPasswordResetTokenByEmail(email);
      if (existingTokenRes.status === "error") return existingTokenRes;

      if (existingTokenRes.data != null) {
        const deleteTokenRes =
          await PasswordResetTokenRepo.deletePasswordResetToken(
            existingTokenRes.data.id
          );
        if (deleteTokenRes.status === "error") return deleteTokenRes;
      }

      const token = uuidv4();
      const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now
      const createTokenRes =
        await PasswordResetTokenRepo.createPasswordResetToken({
          email,
          token,
          expires,
        });
      if (createTokenRes.status === "error") return createTokenRes;

      return { status: "success", data: createTokenRes.data };
    } catch {
      return { status: "error", message: "Failed to generate token" };
    }
  }
}
