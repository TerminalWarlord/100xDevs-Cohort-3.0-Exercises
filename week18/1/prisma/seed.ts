import { PrismaClient } from "@prisma/client";


const client = new PrismaClient();
async function seedUsers() {
    await client.user.create({
        data: {
            username: "test1",
            password: "123",
            todos: {
                create: {
                    title: "go to gym",
                    done: false,
                }
            }
        }
    })
}



seedUsers();