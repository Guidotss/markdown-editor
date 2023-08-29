import { PrismaClient } from "@prisma/client";

export class UserService {
  private prisma = new PrismaClient();

  async getUserByEmail(email: string): Promise<any> {
    try {
      await this.prisma.$connect();
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user; 
    } catch (error) {
      console.log(error);
      throw new Error("Error getting user by email");
    }
  }
}
