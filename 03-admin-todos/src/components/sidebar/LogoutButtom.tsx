'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { CiLogout } from "react-icons/ci"
import { IoShieldCheckmarkOutline, IoShieldOutline } from "react-icons/io5"


export const LogoutButtom = () => {

   const {data: session, status } = useSession() 

   if(status === 'loading'){
     return (
        <button onClick={()=>signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <IoShieldOutline/>
            <span className="group-hover:text-gray-700">Espere...</span>
        </button>
     )
   }


 if(status === 'unauthenticated'){
    return (
       <button onClick={()=>signIn()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
           <CiLogout/>
           <span className="group-hover:text-gray-700">Ingresar</span>
       </button>
    )
   }


  return (
     <button onClick={()=>signOut()} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <CiLogout />
        <span className="group-hover:text-gray-700">Logout</span>
      </button>
  )
}