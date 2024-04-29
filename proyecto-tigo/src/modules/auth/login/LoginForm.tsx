'use client'

import {useForm} from 'react-hook-form'   //Validador del formulario | instalar: npm install react-hook-form
import { useState, useTransition } from 'react'     //para los errores   
import style from '../styles/auth.module.css'
import { TextInputField } from '../components/TextInputField'
import Image from 'next/image'

import * as z from 'zod'
import { LoginSchema } from '../esquema/schema'
import { login } from '../actions/login'
import { useRouter } from 'next/navigation'


export const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()

  const [error, setError] = useState<string | null>(null)

  const route = useRouter()


  //Envio del formulario
  const onSubmit = handleSubmit( async({username, password}) =>{
   
    route.refresh()                                                 //refresca la pagina

    await login({username, password}).then(data=>{                  //envia el la informacion del usuario al backend por server action y procede a validar si el usuario existe o no
      setError(data?.error as string)
    })
                              
  })


  return( 
        <>
            <form onSubmit={onSubmit} className='w-[30%] min-w-80'>
                {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}       
                <section className={` ${style.card} ${style.cardLoggin}`}>
                        <figure className='flex flex-row justify-center w-full mb-3'>
                            <Image src={'/Logo-Sales-Operations.png'} alt="Logo Sales Operation" className='w-[80%]' width={1000} height={1000}/>
                        </figure>
                        <div className='bg-white rounded-lg pt-5 pb-10 flex justify-center'>
                            <div>                                
                                <TextInputField 
                                            name='username'    
                                            label='Usuario'    
                                            type='text'    
                                            placeholder='Usuario'
                                            register={register} 
                                            errors={errors.username}
                                            clase = 'mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            obligatoryField = { true } 
                               />
                                
                                <TextInputField  name='password' 
                                            label='Contraseña' 
                                            type='password' 
                                            placeholder='****************' 
                                            register={register} 
                                            errors={errors.password}
                                            clase = 'mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            obligatoryField = { true }
                               />
                                
                                <button className=' bg-blue-500 text-white p-3 rounded-lg w-full'>
                                    Iniciar Sesion
                                </button>
                                <figure className='flex flex-row justify-center w-full mt-3'>
                                    <Image src={"/Logo_Sangre_Tigo.png"} alt="Logo Sales Operation" className='w-[40%]' width={100} height={100}/>
                                </figure>
                            </div>
                        </div>
                </section>

            </form>  
          </>
               
  ) 

}



/*
export const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)


  //Envio del formulario
  const onSubmit = handleSubmit( async({username, password}) =>{
    
    //Autentica si el usuario existe o no  
    const res = await signIn('credentials',{
                                              username: username,
                                              password: password,
                                              redirect: false           //Para que no redirija al formulario que tiene por defecto NextAuth
                                            }
                              )

     console.log('res', res)

      
      if(res?.error){
        setError(res.error)
      }else{
        router.push('/dashboard')   //Si el usuario existe redirecciona a la pagina de inicio
        router.refresh()
      }      
                              
  })


  return( 
        <>
            <form onSubmit={onSubmit} className='w-[30%] min-w-80'>
            {/*<form action={onAction} className='w-[30%] min-w-80'>*//*}  
                {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}       
                <section className={` ${style.card} ${style.cardLoggin}`}>
                        <figure className='flex flex-row justify-center w-full mb-3'>
                            <Image src={'/Logo-Sales-Operations.png'} alt="Logo Sales Operation" className='w-[80%]' width={1000} height={1000}/>
                        </figure>
                        <div className='bg-white rounded-lg pt-5 pb-10 flex justify-center'>
                            <div>                                
                                <TextInputField 
                                            name='username'    
                                            label='Usuario'    
                                            type='text'    
                                            placeholder='Usuario'
                                            register={register} 
                                            errors={errors.username}
                                            clase = 'mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            obligatoryField = { true } 
                               />
                                
                                <TextInputField  name='password' 
                                            label='Contraseña' 
                                            type='password' 
                                            placeholder='****************' 
                                            register={register} 
                                            errors={errors.password}
                                            clase = 'mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                            obligatoryField = { true }
                               />
                                
                                <button className=' bg-blue-500 text-white p-3 rounded-lg w-full'>
                                    Iniciar Sesion
                                </button>
                                <figure className='flex flex-row justify-center w-full mt-3'>
                                    <Image src={"/Logo_Sangre_Tigo.png"} alt="Logo Sales Operation" className='w-[40%]' width={100} height={100}/>
                                </figure>
                            </div>
                        </div>
                </section>

            </form>  
          </>
               
  ) 

}
*/