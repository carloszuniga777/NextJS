'use client'

import {useForm} from 'react-hook-form'   //Validador del formulario | instalar: npm install react-hook-form
import { useEffect, useState, useTransition } from 'react'     //para los errores   
import style from '../styles/auth.module.css'
import { TextInputField } from '../../../components/form/TextInputField'
import Image from 'next/image'


import { login } from '../actions/login'
import { useRouter } from 'next/navigation'
import { generateTwoFactorToken } from '../token/token'
//import { Modal } from '../../../components/modal/modal';
//import { ContentModalTwoFactor } from './ContentModalTwoFactor';




export const LoginForm = () => {

  const {register, reset, setValue, handleSubmit, formState: {errors}} = useForm()
  const [error, setError] = useState<string | null>(null)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [messegeResendCode, setMessageResenCode] = useState(false)
  
  //const [isModalOpen, setIsModalOpen] = useState(false)
  
  const route = useRouter()


  //Envio del formulario
  const onSubmit = handleSubmit( async({username, password, twoFactorCode}) =>{
   
    route.refresh()                                                 //refresca la pagina

    //Se realiza todo el proceso de autenticacion, en la cual se valida si el usuario existe o no, y su contrasena.
    await login({username, password, twoFactorCode}).then(data=>{                 
     
        //Si hay error limpia el formulario y muestra mensaje de error
        if(data?.error){                           
          setError(data?.error as string)
        }

        //Si se genero un codigo de doble autenticacion 
        if(data?.twoFactor){
          //setIsModalOpen(true)
          setError(null)
          setShowTwoFactor(true)
        }

    }).catch(()=> setError('Algo salio mal'))
                              
  })






  const resendCodeTwoFactor = ()=>{
    setValue('twoFactorCode', '')     //Limpia el input de de doble autenticacion
    
    setMessageResenCode(true)  

    setTimeout(() => {
      setMessageResenCode(false);
    }, 5000);
  
  }
  
  return( 
        <>
            <form onSubmit={onSubmit} className='w-[25%] min-w-80'> 
                {messegeResendCode && showTwoFactor && (<p className='bg-green-700 text-lg text-white p-3  text-center rounded-lg mb-4'>El código de autenticación fue reenviado exitosamente.</p>)}
                {error && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{error}</p>)}       
                <section className={` ${style.card} ${style.cardLoggin}`}>
                        <figure className='flex flex-row justify-center w-full mb-3'>
                            <Image priority src={'/Logo-Sales-Operations.png'} alt="Logo Sales Operation" className='w-[80%]' width={1000} height={1000}/>
                        </figure>
                        <div className='bg-white rounded-lg pt-5 pb-10 flex justify-center'>
                            <div className={showTwoFactor ? 'pl-[3rem] pr-[3rem]' : ''}>  

                                  {/**Region de confirmacion de Token de doble autenticacion, este se visualizara despues que el usuario haya ingresado correctamente el usuario y la contrasena */} 
                                  {showTwoFactor && (
                                    <>
                                        <div className='flex flex-col'>
                                              <p className="mb-8 font-sans text-base  font-normal leading-relaxed text-gray-700 text-center">
                                                  Se envió el código de verificación a su correo y a su teléfono
                                              </p>
                                                <TextInputField
                                                    name="twoFactorCode"
                                                    placeholder="1234"
                                                    register={register}
                                                    errors={errors.twoFactorCode}
                                                    type="text"
                                                    label="Ingrese el Código"
                                                    clase="mb-1 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                  obligatoryField={false}
                                                />
                                                <button onClick={resendCodeTwoFactor} className='text-xs pl-3 pr-3 mb-4 font-bold text-[#5e86b7] hover:underline hover:text-[#000640]'>
                                                  Generar un nuevo código
                                                  </button>
                                                
                                        </div>
                                    </>
                                  )}

                                  {/**Region de ingreso de usuario y contrasena, este mostrara de primero por defecto*/}
                                  {!showTwoFactor && 
                                    (   
                                      <>
                                                                    
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
                                            
                                          
                                        </>
                                      ) 
                                    }
                    
                                      <button className=' bg-blue-500 text-white p-3 rounded-lg w-full'>
                                        { !showTwoFactor ? 'Iniciar Sesion' : 'Confirmar'}
                                      </button>
                                      <figure className='flex flex-row justify-center w-full mt-3'>
                                          <Image priority src={"/Logo_Sangre_Tigo.png"} alt="Logo Sales Operation" className='w-[40%]' width={100} height={100}/>
                                      </figure>
                                      
                              </div>  
                        </div>
                </section>
                
                {/*
                  <Modal isOpen={isModalOpen} onClose={()=>{setIsModalOpen(false)}}>
                    <ContentModalTwoFactor  register={register} error={errors.code}/>
                  </Modal>
                */}

            </form>  
        </>
               
  )

}
