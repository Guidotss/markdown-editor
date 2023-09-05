import { User } from ".";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt?: Date;
  userId?: string;
  user?: User;
}
