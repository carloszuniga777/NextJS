import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';    //Para encriptar contraseñas, instalar: npm i -D @types/bcryptjs
import { LoginSchema } from "./modules/auth/esquema/schema";  
import { getUserApi } from "./modules/auth/actions/service/userApi";





 
export default { 
    providers: [
        Credentials({
            
                    async authorize(credentials){
                          
                         //Validacion de las datos con zod, Para mejorar la seguridad, se valida las entradas que coincidan con lo que esperamos
                         const validatedFiels = LoginSchema.safeParse(credentials)

                         if(validatedFiels.success){
                           
                                const {username, password } = validatedFiels.data

                                //Busca en la base de datos por medio del username los datos del usuario
                                
                                /*Debido a que el Middleware solo soporta Edge Runtime ( documentacion: https://nextjs.org/docs/app/building-your-application/routing/middleware)
                                  No pueden ser usadas los Node.js runtime como lo es PG (conexion con la base de datos), 
                                  por lo que se tuvo que hacer un API para hacer la consulta
                                */
                                  const userFound = await getUserApi({username: username})
                                  

                                 //console.log('userFound', userFound)

                                //Si el usuario no ha sido encontrado lanza un error                                  
                                if(Object.keys(userFound).length === 0) throw new Error('Usuario no encontrado')
                                                                
                                 //Se compara la contrasena escrita por el usuario vs la contrasena que esta registrada en la base de datos  
                                 //La contrasena que esta almacenada en la base de datos esta encryptada por lo que se necesita desencriptar para compararlo con la contrasena que el usuario escribio  
                                const matchPassword = await bcrypt.compare(password, userFound.pass)

                                
                                //Si no ha coincide la contrasena retorna null
                                if(!matchPassword) throw new Error('Contraseña incorrecta')    

                                    
                                //Si el usuario se autentico correctamente se crea un tocken en las cookies, y te redirige al homePage    
                                return {
                                    id: userFound?.id.toString(),
                                    usuario: userFound?.usuario,
                                    correo: userFound?.correo
                                } 
                                 

                        }

                        return null

                    }        
                
        })
    ],
    
} satisfies NextAuthConfig