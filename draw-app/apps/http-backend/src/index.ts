import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import {JWT_SECRET} from "@repo/backend-common/config";
import {createUserSchema, signInSchema, createRoomSchema} from '@repo/common/types';

const app = express();

app.use(express.json())

app.post('/signup', (req, res)=>{
    const data =  createUserSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Invalid input!"
        });
        return;
    }
    const {email, password} = req.body;
    res.json({
        message: "successful"
    })

})


app.post("/signin", async (req, res) =>{ 

    const data = signInSchema.safeParse(req.body);

    if(!data.success){
        res.json({
            message: "Invalid inputs"
        })
        return;
    }

    const {username, password} = data.data;

    const token = jwt.sign({userId: username}, JWT_SECRET);
    res.json({
        message: "successful",
        token: token
    })
})


app.post("/room", middleware, (req, res)=>{
    
    res.json({
        roomId: 123
    })
})

app.listen(3002)