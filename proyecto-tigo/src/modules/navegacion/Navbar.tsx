import Link from 'next/link'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Image from 'next/image'



const menuItemLogin = [
  {
    path: '/',
    title: 'Inicio'
  },
  {
    path: '/login',
    title: 'Ingresar' 
  },
  {
    path: '/register',
    title: 'Registrar'
  }
]


export const Navbar = async() => {

  const session = await getServerSession(authOptions)

  //console.log(session)  

  return (
        <nav className='flex justify-between items-center bg-[#00377D] text-white px-24 py-3'>
            <Image src={"/Logo-Sales-Operations.png"} alt="Logo Sales Operation" className='w-[10%] min-w-20' width={1000} height={1000}/>
            <ul className='flex gap-x-2'>

               {/** Si el usuario esta registrado muestra el menu navegacion dashboard, de lo contrario muestra el menu de navegacion de registrar, login, home*/}
                
                { 
                   !session?.user ? 
                        (
                          menuItemLogin.map( ({path, title}) => (
                                <li key={path}>
                                    <Link href={path}> {title} </Link>
                                </li>
                            ))
                        )  
                        : 
                        (
                          <>
                              <li>
                                  <Link href='/dashboard'>Dashboard</Link>
                              </li>
                              <li>
                                  <Link href='/api/auth/signout'>Cerrar Session</Link>
                              </li>   
                          </>
                        )
                      

                }   
                  
            </ul>
        </nav>
  )
}
