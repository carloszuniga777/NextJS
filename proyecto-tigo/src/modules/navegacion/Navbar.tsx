import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { ButtonSignOuth } from './ButtonSignOut';


export const Navbar = async() => {

   const session = await auth()
  
  //console.log(session)  


  const menuItemLogin = [
    {
      path: '/dashboard',
      title: 'Dashboard'
    },
    {
      path: '/register',
      title: 'Registrar'
    },
  ]
  

  return (

          session?.user &&  ( 
            
            <nav className='flex justify-between items-center bg-[#00377D] text-white px-24 py-3'>
                <Image src={"/Logo-Sales-Operations.png"} alt="Logo Sales Operation" className='w-[10%] min-w-20' width={1000} height={1000}/>
                <ul className='flex gap-x-2'>
                    {  
                      (
                          menuItemLogin.map( ({path, title}) => (
                                <li key={path}>
                                    <Link href={path}> {title} </Link>
                                </li>
                            ))
                        )    
                    }  
                  <li><ButtonSignOuth/></li>
                </ul>
            </nav>

           )

   )
}

 