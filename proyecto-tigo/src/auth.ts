import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { confirmToken, deleteTwoFactorTokenByID, getTwoFactorTokenByUserId } from "./modules/auth/actions/service/twoFactorToken"
import { getUserByID } from "./modules/auth/actions/service/user"



export const { 
    auth, 
    handlers, 
    signIn, 
    signOut 
} = NextAuth({
    
    pages: {
		error: '/',
		signIn: '/',
		signOut: '/',
	},

    callbacks:{

        //Inicio de Session
        async signIn({user, account}){
             console.log('sigIn', {user, account})   
             

             if(!user.id) return false


            /**Verifica si el usuario existe, si no existe deniega el acceso a traves del middleware
             * Esto proveé una capa extra de seguridad, ya que hemos hecho lo mismo en la parte del Front End
             * */ 
            const existingUser = await getUserByID(user.id)  
             
            if(!existingUser){
                return false
            } 
            
           // console.log(existingUser)

            /* Doble Autenticacion
            
               Valida que el usuario tenga un Token asignado, en caso que no lo tenga no le permite pasar.
               Si tiene un Token asignado, este se marca como verificado. Para permitir el ingreso al portal por 1 semana
            */
            const twoFactorConfirmation = await getTwoFactorTokenByUserId(existingUser.id_usuario)


            if(!twoFactorConfirmation) return false

             //Si el usuario tiene token, lo confirma (TRUE) para evitar que se le pida hasta la proxima semana
            await confirmToken(twoFactorConfirmation.usuario)

            return true
        },
        async session({token, session}){
           /* console.log({sessionTokem: token,
                         session: session })
           */

            if(token.sub && session.user){
                session.user.id = token.sub
            }   

            return session
        },
        async jwt({token}){
            //console.log('token', token.sub)

            return token
        }
    },        
   
    session: { strategy: "jwt" },
    ...authConfig
})