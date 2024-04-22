import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return next()
        }
        const token = req.headers.authorization.split('Bearer ')[1]
        const payload = jwt.verify(token, process.env.JWT_KEY!)
        if (!payload) {
            return next()
        }
        return res.json(payload)
    } catch (err) {
        throw err
    }
}
