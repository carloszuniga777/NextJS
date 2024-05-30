import crypto from "crypto";
import { createTwoFactorToken, deleteTwoFactorToken, getTwoFactorTokenByUser } from "../actions/service/twoFactorToken";
import { getUser } from "../actions/service/user";
import { getErrorMessage } from "@/functions/error";


interface newToken{
    username: string,
    userID: string,
    expires: Date,
    token: string
}


/**Esta funcion genera el codigo de doble autenticacion que expirara despues de 5 minutos */

export async function generateTwoFactorToken(username:string):Promise<newToken>{

    const twoFactorToken = crypto.randomInt(100_000, 1_000_000).toString();           //genera el token entre 100000 hasta 1 millon  
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)                   // 5 minutos convertidos a segundos (60) y luego a milisegundos(1000)


    try {
            //Elimina si hay un existente token para el usuario
            const existingToken = await getTwoFactorTokenByUser(username)


            if(existingToken){
                await deleteTwoFactorToken(username)
            }  
            
            const user = await getUser(username)

          

            //crea el nuevo Token
            const newTwoFactorToken = await createTwoFactorToken({
                                                                  username, 
                                                                  userID: user.id_usuario,  
                                                                  expires,
                                                                  token: twoFactorToken
                                                                  }
                                                                )
        
                                                                
       // console.log(newTwoFactorToken)

        return newTwoFactorToken  as newToken                                                         


    } catch (error) {
        throw `Error al generar el Token 2FA ${getErrorMessage(error)}`
    }
}