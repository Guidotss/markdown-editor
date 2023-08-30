"use client"
import { createContext } from 'react'; 
import { User } from '@/interfaces';

interface AuthContextProps {
    token: string | null;
    user: User | null;
    login: (user: User) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps); 