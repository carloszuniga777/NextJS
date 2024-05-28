'use server'

import { getErrorMessage } from '@/functions/error';
import { sql } from '@/server/database';


interface userdb{
  id_usuario: number,
  usuario: string,
  correo: string,
  password: string
}



//Consulta desde la base de datos si el email del usuario existe, en caso de existir, devuelve la informacion del usuario
export async function getEmail(correo:string):Promise<userdb>{


    try{
  
        const query = await sql`select 
                                      id_usuario,
                                      usuario, 
                                      correo, 
                                      password 
                                from tbl_boc_usuarios 
                                where correo = ${correo.toLowerCase().trim()}`

      
        return query[0] as userdb;
            
     }catch(error){
       throw `Error: ${getErrorMessage(error)}` 
    }  
  
  }





//Consulta desde la base de datos si el username del usuario existe, en caso de existir, devuelve la informacion del usuario
  export async function getUser(usuario:string):Promise<userdb>{
    


    try {
        
        
      const query = await sql`select 
                                    id_usuario,
                                    usuario, 
                                    correo, 
                                    password 
                                from tbl_boc_usuarios 
                                where usuario = ${usuario.toUpperCase().trim()}`
                      

      
        return query[0] as userdb;


    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`      
    }

  }



export async function getUserByID(id:string):Promise<userdb>{
    
  try {
      
      
        const query = await sql`select 
                                    id_usuario,
                                    usuario, 
                                    correo, 
                                    password  
                              from tbl_boc_usuarios where id_usuario =${id}`
                    

        return query[0] as userdb;
        
  } catch (error) {
      throw `Error: ${getErrorMessage(error)}`         
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
              
                  const query = await sql`insert into tbl_boc_usuarios
                                          (
                                            usuario, 
                                            password, 
                                            correo
                                          )
                                          values
                                          (
                                            ${usuario.toUpperCase().trim()},
                                            ${pass}, 
                                            ${correo.toLowerCase().trim()}
                                          ) RETURNING * `


            if (!query.length) {
              throw new Error('Usuario no fue creado');
            }
          
            return query[0] as createUserDB;
            
                         
        } catch (error) {
            throw `Error: ${getErrorMessage(error)}`  
        }

  }
