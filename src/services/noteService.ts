import { Note } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { UserService } from ".";

export class NoteService {
  private readonly prisma = new PrismaClient();
  constructor(private readonly userService: UserService = new UserService()) {}

  async create(note: Note, userId: string) {
    try {
      await this.prisma.$connect();
      const user = await this.userService.getUserById(userId);

      const newNote = await this.prisma.note.create({
        data: {
          title: note.title,
          content: note.content,
          createdAt: new Date(),
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await this.prisma.$disconnect();
      return newNote;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }
}
