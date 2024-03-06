import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Precio',
    description: 'Precio Descripcion',
    keywords: ['Pricing Page', 'NextJS', 'Carlos Zuniga']
   };

export default function PricingPage(){
    return(
        <>
            <span className="text-7xl">Pricing</span>
        </>
    )
}