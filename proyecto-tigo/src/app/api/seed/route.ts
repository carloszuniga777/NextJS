

import { pool } from '@/server/database'
import { NextResponse, NextRequest } from 'next/server'



export async function GET(request: Request) { 

    let query;
    const client = await pool.connect()       //iniciando la conexion

    try{

        await client.query('BEGIN')      //inicio del proceso


        
        const createTableLogins = `CREATE TABLE IF NOT EXISTS tbl_boc_logins(
            id SERIAL PRIMARY KEY,
            usuario TEXT NOT NULL,
            tipo_usuario TEXT,
            territorio TEXT,
            correo TEXT NOT NULL,
            observacion TEXT,
            log TEXT,
            fecha_log TIMESTAMP,
            pass TEXT NOT NULL
        );`

        await client.query(createTableLogins)


        

        const createTableTwoFactorToken = `CREATE TABLE IF NOT EXISTS tbl_TwoFactorToken(
            "id" SERIAL PRIMARY KEY,
            "userid" TEXT NOT NULL,
            "usuario" TEXT NOT NULL,
            "token" TEXT NOT NULL,
            "expires" TIMESTAMP NOT NULL,
            UNIQUE ("usuario", "token")
        );`

          
        
        await client.query(createTableTwoFactorToken)


            query ={
                    text: `delete from tbl_boc_logins where usuario=$1`,
                    values: ['carlos.zuniga'] 
                   }

             await client.query(query)        

         
             query = {  text: `insert into tbl_boc_logins(usuario, pass, correo, territorio, tipo_usuario, observacion, fecha_log)
                              values($1, $2, $3, $4, $5, $6, $7) RETURNING * `,
                    values: ['carlos.zuniga', '$2a$10$jXOPsIaesAeJPYvYvDdGTOUWdoyinP3svSMBFSoqqSBEd/yBnO/ru', 'carlos.trochez@tigo.com.hn', 'T1', 'Interno', 'CVE', '2024-04-28 04:43:35.424']
                  } 



       const response =  await client.query(query)
        
      
       await client.query('COMMIT')                   //commit 

        
        return NextResponse.json({
            messege: 'Tabla creada y llenada con datos de prueba exitosamente',
            data: response.rows[0] 
        })


    }catch(error){
        
        await client.query('ROLLBACK')                        //rollback

        return NextResponse.json( 
                                  { 
                                    message: 'Error al configurar la base de datos', 
                                    error: error
                                  }, 
                                 { status: 400} 
                                )

    }finally{
         
        client.release() 
    }
}