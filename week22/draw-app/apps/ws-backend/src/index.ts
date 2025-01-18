import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-common/config";

const wss =  new WebSocketServer({port: 8080});

function checkToken(token: string): JwtPayload|null{
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        if(typeof decoded==="string"){
            return null;
        }
        return decoded;
    }
    catch(err){
        console.log(err);
        return null;
    }

}

wss.on("connection", (socket, request)=>{
    const url = request.url;

    if(!url){
        return;
    }

    const params = new URLSearchParams(url.split('?')[1]);
    const token = params.get('token');
    if(typeof token !== "string" || !checkToken(token)){
        return;
    }

    socket.on("message", (data)=>{
        socket.send("pong");
    })


})