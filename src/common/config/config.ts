import * as dotenv from "dotenv"
import { IConfig } from "./config.types"
dotenv.config()

export const config : IConfig = {
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: Number(process.env.DB_PORT),
    dbUser: process.env.DB_USER,
    jwtSecret: process.env.JWT_SECRET,
}