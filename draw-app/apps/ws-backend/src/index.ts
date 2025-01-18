import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', (ws, request)=>{

    const url = request.url;
    console.log(url);

    if(!url){
        return;
    }
    const params = new URLSearchParams(url.split('?')[1])
    console.log(params);
    try{

        const token = params.get('token') || "";
        console.log(token, JWT_SECRET);
        const decodedUser = jwt.verify(token, JWT_SECRET);
        console.log(decodedUser);
        if(!decodedUser || !(decodedUser as JwtPayload).userId){
            return;
        }
        ws.on('message', (data)=>{
            ws.send("pong")
        })
    }
    catch(err){
        console.log(err)
    }

    
})