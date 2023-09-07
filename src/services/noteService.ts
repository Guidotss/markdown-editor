import { Note } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { UserService } from ".";

export class NoteService {
  private readonly prisma = new PrismaClient();

  async getAllNotes(userId: string) {
    try {
      await this.prisma.$connect();
      const notes = await this.prisma.note.findMany({
        where: {
          user: {
            id: userId,
          },
        },
      });
      await this.prisma.$disconnect();
      return notes;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }

  async create(note: Note, userId: string) {
    try {
      await this.prisma.$connect();

      const newNote = await this.prisma.note.create({
        data: {
          title: note.title,
          content: note.content,
          createdat: new Date(),
          user: {
            connect: {
              id: userId,
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

  async delete(noteId: string) {
    try {
      await this.prisma.$connect();
      const note = await this.prisma.note.delete({
        where: {
          id: noteId,
        },
      });
      if (!note) {
        return null;
      }
      await this.prisma.$disconnect();
      return note;
    } catch (error) {
      console.log(error);
      throw new Error("Internal server error");
    }
  }
}
