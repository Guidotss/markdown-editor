import { PrismaClient } from "@prisma/client";
import { User } from '@/interfaces';  

export class UserService {
  private prisma = new PrismaClient();

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      await this.prisma.$connect();
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      await this.prisma.$disconnect();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by email");
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      await this.prisma.$connect();
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          password: false,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      await this.prisma.$disconnect();
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by id");
    }
  }
}
