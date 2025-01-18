import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { Request, Response, NextFunction } from "express";

export function middleware(req:Request, res:Response, next: NextFunction){
    const token = req.headers["authorization"] || "";
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded || !(decoded as JwtPayload).userId){
        res.json({
            message: "Unauthorized"
        })
        return;
    }
    else{
        // @ts-ignore
        req.userId = decoded.userId;
        next();
    }
}