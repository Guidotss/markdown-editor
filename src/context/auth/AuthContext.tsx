"use client"
import { createContext } from 'react'; 
import { User } from '@/interfaces';

interface AuthContextProps {
    token: string | null;
    user: User | null;
}

export const AuthContext = createContext({} as AuthContextProps); 