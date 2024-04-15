'use client'

import {useForm} from 'react-hook-form'   //Validador del formulario 
import {signIn} from 'next-auth/react'    //Autenticacion
import { useRouter } from 'next/navigation'
import { useState } from 'react'         //para los errores   
import style from '../styles/auth.module.css'
import { TextInputField } from '../components/TextInputField'
import Image from 'next/image'


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
        <>
            <form onSubmit={onSubmit} className='w-[30%] min-w-80'>
                {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}       
                <section className={` ${style.card} ${style.cardLoggin}`}>
                        <figure className='flex flex-row justify-center w-full mb-3'>
                            <Image src={'/Logo-Sales-Operations.png'} alt="Logo Sales Operation" className='w-[80%]' width={1000} height={1000}/>
                        </figure>
                        <div className='bg-white rounded-lg pt-2 pb-10 flex justify-center'>
                            <div>                                
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