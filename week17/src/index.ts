import { Client } from "pg";
import { config } from 'dotenv'

config()

const pgClient = new Client({
    host: process.env.HOST,
    database: process.env.DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: 5432,
    ssl: true,
})


async function main() {
    await pgClient.connect();
    const result = await pgClient.query('SELECT * from users;');
    console.log(result.rows);
}


main();