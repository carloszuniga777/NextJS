import NextAuth from "next-auth"
import authConfig from "@/auth.config"
//import { pool } from "./server/database"    //Instalar: npm install @auth/pg-adapter pg | Configuracion del adaptador pg: https://authjs.dev/getting-started/adapters/pg
//import PostgresAdapter from "@auth/pg-adapter"



export const { 
    auth, 
    handlers, 
    signIn, 
    signOut 
} = NextAuth({
    callbacks:{
        async session({token, session}){
            /*console.log({sessionTokem: token,
                         session: session })*/
           
            if(token.sub && session.user){
                session.user.id = token.sub
            }   

            return session
        },
        async jwt({token}){
            //console.log('token', {token})
            return token
        }
    },
   // adapter: PostgresAdapter(pool),               
    session: { strategy: "jwt" },
    ...authConfig
})