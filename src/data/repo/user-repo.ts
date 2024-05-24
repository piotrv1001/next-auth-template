import { db } from "@/lib/db";
import { ServerResponse } from "@/types/server-response";
import { User } from "@prisma/client";

export type NewUser = Pick<User, "email" | "name" | "password">;

export class UserRepo {
  static async createUser(newUser: NewUser): Promise<ServerResponse<User>> {
    try {
      const user = await db.user.create({
        data: newUser,
      });
      return { status: "success", data: user };
    } catch {
      return { status: "error", message: "Failed to create user" };
    }
  }
  static async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<ServerResponse<User>> {
    try {
      const user = await db.user.update({
        where: {
          id,
        },
        data,
      });
      return { status: "success", data: user };
    } catch {
      return { status: "error", message: "Failed to update user" };
    }
  }
  static async getUserById(id: string): Promise<ServerResponse<User | null>> {
    try {
      const user = await db.user.findUnique({
        where: {
          id,
        },
      });
      return { status: "success", data: user };
    } catch {
      return { status: "error", message: "Failed to get user by id" };
    }
  }
  static async getUserByEmail(
    email: string
  ): Promise<ServerResponse<User | null>> {
    try {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      });
      return { status: "success", data: user };
    } catch {
      return { status: "error", message: "Failed to get user by email" };
    }
  }
}
