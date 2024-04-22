'use server'

import * as z from 'zod'
import { signIn } from '@/auth'
import { LoginSchema } from '../esquema/schema'
import { AuthError } from 'next-auth';

 
const DEFAULT_LOGIN_REDIRECT = "/dashboard";        //Ruta de redireccionamiento

//documentacion: https://authjs.dev/getting-started/session-management/login

export async function login(values: z.infer<typeof LoginSchema>){
    const validatedFields = LoginSchema.safeParse(values)         //Se valida con ZOD, Para mejorar la seguridad, se valida las entradas que coincidan con lo que esperamos

    if(!validatedFields.success){
        return { error: 'Entrada invalida'}
    }

    //obtenemos el username y el password
    const {username, password } = validatedFields.data
   
    try {
        
        //Se inicia sesion y redirige a la paigna de /dashboard
        await signIn('credentials', {
            username, 
            password,
            redirectTo:  DEFAULT_LOGIN_REDIRECT
        })

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
