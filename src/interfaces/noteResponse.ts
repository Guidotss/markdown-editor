import { Note } from ".";

export interface NoteResponse {
    ok: boolean;
    notes?: Note[];
    note?: Note;
    message?: string;
}