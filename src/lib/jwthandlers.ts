import { config } from "dotenv";
import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
config({ path: ".env.local" });


const SECRET_KEY: string = process.env.JWT_SECRET!;


export interface CustomJwtPayload extends JwtPayload {
    id: number;
    uname: string;
    role?: string; 
}

// Create JWT Token
export const createToken = (payload: CustomJwtPayload, expiresIn: number = 3600): string => {
    const options : SignOptions = { expiresIn };
    return jwt.sign(payload, SECRET_KEY, options);
};

// Verify JWT Token
export const verifyToken = (token: string): CustomJwtPayload | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
    } catch (error) {
        return null; 
    }
};
