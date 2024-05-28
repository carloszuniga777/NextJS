'use server'

import { getErrorMessage } from "@/functions/error"
import { sql } from '@/server/database';


/**Esta funcion es usada para obtener el tocken */
export async function getTwoFactorTokenByToken(token: string){
   
   try {

        const query = await sql`select  id, 
                                        userid, 
                                        usuario, 
                                        token, 
                                        confirmation,
                                        expires 
                                    from tbl_twofactortoken
                                    where token = ${token}`
        
        return query[0]
       
   } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
   }
}



/**Esta funcion es usada para obtener el tocken usando el usuario*/
export async function getTwoFactorTokenByUser(username: string){
 
    try {
 
        const query = await sql`select  id, 
                                        userid,
                                        usuario, 
                                        token,
                                        confirmation, 
                                        expires 
                                from tbl_twofactortoken
                                where usuario = ${username.toUpperCase().trim()}`
            
         
         return query[0]
    
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }
 }
 


/**Esta funcion es usada para obtener el tocken usando el usuario*/
export async function getTwoFactorTokenByUserId(userID: number){
    
    try {
 
        const query = await sql`select  id, 
                                        userid,
                                        usuario, 
                                        token,
                                        confirmation, 
                                        expires 
                                from tbl_twofactortoken
                                where userid = ${userID}`
         
         return query[0]
    
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }
 }
 




 export async function confirmToken(usuario:string){
    

    try {
        
        const query = await sql`update tbl_twofactortoken
                                set confirmation = true
                                where usuario = ${usuario.toUpperCase().trim()}`

        return query[0]
   
        
    } catch (error) {
        
        throw `Error: ${getErrorMessage(error)}`
    }

}



 //Elimina el Token por usuario
 
export async function deleteTwoFactorToken(usuario:string){
    

    try {
        
        const query = await sql`delete from tbl_twofactortoken
                                where usuario = ${usuario.toUpperCase().trim()}`
      
        return query[0]
     
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }

}




 //Elimina el Token por userID
 
export async function deleteTwoFactorTokenByID(id:string){
    
    try {
        
        const query = await sql`delete from tbl_twofactortoken
                                where userID = ${id}`
                                
        return query[0]
   
        
    } catch (error) {
        throw `Error: ${getErrorMessage(error)}`
    }
}




interface TokenCreate{
    username: string,
    userID: number,
    token: string,
    expires: Date
}



export async function createTwoFactorToken({username, userID, token, expires}:TokenCreate) {


    try {
        
        const query = await sql`insert into tbl_twofactortoken(usuario, userid, token, expires)
                                values (${username.toUpperCase().trim()}, ${userID}, ${token}, ${expires}) RETURNING *`
     
        return query[0]
   
        
    } catch (error) {
    
        throw `Error: ${getErrorMessage(error)}`
    }

}


