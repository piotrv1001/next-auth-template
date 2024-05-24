import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { VerificationToken } from "@prisma/client";

export type NewVerificationToken = Omit<VerificationToken, "id">;

export class VerificationTokenRepo {
  static async createVerificationToken(
    newVerificationToken: NewVerificationToken
  ): Promise<ServerResponse<VerificationToken>> {
    try {
      const verificationToken = await db.verificationToken.create({
        data: newVerificationToken,
      });
      return { status: "success", data: verificationToken };
    } catch {
      return {
        status: "error",
        message: "Failed to create verification token",
      };
    }
  }
  static async getVerificationTokenByEmail(
    email: string
  ): Promise<ServerResponse<VerificationToken | null>> {
    try {
      const token = await db.verificationToken.findFirst({
        where: {
          email,
        },
      });
      return { status: "success", data: token };
    } catch {
      return { status: "error", message: "Failed to get token by email" };
    }
  }
  static async getVerificationTokenByToken(
    token: string
  ): Promise<ServerResponse<VerificationToken | null>> {
    try {
      const verificationToken = await db.verificationToken.findFirst({
        where: {
          token,
        },
      });
      return { status: "success", data: verificationToken };
    } catch {
      return { status: "error", message: "Failed to get token by token" };
    }
  }
  static async deleteVerificationToken(
    id: string
  ): Promise<ServerResponse<VerificationToken>> {
    try {
      const token = await db.verificationToken.delete({
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
