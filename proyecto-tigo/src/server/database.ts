import postgres from 'postgres'  //instalar: npm i postgres  | documentacion: https://www.npmjs.com/package/postgres


const sql = postgres({
    host: process.env.HOST_NAME,   
    port: Number(process.env.PORT_NUMBER),  
    database:process.env.DB_NAME,
    username:process.env.USER_NAME, 
    password:process.env.PGPASSWORD, 
    idle_timeout:30,     //CERRAR CONEXION INACTIVA POR 30 SEGUNDOS
    max: 500,              // Max number of connections
    max_lifetime: null,  // Max lifetime in seconds (more info below) default: Note that max_lifetime = 60 * (30 + Math.random() * 30) by default. This resolves to an interval between 45 and 90 minutes to optimize for the benefits of prepared statements and working nicely with Linux's OOM killer.
    connect_timeout: 120, // Connect timeout in seconds
}) // will use psql environment variables

export default sql


/*
import postgres from 'postgres'  //instalar: npm i postgres  | documentacion: https://www.npmjs.com/package/postgres

export const sql = postgres(
    { host: process.env.HOST_NAME, 
      database: process.env.DB_NAME, 
      username: process.env.USER_NAME, 
      password: process.env.PGPASSWORD, 
      port:  process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER, 10) : 5432
    }
);
*/




