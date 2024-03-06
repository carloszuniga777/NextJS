import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Contact Page',
    description: 'Contacato Descripcion',
    keywords: ['Contacto', 'NextJS', 'Carlos Zuniga']
   };


export default function ContactPage(){
    return(
        <>
            <span className="text-7xl">Contact</span>
        </>
    )
}