import NextAuth from "next-auth/next";                                //Instalar NextAuth: npm i next-auth para la autenticacion
import CredentialsProvider from "next-auth/providers/credentials";   //Para loggearse con usuario y contraseña     
import db from '@/libs/db';
import bcrypt from 'bcrypt';

interface User {
    id: string,
    usuario: string,
    correo: string
}

interface Record{
    username: string,
    password: string
}

//Se realiza la configuracion  https://next-auth.js.org/providers/credentials
export const authOptions= {
    providers:[
                //Se realiza la configuracion para el ingreso de credenciales: email, password
                CredentialsProvider({
                        name: "Credentials",
                        
                        credentials: {
                            username: { label: "Usuario", type: 'text', placeholder: "jsmith"},                         //Es para indicar que campo estara autenticando
                            password: { label: "Contraseña", type: "password", placeholder: '**************'}
                        },
                        
                        async authorize(credentials: Record|undefined, req):Promise<User|null>{
                                
                                //Busca en la base de datos por medio del username los datos del usuario
                                const userFound = await db.tbl_boc_logins.findUnique({
                                        where: {
                                                usuario: credentials?.username
                                        }
                                })

                               //  console.log('userFound', userFound)
                                
                                //Si el usuario no ha sido encontrado lanza un error
                                 if(!userFound) throw new Error('Usuario no encontrado')

                                //Se coloco para solventar el problema de undefined de credentials.password
                                if(!credentials) return null

                                //Se compara la contrasena escrita por el usuario vs la contrasena que esta registrada en la base de datos  
                                //La contrasena que esta almacenada en la base de datos esta encryptada por lo que se necesita desencriptar para compararlo con la contrasena que el usuario escribio  
                                const matchPassword = await bcrypt.compare(credentials.password, userFound.pass)
                                
                                //Si no ha coincide la contrasena retorna null
                                if(!matchPassword) throw new Error('Contraseña incorrecta')    

                            //Si el usuario se autentico correctamente se crea un tocken en las cookies, y te redirige al homePage    
                        return {
                                    id: userFound.id.toString(),
                                    usuario: userFound.usuario,
                                    correo: userFound.correo
                            } 
                             
   
                        }   
                }),
               
        ],

        secret: process.env.SECRET,
        
        pages:{
             signIn:'/login'                   //Se define que la pagina signin es la url indicada          
        }
}

const handler = NextAuth(authOptions)

//Se exporta y se utilizara tanto para peticiones GET o POST
export {handler as GET, handler as POST}

/*
  NextAuth proporciona un formulario de inicio de sesion incorporado
  Cuando navegue a la URL "/api/auth/signin"
  
  http://localhost:3000/api/auth/signin 
*/