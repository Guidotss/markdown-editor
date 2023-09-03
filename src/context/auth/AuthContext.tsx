"use client"
import { createContext } from 'react'; 
import { User } from '@/interfaces';

interface AuthContextProps {
    user: User | null;
    login: (email:string, password:string) => Promise<boolean>;
    register:(name:string, email:string, password:string) => Promise<boolean>;
}

export const AuthContext = createContext({} as AuthContextProps); 