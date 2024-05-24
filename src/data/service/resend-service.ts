import { resend } from "@/lib/resend";
import { SendEmailPayload } from "@/types/send-email-payload";
import { ServerResponse } from "@/types/server-response";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export class ResendService {
  static async sendVerificationEmail(
    payload: SendEmailPayload
  ): Promise<ServerResponse<string | undefined>> {
    try {
      const { email, token } = payload;
      const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;
      const res = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
      });
      if (res.error) {
        return { status: "error", message: res.error.message };
      }
      return { status: "success", data: res.data?.id };
    } catch {
      return { status: "error", message: "Failed to send verification email" };
    }
  }
  static async sendPasswordResetEmail(
    payload: SendEmailPayload
  ): Promise<ServerResponse<string | undefined>> {
    try {
      const { email, token } = payload;
      const confirmLink = `${BASE_URL}/auth/new-password?token=${token}`;
      const res = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
      });
      if (res.error) {
        return { status: "error", message: res.error.message };
      }
      return { status: "success", data: res.data?.id };
    } catch {
      return {
        status: "error",
        message: "Failed to send password reset email",
      };
    }
  }
}
