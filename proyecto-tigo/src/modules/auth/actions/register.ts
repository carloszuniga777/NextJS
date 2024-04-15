'use server'

import db from '@/libs/db';              //cliente prisma
import {User} from '@prisma/client'     //tabla usuario de prisma
import * as yup from 'yup';             //validador
import bcrypt from 'bcrypt';            //Encriptador de contrasena

//Define lo que yup va a validar
const postSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
})


interface Props{
    usuario: string,
    correo: string,
    contrasena: string 
}

export async function registarUsuario({usuario,correo,contrasena}:Props){
    try {
        
             
       const {username, email, password} = await postSchema.validate( 
                                                {
                                                  username: usuario, 
                                                  email: correo, 
                                                  password: contrasena
                                                })
    

        //Busca si el usuario ya existe   
        //Funcional
       /* const userFound = await db.user.findFirst({
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
        const userFound = await db.user.findUnique({
            where: {
                email: email
            }
        })
    
        //si encuentra el email manda un mensaje de error
        if(userFound) throw `Correo ya existe`
        
    
    
        //busca en la base de datos si el usuario existe
        const usernameFound = await db.user.findUnique({
            where: {
                username: username
            }    
        })
    
        //Si el usuario existe manda un mensaje de error
        if(usernameFound) throw "Usuario ya existe"        
    
    
        //console.log({username, email, password})



       //Encrypta la contrasena 
       const hashedPassword = await bcrypt.hash(password, 10)
    

       //Crea en la base de datos el usuario y la contrasena encriptada
        const newUser = await db.user.create(
           {
             data: {
                     username: username,
                     email: email,
                     password: hashedPassword   
                   },     
           }
        )

        //Se copia la informacion del newUser, pero excluyendo el password porque no es encesario enviarselo al cliente
        const{password: _, ...user} = newUser


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

