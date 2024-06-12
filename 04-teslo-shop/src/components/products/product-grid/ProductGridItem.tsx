'use client'

import { Product } from "@/interfaces"
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

interface Props{
    product: Product
}

//snipet rafc
export const ProductGridItem = ({product}:Props) => {

  //Hook para mostrar otra imagen cuando el usuario pasa encima del producto
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <article className="rounded-md overflow-hidden fade-in">
        
        <Link href={`/product/${product.slug}`}> 
            <Image
                src={`/products/${ displayImage}`}
                alt={product.title}
                className="w-full object-cover rounded"
                width={500}
                height={500}
                onMouseEnter={()=>setDisplayImage(product.images[1])}       //Evento para mostrar una imagen cuando el usuario pone el mouse encima del producto
                onMouseLeave={()=>setDisplayImage(product.images[0])}       //Evento para mostrar otra imagen cuando el mouse del usuario sale del producto
            />
        </Link>

        <div className="p-4 flex flex-col">
            <Link 
                 className="hover:text-blue-600"   
                 href={`/products/${product.slug}`}>
                {product.title}
            </Link>
            <span className="font-bold">${product.price}</span>
        </div>

    </article>
  )
}
