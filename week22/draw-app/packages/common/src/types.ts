import {z} from "zod";


export const createUserSchema = z.object({
    username: z.string(),
    password: z.string()
});



export const signInSchema = z.object({
    username: z.string(),
    password: z.string()
});



export const createRoomSchema = z.object({
    roomName: z.string(),
});