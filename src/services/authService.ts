import { PrismaClient } from "@prisma/client";
import becrypt from "bcrypt";
import { UserService } from "./userService";
import { User } from "@/interfaces";

export class AuthService {
  prisma = new PrismaClient();
  constructor(private readonly userService: UserService) {}

  private async hasPassword(password: string): Promise<string> {
    return await becrypt.hash(password, 10);
  }

  private async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await becrypt.compare(password, hash);
  }

  async register(email: string, name: string, password: string): Promise<User> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        throw new Error("User already exists");
      }
      const hash = await this.hasPassword(password);
      const newUser = await this.prisma.user.create({
        data: {
          email,
          password: hash,
          name,
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
      await this.prisma.$disconnect();
      return newUser;
    } catch (error) {
      throw new Error(`Error registering user : ${error}`);
    }
  }
  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    try {
      const isPasswordValid = await this.comparePassword(
        password,
        user.password!
      );

      if (!isPasswordValid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
      };
    } catch (error) {
      throw new Error(`logging in user : ${error}`);
    }
  }
}
