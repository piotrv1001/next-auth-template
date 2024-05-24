import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { PasswordResetToken } from "@prisma/client";

export type NewPasswordResetToken = Omit<PasswordResetToken, "id">;

export class PasswordResetTokenRepo {
  static async createPasswordResetToken(
    newPasswordResetToken: NewPasswordResetToken
  ): Promise<ServerResponse<PasswordResetToken>> {
    try {
      const passwordResetToken = await db.passwordResetToken.create({
        data: newPasswordResetToken,
      });
      return { status: "success", data: passwordResetToken };
    } catch {
      return {
        status: "error",
        message: "Failed to create password reset token",
      };
    }
  }
  static async getPasswordResetTokenByEmail(
    email: string
  ): Promise<ServerResponse<PasswordResetToken | null>> {
    try {
      const token = await db.passwordResetToken.findFirst({
        where: {
          email,
        },
      });
      return { status: "success", data: token };
    } catch {
      return { status: "error", message: "Failed to get token by email" };
    }
  }
  static async getPasswordResetTokenByToken(
    token: string
  ): Promise<ServerResponse<PasswordResetToken | null>> {
    try {
      const passwordResetToken = await db.passwordResetToken.findFirst({
        where: {
          token,
        },
      });
      return { status: "success", data: passwordResetToken };
    } catch {
      return { status: "error", message: "Failed to get token by token" };
    }
  }
  static async deletePasswordResetToken(
    id: string
  ): Promise<ServerResponse<PasswordResetToken>> {
    try {
      const token = await db.passwordResetToken.delete({
        where: {
          id,
        },
      });
      return { status: "success", data: token };
    } catch {
      return { status: "error", message: "Failed to delete token" };
    }
  }
}
