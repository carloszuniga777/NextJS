'use client'

/*sniper: rafc*/

import Link from "next/link";
import style  from "./ActiveLink.module.css";
import { usePathname } from "next/navigation";

interface Props{
    path: string;
    text: string;
}

export const ActiveLink = ({path, text}: Props) => {
   const pathName = usePathname()                       //Solo funciona en lado de cliente, por eso es necesario usar el use-cliente //Se obtiene la ruta actual

  return (
    <Link className={ `${style.link} ${ (pathName == path) && style['active-link'] }`} href={path}>
        {text}
    </Link>

  )
}
