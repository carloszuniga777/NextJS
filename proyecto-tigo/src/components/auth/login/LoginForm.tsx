'use client'

import {useForm} from 'react-hook-form'   //Validador del formulario 
import {signIn} from 'next-auth/react'    //Autenticacion
import { useRouter } from 'next/navigation'
import { useState } from 'react'         //para los errores   
import { TextInputField } from '@/components/auth/login/TextInputField'


export const LoginForm = () => {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)


  //Envio del formulario
  const onSubmit = handleSubmit( async({email, password}) =>{
    
    //Autentica si el usuario existe o no  
    const res = await signIn('credentials',{
                                              email: email,
                                              password: password,
                                              redirect: false           //Para que no redirija al formulario que tiene por defecto NextAuth
                                            }
                              )

      //console.log(res)

      if(res?.error){
        setError(res.error)
      }else{
        router.push('/dashboard')   //Si el usuario existe redirecciona a la pagina de inicio
        router.refresh()
      }          
                              
  })



  return(
          <form onSubmit={onSubmit} className='w-1/3'>
                
                {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}
                
                <h1 className='text-slate-200 font-bold text-4xl mb-6 text-center'>Ingresar</h1>
                
                <TextInputField  
                            name='email'    
                            label='Usuario'    
                            type='email'    
                            placeholder='user@email.com' 
                            register={register} 
                            errors={errors.email}
                />
                
                <TextInputField  name='password' 
                            label='Contraseña' 
                            type='password' 
                            placeholder='****************' 
                            register={register} 
                            errors={errors.password}
                />
                
                <button className='w-full bg-blue-500 text-white p-3 rounded-lg'>
                    Ingresar
                </button>
         
          </form>  

  ) 

  
/*
  return (
            <form onSubmit={onSubmit} className='w-1/3'>

            {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}
            <h1 className='text-slate-200 font-bold text-4xl mb-6 text-center'>Ingresar</h1>

            <label htmlFor="email" className='text-slate-300 mb-2 block text-sm'>
                    Usuario:
                </label>
                

                <input type="email"
                    {...register('email', 
                                {
                                required: {
                                    value: true, 
                                    message: 'Email campo es requerido'
                                }, 
                                }
                            )
                    }
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='user@email.com'
                />
                {
                    errors.email && (
                    <span className='text-red-500 text-xs'>{errors.email.message?.toString()}</span>      
                    )
                }



                <label htmlFor="password" className='text-slate-300 mb-2 block text-sm'>
                    Contraseña:
                </label>   
                <input type="password" 
                    {...register('password', {
                                            required: {
                                                        value: true, 
                                                        message: 'Contraseña es requerida'
                                                        }   
                                            }
                                )
                    }
                    className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                    placeholder='****************'
                />
                {
                    errors.password && (
                    <span className='text-red-500 text-xs'>{errors.password.message?.toString()}</span>      
                    )
                }

                <button className='w-full bg-blue-500 text-white p-3 rounded-lg'>
                    Ingresar
                </button>
        </form>
        
  )*/


}
