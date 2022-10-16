import { config } from "dotenv";

//constastes in environment variables more secure level.

config();

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
};