"use client"
import { createContext } from 'react'; 
import { User } from '@/interfaces';

interface AuthContextProps {
    token: string | null;
    user: User | null;
    login: (email:string, password:string) => Promise<boolean>;
    register:(name:string, email:string, password:string) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps); 