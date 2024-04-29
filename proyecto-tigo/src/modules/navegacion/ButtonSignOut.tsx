'use client'
import { signOut } from "next-auth/react"



export function ButtonSignOuth(){

    return(
        <button onClick={()=>signOut()}>
                Cerrar Session
        </button>
    )
}