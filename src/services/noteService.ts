import { Note } from '@/interfaces';
import { PrismaClient } from '@prisma/client';

export class NoteService {
    private readonly prisma = new PrismaClient(); 

    async create(note: Note, userId: string) { 
        throw new Error('Not implemented yet');
    }
}                                   