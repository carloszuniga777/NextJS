import postgres from 'postgres'  //instalar: npm i postgres  | documentacion: https://www.npmjs.com/package/postgres

export const sql = postgres(
    { host: process.env.HOST_NAME, 
      database: process.env.DB_NAME, 
      username: process.env.USER_NAME, 
      password: process.env.PGPASSWORD, 
      port:  process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER, 10) : 5432
    }
);