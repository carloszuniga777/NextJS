'use client'

//Instalar react hook form para validar el formulario: npm i react-hook-form
import {useForm} from 'react-hook-form'         //Validador del formulario 
import {useRouter} from 'next/navigation'       //Redireccionador de pagina
import style from '@/modules/auth/styles/auth.module.css'
import { TextInputField } from '@/modules/auth/components/TextInputField'
import { registarUsuario } from '../actions/register'
import { useState } from 'react'




export function RegisterForm(){
    const {register, handleSubmit, formState: {errors}} = useForm()  //Permite registrar los input que vamos a capturar
    const[err, setErr] = useState<string>()

    const router = useRouter()                                       //Enrutador para redireccionar pagina       


    //Se envia el formulario al backend por medio de una A  API-REST
    //handleSubmit obtiene la data que se envia del submit de los inputs del formulario como un objeto
    const onSubmit = handleSubmit( async({username, email, password, confirmPassword}) => {
        
   
        //Si la contraseña es diferente 
        if(password !== confirmPassword){
            return alert('Passwords no coincide')
        } 

       // APIREST: Se envia al backend la informacion del formulario por medio de POST     
       /*const res = await fetch('/api/auth/register',                //ruta del formulario
                                {
                                    method: 'POST',                 //Metodo POST
                                    body: JSON.stringify(
                                        {
                                            username: username,
                                            email: email,
                                            password: password    
                                        }
                                    ),     
                                    headers:{
                                        'Content-Type': 'application/json'
                                    }
                                }
                            )
        */                    

       //User Userver         
       const res = await registarUsuario({  usuario: username, 
                                            correo: email, 
                                            contrasena:password
                                        })           
      

                                    

       //const resJSON = await res.json()   //dato recibido del backend convertido a json
       //console.log(resJSON)  
       console.log('res', res) 
       
       //Si el usuario se creo correctamente lo redirecciona al login para que pueda ingresar
       if(res.ok){
            router.push('/login')  
       }else{
          setErr(res.message as string)
       }
      
    })
   
  return (

        <form onSubmit={onSubmit} className='w-1/3'autoComplete="off">
             {err && (<p className='bg-red-700 text-lg text-white p-3  text-center rounded-lg mb-4'>{err}</p>)}  
            <section className={` ${style.card} ${style.cardLoggin} pt-4`}>
                <h1 className='text-slate-200 font-bold text-4xl mb-4 text-center'>Registrar</h1>

                <div className='bg-white rounded-lg pt-4 pb-10 flex justify-center'>
                     <div>
                            <TextInputField 
                                        name='username'    
                                        label='Usuario'    
                                        type='text'    
                                        placeholder='Usuario123' 
                                        register={register} 
                                        errors={errors.username}
                            />

                            <TextInputField 
                                        name='email'    
                                        label='Correo'    
                                        type='email'    
                                        placeholder='user@email.com' 
                                        register={register} 
                                        errors={errors.email}
                            />

                            <TextInputField 
                                        name='password'    
                                        label='Contraseña'    
                                        type='password'    
                                        placeholder='***********' 
                                        register={register} 
                                        errors={errors.password}
                            />

                            
                            <TextInputField 
                                        name='confirmPassword'    
                                        label='Confirmar Contraseña'    
                                        type='password'    
                                        placeholder='***********' 
                                        register={register} 
                                        errors={errors.confirmPassword}
                            />

                            <button className='w-full bg-blue-500 text-white p-3 rounded-lg'>
                                Registrar
                            </button>
                     </div>
                </div>               

            </section>
            
        </form>
   
  )
}