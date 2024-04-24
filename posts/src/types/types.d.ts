import { Request } from "express";

interface UserPayload {
    id: string;
    email: string;
}


interface SigninPayload {
     signin(id?: string) : string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;

        }
    }
    namespace NodeJS {
        interface Global {
            signin(id?: string): string;
        }
    }



    var signin: (id?: string) => string
}
