import { Request, Response } from "express"
import jwt from "jsonwebtoken"

export const authMiddleware = (req: Request, res: Response, next: any) => {
    try {
        const token = req.header('Authorization')
        if (!token) return res.status(401).json({ message: "Unauthorized" })
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid authentication token' });
            }
            (req as any).user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ message: "Somthing Went Wrong getting token" })
    }
}