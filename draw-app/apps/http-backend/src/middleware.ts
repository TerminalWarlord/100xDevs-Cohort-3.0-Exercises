import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req:Request, res:Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";
    const decodedToken = jwt.verify(token, JWT_SECRET);
    console.log(decodedToken)
    if(decodedToken){
        // @ts-ignore
        req.userId = decodedToken.userId;
        next();
    }else{
        res.status(403).json({
            message: "unauthorized"
        })
    }

}