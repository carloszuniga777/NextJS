'use server'

import { getErrorMessage } from '@/functions/error';
import { pool } from '@/server/database';

interface userdb{
  id: number,
  usuario: string,
  correo: string,
  pass: string
}



//Consulta desde la base de datos si el email del usuario existe, en caso de existir, devuelve la informacion del usuario
export async function getEmail(correo:string):Promise<userdb>{

     const client  = await pool.connect();              //iniciando la conexion

    try{
  
        const query = { text: `select id,
                                      usuario, 
                                      correo, 
                                      pass 
                                from tbl_boc_logins where correo =$1`,
                         values: [correo]
                      }
  
                      
        const response = await client.query(query)         //realizando la consulta en la base de datos 
        
        return response.rows[0]
   
     }catch(error){
       throw `Error: ${getErrorMessage(error)}` 
    }finally{
        client.release()                   //liberando la conexion
    }  
  
  }





//Consulta desde la base de datos si el username del usuario existe, en caso de existir, devuelve la informacion del usuario
  export async function getUser(usuario:string):Promise<userdb>{
    
    const client  = await pool.connect();              //iniciando la conexion

    try {
        
        
        const query = { text: `select 
                                      id,
                                      usuario, 
                                      correo, 
                                      pass 
                                from tbl_boc_logins where usuario =$1`,
                         values: [usuario]
                      }
                        
        const response = await client.query(query)    //realizando la consulta en la base de datos  
        
        return response.rows[0]


    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`      
    }finally{
      client.release()                                //liberando la conexion
    }

  }



export async function getUserByID(id:string):Promise<userdb>{
    
  const client  = await pool.connect();              //iniciando la conexion

  try {
      
      
      const query = { text: `select 
                                    id,
                                    usuario, 
                                    correo, 
                                    pass 
                              from tbl_boc_logins where id =$1`,
                       values: [id]
                    }
                      
      const response = await client.query(query)    //realizando la consulta en la base de datos  
      
      return response.rows[0]


  } catch (error) {
      throw `Error: ${getErrorMessage(error)}`         
  }finally{
    client.release()                                //liberando la conexion
  }

}


  interface createUserDB{
    usuario: string,
    pass: string,
    correo: string,
    tipo_usuario?: string,
    territorio?: string,
    observacion?: string
  }

  //Inserta en la base de datos la informacion del usuario: correo, contrasena, etc
  export async function createNewUser({usuario, pass, correo, tipo_usuario, territorio, observacion}:createUserDB){
        
      const client = await pool.connect()       //iniciando la conexion

      try {
               await client.query('BEGIN')      //inicio del proceso

               const fechaActual = new Date().toISOString();  
            
               const query = { text: `insert into tbl_boc_logins(usuario, pass, correo, territorio, tipo_usuario, observacion, fecha_log)
                                      values($1, $2, $3, $4, $5, $6, $7) RETURNING * `,
                               values: [usuario, pass, correo, territorio, tipo_usuario, observacion, fechaActual]
                             } 

               
                const response = await client.query(query)    //insercion en la base de datos
               
                await client.query('COMMIT')                   //commit 

                return response.rows[0]

            
        } catch (error) {

            await client.query('ROLLBACK')                        //rollback

            throw `Error: ${getErrorMessage(error)}`  
            
        }finally{
          client.release()                                       //libera la conexion una vez finalizado de usar   
        }
  }