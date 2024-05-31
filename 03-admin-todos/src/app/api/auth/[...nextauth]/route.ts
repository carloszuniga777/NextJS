//NextAuth v4: https://next-auth.js.org/getting-started/example 

import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import prisma from '@/app/lib/prisma';
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials"
import { signInEmailPassword } from "@/auth/actions/auth-actions";


export const authOptions:NextAuthOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,

  // Configure one or more authentication providers
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),

    CredentialsProvider({

          name: 'Credentials',         // The name to display on the sign in form (e.g. 'Sign in with...')
          
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "usuario@google.com" },
            password: { label: "Contraseña", type: "password", placeholder:'*********' }
          },

          
          async authorize(credentials, req) {
           
            const user = await signInEmailPassword(credentials!.email, credentials!.password)

            // If no error and we have user data, return it
            if ( user) {
              return user
            }

            
            // Return null if user data could not be retrieved
            return null

          } 

    })

    // ...add more providers here
  ],

  session:{ 
    strategy: 'jwt'    //La session va a estar manejada por json web token
  },



  callbacks:{
      
    
      async signIn({user, account, profile, email, credentials}){
       // console.log(user)

        return true
      },

      //Manipula el json web token, en este ejemplo se agrego al jwt la informacion de los roles y el id del usuario 
      async jwt({token, user, account, profile }){
           // console.log({token})
            
            //Obtiene la informacion del usuario desde la base de datos
            const dbUser = await prisma.user.findUnique({
              where: { email: token.email ?? 'no-email'}
            })  

            // console.log(dbUser)

            //Si el usuario no esta activo
            if( dbUser?.isActive === false){
              throw Error('Usuario no está activo')
            }
            
            //Asigna al token los roles obtenidas de la informacion del usuario desde la base de datos 
            token.roles = dbUser?.roles ?? ['no-roles']
            token.id    = dbUser?.id    ?? 'no-uuid'
            token.isActive = dbUser?.isActive

            return token
      },


      //En esta parte se agrega a la session los valores que anteriormente fueron agregados al jwt, en este caso, hacemos asignacion a la session de los roles y el id
      async session({session, token, user}){

        //console.log(token)
        // console.log(session)   

        //Si existe una session y un usuario, se agrega los roles y el id a la session
        if( session && session.user ){
            session.user.roles = token.roles
            session.user.id    = token.id
            session.user.isActive = token.isActive
        }


        return session
      }

  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}
