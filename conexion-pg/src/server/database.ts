import {Pool} from 'pg'  //Conexion a la base de datos Postgres. Instalar: npm i pg | luego: npm i --save-dev @types/pg

let connection: any

if(!connection){

  const portNumber = process.env.PORT_NUMBER ? parseInt(process.env.PORT_NUMBER, 10) : 5432; // Default port number is 5432 if not provided

    
    connection = new Pool({
        user: process.env.USER_NAME,
        host: process.env.HOST_NAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: portNumber
      })
      

      /*    
    connection = new Pool({
      user: 'tigo',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432
    })*/
}

export {connection}

