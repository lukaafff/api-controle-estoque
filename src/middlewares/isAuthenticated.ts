import {Request, Response, NextFunction} from "express";
import { Payload } from "../models/interfaces/user/auth/Payload"; 
import { verify } from "jsonwebtoken";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json().end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
        req.user_id = sub;
        return next();
    } catch(error) {
        return res.send(401).end();
    }
}