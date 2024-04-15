//instalar el modulo bcrypt: npm i bcrypt para encriptar la contrasena
//Instalar el modulo yup: npm i yup sirve para validar que la informacion y los campos que se envian al backend esten correctos

import { NextResponse } from "next/server"
import db from "@/libs/db";                 //Prisma
import * as yup from 'yup';                 //validador
import bcrypt from 'bcrypt';                //Encriptador de contrasena


const postSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required()
})


export async function POST(request: Request){

    try{
        
         const {username, email, password} = await postSchema.validate(await request.json())
    
    
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
        if(userFound){
            return NextResponse.json({ message: "Correo ya existe"}, {status:400})
        }
    
    
        //busca en la base de datos si el usuario existe
        const usernameFound = await db.user.findUnique({
            where: {
                username: username
            }    
        })
    
        //Si el usuario existe manda un mensaje de error
        if(usernameFound){
            return NextResponse.json({ message: "Usuario ya existe"}, {status:400})
        }
    
    
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
                   }
           }
        )

        //Se copia la informacion del newUser, pero excluyendo el password porque no es encesario enviarselo al cliente
        const{password: _,  ...user} = newUser
    
        
        //Se retorna la informacion username y email al cliente final
        return NextResponse.json(user)

    }catch(error){
        return NextResponse.json(error, {status: 500})
    }
}