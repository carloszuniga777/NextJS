import { Pool } from "pg";   //Instalar: npm i pg | instalar tipos: npm i --save-dev @types/pg | Documentacion: https://node-postgres.com/


export const pool = new Pool({
    user: process.env.USER_NAME,
    host: process.env.HOST_NAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER, 10) : 5432
})
