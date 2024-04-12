import Link from 'next/link'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const menuItem = [
  {
    path: '/',
    title: 'Home'
  },
  {
    path: '/auth/login',
    title: 'Login' 
  },
  {
    path: '/auth/register',
    title: 'Registrar'
  }
]


export const Navbar = async() => {

  const session = await getServerSession(authOptions)

  //console.log(session)  
  
  return (
        <nav className='flex justify-between items-center bg-gray-950 text-white px-24 py-3'>
            <h1 className='text-xl font-bold'>NexthAuth</h1>
            <ul className='flex gap-x-2'>
               {/** Si el usuario esta registrado muestra el menu navegacion dashboard, de lo contrario muestra el menu de navegacion de registrar, login, home*/}
                
                { 
                   !session?.user ? 
                        (
                          menuItem.map( ({path, title}) => (
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
                                  <Link href='/logout'>Cerrar Session</Link>
                               </li>   
                          </>
                        )
                      

                }   
                  
            </ul>
        </nav>
  )
}
