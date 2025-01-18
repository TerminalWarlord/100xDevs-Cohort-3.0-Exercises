import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { createUserSchema, signInSchema, createRoomSchema } from "@repo/common/types";
import { middleware } from "./middleware";
import { client } from "@repo/db/client";

const app = express();

app.use(express.json());


app.post("/signup", async (req, res) => {
    const data = createUserSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "Invalid Inputs"
        })
        return;
    }
    await client.user.create({
        data: {
            ...data.data
        }
    });

    res.json({
        message: "Successful"
    })
})


app.post("/signin", (req, res) => {

    const data = signInSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "Invalid Inputs"
        })
        return;
    }
    const token = jwt.sign({
        userId: data.data.username,
    }, JWT_SECRET);




    res.json({
        message: "Successful",
        token: token
    })
})


app.post("/room", middleware, (req, res) => {
    res.json({
        message: "Successful",
        roomId: 123
    })
})

app.listen(3002);