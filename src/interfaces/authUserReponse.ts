import { User } from ".";

export interface AuthUserResponse {
    ok: boolean;
    user: User;
    token: string;
    message?: string; 
}