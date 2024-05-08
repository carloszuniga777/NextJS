'use server'

import * as z from 'zod'
import { signIn } from '@/auth'
import { LoginSchema } from '../esquema/schema'
import { AuthError } from 'next-auth';
import { generateTwoFactorToken } from '../token/token';
import { sendTwoFactorTokenEmail } from '../endpoints/emailApi';
import { getUser } from './service/user';
import { compare } from 'bcryptjs';
import { confirmToken, getTwoFactorTokenByUser } from './service/twoFactorToken';


 
const DEFAULT_LOGIN_REDIRECT = "/dashboard";        //Ruta de redireccionamiento

//documentacion: https://authjs.dev/getting-started/session-management/login

export async function login(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values)         //Se valida con ZOD, Para mejorar la seguridad, se valida las entradas que coincidan con lo que esperamos
    

    //console.log(validatedFields)

    if(!validatedFields.success){
        return { error: 'Entrada invalida'}
    }

    //obtenemos el username, password y el codigo de token que el usuario ingreso
    const {username, password, twoFactorCode } = validatedFields.data
   
    try {

            //Se consulta a la base de datos si es un usuario existente
            const existingUser = await getUser(username)

            if(!existingUser) return {error: 'Usuario no encontrado'}



            //compara la contrasena introducida con la que existe en la base de datos
            const matchPassword = await compare(password, existingUser.pass);

            if(!matchPassword) return {error: 'Contraseña incorrecta'}



            /** DOBLE AUTENTICACION
             * 
             *  Si es un usuario existente, y el usuario ingreso un Token de autenticacion de doble factor 
             *  se procede a validar si tiene un Token vigente
             * 
             *  De lo contrario, se le genera un nuevo Token 
             * 
             * */    

            if(existingUser){

                 //Se obtiene informacion del token que se le genero al usuario en la base de datos 
                 const existTwoFactor = await getTwoFactorTokenByUser(username)


                //Si el usuario ingreso un codigo de doble verificacion  
                if(twoFactorCode){
                                       
                    //Valida que se le haya generado un Token al usuario  
                     if(!existTwoFactor) return {error: 'Usuario no cuenta con un Token'}
                     
                     //Valida que el token ingreso por el usuario se igual que se genero en la base de datos
                     if(existTwoFactor.token !== twoFactorCode) return {error: 'Codigo de verificación incorrecto'}

                     //Valida que el Token este vigente
                     const isExpired = new Date(existTwoFactor.expires) < new Date()  
                      
                     if (isExpired) return {error: 'El código de ya expiro'}
                     
                     //Si el Token ingresado por el usuario es correcto, este lo confirma (TRUE) para evitar que se le pida hasta la proxima semana
                     await confirmToken(existTwoFactor.usuario)


                 /*Si el usuario no ingreso un codigo de doble verificacion, valida si tiene un Token asignado pero que nunca lo confirmo o, 
                  no tiene ningun Token asignado, se genera un nuevo Token. */   
                }else if(!existTwoFactor?.confirmation){  

                        //genera el token de doble factor de autenticacion
                            const twoFactorToken = await generateTwoFactorToken(username)
                        
                            //Descomentar
                        //envia el correo 
                        /*await sendTwoFactorTokenEmail({
                                email: 'carlitoseberto@yahoo.com', 
                                /*email: existingUser.correo,*//*
                                token: twoFactorToken.token
                        })*/

                        return {twoFactor: true} 
                }

            }
   

        //Se inicia sesion y redirige a la paigna de inicio /dashboard
        await signIn('credentials', {
            username, 
            password,
            redirectTo:  DEFAULT_LOGIN_REDIRECT
        })


        return { success: "Inicio de sesión exitoso" };

    } catch (error) {
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                    return {error: 'Credenciales Incorrectas'}
                 case 'CallbackRouteError':
                     return {error: error?.cause?.err?.message}        
                default:
                    return{error: 'Algo salio mal'}    
            }
        }
        
       throw error
    }

}  
