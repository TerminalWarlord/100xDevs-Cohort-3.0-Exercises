import { PrismaClient } from "@prisma/client";


const client = new PrismaClient();


const user = client.user.create({
    data: {
        username: "jaybee",
        password: "123",
    }
}).then(res => {
    console.log(res)
})