'use client'

//Instalar react hook form para validar el formulario: npm i react-hook-form
import {useForm} from 'react-hook-form'         //Validador del formulario 
import {useRouter} from 'next/navigation'       //Redireccionador de pagina


export default function Registerpage () {

    const {register, handleSubmit, formState: {errors}} = useForm()  //Permite registrar los input que vamos a capturar

    const router = useRouter()                                       //Enrutador para redireccionar pagina       


    //Se envia el formulario al backend por medio de una A  API-REST
    //handleSubmit obtiene la data que se envia del submit de los inputs del formulario como un objeto
    const onSubmit = handleSubmit( async({username, email, password, confirmPassword}) => {
        
        //Si la contraseña es diferente 
        if(password !== confirmPassword){
            return alert('Passwords no coincide')
        } 

       // Se envia al backend la informacion del formulario por medio de POST     
       const res = await fetch('/api/auth/register',                //ruta del formulario
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

       //const resJSON = await res.json()   //dato recibido del backend convertido a json
       //console.log(resJSON)  
       //console.log(res) 
       
       //Si el usuario se creo correctamente lo redirecciona al login para que pueda ingresar
       if(res.ok){
            router.push('/auth/login')  
       }
      
    })
       
   // console.log(errors)

  return (

<section className='h-[calc(100vh-2rem)] flex justify-center items-center'>
        <form onSubmit={onSubmit} className='w-1/3'autoComplete="off">
            <h1 className='text-slate-200 font-bold text-4xl mb-4'>Registrar</h1>
            
            <label htmlFor="username" className='text-slate-300 mb-2 block text-sm'>
                Usuario:
            </label>
            <input type="text"
                {...register('username', 
                             {
                               required: {
                                   value: true, 
                                   message: 'Este campo es requerido'
                               }, 
                            }
                           )
                 }
                className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                 placeholder='Usuario123'
             />
             {
                errors.username && (
                  <span className='text-red-500 text-xs'>{errors.username.message?.toString()}</span>      
                )
             }



            <label htmlFor="email" className='text-slate-300 mb-2 block text-sm'>
                Correo:
            </label>    
            <input type="email" 
                 {...register('email', 
                                {
                                  required: {
                                                value: true, 
                                                message: 'Este campo es requerido'
                                            }                
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
                                                       message: 'Este campo es requerido'
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
            
            <label htmlFor="confirmPassword" className='text-slate-300 mb-2 block text-sm'>
                Confirmar Contraseña:
            </label>  
            <input type="password"
                 {...register('confirmPassword', {
                                                    required: {
                                                                value: true, 
                                                                message: 'Este campo es requerido'
                                                              }   
                                                }
                               )
                 }
                 className='p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full'
                 placeholder='****************'
            />
             {
                errors.confirmPassword && (
                  <span className='text-red-500 text-xs'>{errors.confirmPassword.message?.toString()}</span>      
                )
             }

            <button className='w-full bg-blue-500 text-white p-3 rounded-lg'>
                Registrar
            </button>
        </form>
    </section>
  )
}
