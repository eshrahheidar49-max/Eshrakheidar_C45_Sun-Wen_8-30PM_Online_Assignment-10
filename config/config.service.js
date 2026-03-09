import dotenv from "dotenv";

//dotenv.config({path :"./config/.env.development"})
//dotenv.config({path :"./config/.env.production"})
const env=process.env.NODE_ENV||"development";

// نقرأ الملف المناسب
dotenv.config({ path:`./config/.env.${env}` })
export const PORT = process.env.PORT
export const DB_URI = process.env.DB_URI
export const SALT_ROUNDS =Number (process.env.SALT_ROUNDS)
export const SECRETE_KEY = process.env.SECRETE_KEY