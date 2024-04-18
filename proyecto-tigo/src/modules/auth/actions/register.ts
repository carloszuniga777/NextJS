'use server'

import db from '@/libs/db';              //cliente prisma
import * as yup from 'yup';             //validador                     |Instalar el modulo yup: npm i yup sirve para validar que la informacion y los campos que se envian al backend esten correctos
import bcrypt from 'bcrypt';            //Encriptador de contrasena     | instalar el modulo bcrypt: npm i bcrypt para encriptar la contrasena

//Define lo que yup va a validar
const postSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    tipo_usuario: yup.string(),
    teritorio: yup.string(),
    observacion: yup.string(),
    log: yup.string()
})

interface Props{
    usuario: string,
    correo: string,
    contrasena: string 
}

export async function registarUsuario({usuario,correo,contrasena}:Props){
    try {
        
             
        const {
               username, email, password, 
               tipo_usuario, teritorio, observacion, log
              }  = await postSchema.validate( 
                                                {
                                                  username: usuario, 
                                                  email: correo, 
                                                  password: contrasena
                                                })
    

        //Busca si el usuario ya existe   
        //Funcional
       /* const userFound = await db.tbl_boc_logins.findFirst({
            where: {
                    OR:[ 
                        {
                            email: email  
                        },
                        {
                            username: username 
                        }
                    ]
            }
        })*/
    
        //busca en la base ded datos si existe el email
        const userFound = await db.tbl_boc_logins.findUnique({
            where: {
                correo: email
            }
        })
    
        //si encuentra el email manda un mensaje de error
        if(userFound) throw `Correo ya existe`
        
    
    
        //busca en la base de datos si el usuario existe
        const usernameFound = await db.tbl_boc_logins.findUnique({
            where: {
                usuario: username
            }    
        })
    
        //Si el usuario existe manda un mensaje de error
        if(usernameFound) throw "Usuario ya existe"        
    
    
        //console.log({username, email, password})



       //Encrypta la contrasena 
       const hashedPassword = await bcrypt.hash(password, 10)
    

       //Crea en la base de datos el usuario y la contrasena encriptada
        const newUser = await db.tbl_boc_logins.create(
           {
                data: {  
                    usuario:       username,       
                    pass:          hashedPassword,
                    tipo_usuario:  tipo_usuario,
                    correo:        email,
                    territorio:    teritorio,
                    observacion:   observacion,
                    log:           log,
                    fecha_log:      new Date()
                }           
            }
        )

        //Se copia la informacion del newUser, pero excluyendo el password porque no es encesario enviarselo al cliente
        const{pass: _, ...user} = newUser


        return { 
                  ok: true,   
                  user
               }
        
    } catch (error) {
        return{
                ok:false,
                message: error 
        }   
    }
} 

