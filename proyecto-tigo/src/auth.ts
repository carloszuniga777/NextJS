import NextAuth from "next-auth"
import authConfig from "@/auth.config"

import { pool } from "@/server/database"    //Instalar: npm install @auth/pg-adapter pg | Configuracion del adaptador pg: https://authjs.dev/getting-started/adapters/pg
import PostgresAdapter from "@auth/pg-adapter"

import { deleteTwoFactorTokenByID, getTwoFactorTokenByUserId } from "./modules/auth/actions/service/twoFactorToken"



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
        async signIn({user, account}){
             console.log('sigIn', {user, account})   

             if(!user.id) return false

           // const twoFactorConfirmation = await getTwoFactorTokenByUserId(user.id)

          //  console.log({twoFactorConfirmation})

            //if(!twoFactorConfirmation) return false

            
            //await deleteTwoFactorTokenByID(user.id)


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
    adapter: PostgresAdapter(pool),    
    session: { strategy: "jwt" },
    ...authConfig
})