'use client'

import {useForm} from 'react-hook-form'   //Validador del formulario 
import {signIn} from 'next-auth/react'    //Autenticacion
import { useRouter } from 'next/navigation'

export default function LoginPage() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()

  const onSubmit = handleSubmit( async({email, password}) =>{
    //Autentica si el usuario existe o no  
    const res = await signIn('credentials',{
                                              email: email,
                                              password: password,
                                              redirect: false           //Para que no redirija al formulario que tiene por defecto NextAuth
                                            }
                              )


     // console.log(res)

      if(res?.error){
        alert(res.error)
      }else{
        router.push('/dashboard')   //Si el usuario existe redirecciona a la pagina de inicio
      }          
                              
  })


  return (
    <section className="h-[calc(100vh-2rem)] flex justify-center items-center">
      <form onSubmit={onSubmit} className='w-1/3'>
        <h1 className='text-slate-200 font-bold text-4xl mb-4'>Login</h1>

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
    </section>
  );
}