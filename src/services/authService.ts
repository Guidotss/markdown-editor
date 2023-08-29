import { PrismaClient } from "@prisma/client";
import becrypt from "bcrypt";
import { UserService } from "./userService";

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

  async register(
    email: string,
    name: string,
    password: string
  ): Promise<boolean> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (user) {
        throw new Error("User already exists");
      }
      const hash = await this.hasPassword(password);
      await this.prisma.user.create({
        data: {
          email,
          password: hash,
          name,
        },
        select: {
            id: true,
            email: true,
            name: true,
        }
      });
      await this.prisma.$disconnect();
      return true;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
}
