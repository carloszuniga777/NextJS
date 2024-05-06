'use server'

import { getErrorMessage } from "@/functions/error"
import { pool } from "@/server/database"


/**Esta funcion es usada para obtener el tocken */
export async function getTwoFactorTokenByToken(token: string){
   const client = await pool.connect()

   try {

        const query = {
            text: `select  id, 
                           userid, 
                           usuario, 
                           token, 
                           expires 
                    from tbl_twofactortoken
                    where token = $1`,
            values: [token]
        }

        const response = await client.query(query)         //realizando la consulta en la base de datos 
        
        return response.rows[0]
   
    
   } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
   }finally{
        client.release()                   //liberando la conexion
   }
}



/**Esta funcion es usada para obtener el tocken usando el usuario*/
export async function getTwoFactorTokenByUser(username: string){
    const client = await pool.connect()
 
    try {
 
         const query = {
             text: `select  id, 
                            userid,
                            usuario, 
                            token, 
                            expires 
                     from tbl_twofactortoken
                     where usuario = $1`,
             values: [username]
         }
 
         const response = await client.query(query)         //realizando la consulta en la base de datos 
         
         return response.rows[0]
    
     
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }finally{
         client.release()                   //liberando la conexion
    }
 }
 


/**Esta funcion es usada para obtener el tocken usando el usuario*/
export async function getTwoFactorTokenByUserId(userID: string){
    const client = await pool.connect()
 
    try {
 
         const query = {
             text: `select  id, 
                            userid,
                            usuario, 
                            token, 
                            expires 
                     from tbl_twofactortoken
                     where userid = $1`,
             values: [userID]
         }

 
         const response = await client.query(query)         //realizando la consulta en la base de datos 
         
         return response.rows[0]
    
     
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }finally{
         client.release()                   //liberando la conexion
    }
 }
 




 //Elimina el Token por usuario
export async function deleteTwoFactorToken(usuario:string){
    const client = await pool.connect()

    try {
        
        await client.query('BEGIN')      //inicio del proceso

        const query = {
            text: `delete from tbl_twofactortoken
                   where usuario = $1`,
            values: [usuario]
        }

        const response = await client.query(query)     //realizando la consulta en la base de datos 
         
        await client.query('COMMIT')                   //commit 

        return response.rows[0]
   
        
    } catch (error) {
        
        await client.query('ROLLBACK')            //rollback

        throw `Error: ${getErrorMessage(error)}`
    }finally{
        client.release()                          //libera la conexion una vez finalizado de usar   
    }
}




 //Elimina el Token por userID
export async function deleteTwoFactorTokenByID(id:string){
    const client = await pool.connect()

    try {
        
        await client.query('BEGIN')      //inicio del proceso

        const query = {
            text: `delete from tbl_twofactortoken
                   where userID = $1`,
            values: [id]
        }

        const response = await client.query(query)     //realizando la consulta en la base de datos 
         
        await client.query('COMMIT')                   //commit 

        return response.rows[0]
   
        
    } catch (error) {
        
        await client.query('ROLLBACK')            //rollback

        throw `Error: ${getErrorMessage(error)}`
    }finally{
        client.release()                          //libera la conexion una vez finalizado de usar   
    }
}




interface TokenCreate{
    username: string,
    userID: number,
    token: string,
    expires: Date
}



export async function createTwoFactorToken({username, userID, token, expires}:TokenCreate) {

    const client = await pool.connect()

    try {
        
        await client.query('BEGIN')      //inicio del proceso

        const query = {
            text: `insert into tbl_twofactortoken(usuario, userid, token, expires)
                   values ($1, $2, $3, $4) RETURNING *`,
            values: [username, userID, token, expires]
        }

        const response = await client.query(query)     //realizando la consulta en la base de datos 
         
        await client.query('COMMIT')                   //commit 

        return response.rows[0]
   
        
    } catch (error) {
        
        await client.query('ROLLBACK')            //rollback

        throw `Error: ${getErrorMessage(error)}`
    }finally{
        client.release()                          //libera la conexion una vez finalizado de usar   
    }

    

}