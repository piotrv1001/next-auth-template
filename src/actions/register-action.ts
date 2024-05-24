"use server";

import { ResendService } from "@/data/service/resend-service";
import { UserRepo } from "@/data/repo/user-repo";
import { registerSchema } from "@/schemas/register-schema";
import { ServerResponse } from "@/types/server-response";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { TokenService } from "@/data/service/token-service";

export const registerAction = async (
  values: z.infer<typeof registerSchema>
): Promise<ServerResponse<{}>> => {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success)
      return { status: "error", message: "Invalid fields" };

    const { email, password, name } = validatedFields.data;
    const existingUserRes = await UserRepo.getUserByEmail(email);
    if (existingUserRes.status === "error") return existingUserRes;

    if (existingUserRes.data != null) {
      return {
        status: "error",
        message: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserRes = await UserRepo.createUser({
      email,
      password: hashedPassword,
      name: name || null,
    });
    if (createUserRes.status === "error") return createUserRes;

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
      status: "success",
      message: "Check your email to continue!",
      data: {},
    };
  } catch {
    return { status: "error", message: "An error occurred" };
  }
};
