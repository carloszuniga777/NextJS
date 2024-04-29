'use server'

import { pool } from '@/server/database';

interface userdb{
  id: number,
  usuario: string,
  correo: string,
  pass: string
}



//Consulta desde la base de datos si el email del usuario existe, en caso de existir, devuelve la informacion del usuario
export async function getEmail(correo:string):Promise<userdb>{

    try{
  
        const query = { text: `select id,
                                      usuario, 
                                      correo, 
                                      pass 
                                from tbl_boc_logins where correo =$1`,
                         values: [correo]
                      }
  
                      
        const response = await pool.query(query)
        
        return response.rows[0]
   
     }catch(e){
       throw 'Error al obtener el correo del usuario'
    }  
  
  }





//Consulta desde la base de datos si el username del usuario existe, en caso de existir, devuelve la informacion del usuario
  export async function getUser(usuario:string):Promise<userdb>{
 
    try {
        
        
        const query = { text: `select 
                                      id,
                                      usuario, 
                                      correo, 
                                      pass 
                                from tbl_boc_logins where usuario =$1`,
                         values: [usuario]
                      }
                        
        const response = await pool.query(query)
        
        return response.rows[0]


    } catch (error) {
        throw 'Error al obtener el usuario'        
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
        try {

               const fechaActual = new Date().toISOString();  
            
               const query = { text: `insert into tbl_boc_logins(usuario, pass, correo, territorio, tipo_usuario, observacion, fecha_log)
                                      values($1, $2, $3, $4, $5, $6, $7) RETURNING * `,
                               values: [usuario, pass, correo, territorio, tipo_usuario, observacion, fechaActual]
                             } 

               
                const response = await pool.query(query)    
                
                return response.rows[0]

            
        } catch (error) {
            throw 'Error al momento de crear el usuario'
        }
  }