//snippet rafc

import { CiBellOn, CiChat1, CiMenuBurger, CiSearch, CiShoppingCart } from "react-icons/ci"
import { cookies } from 'next/headers';
import Link from "next/link";


//Obteniendo el total de productos que hay en el carrito de compras que el usuario selecciono, para mostrarlos en las notificaciones del top menu
const getTotalCount = (cart: { [id:string]:number } ):number=>{
    let items = 0
    
    //Obteniendo los valores de los productos del carrito de compras atraves de las cookies
    Object.values( cart ).forEach( value =>{
            //console.log(value)                   //Si el usuario selecciono 2 camisas, 1 pantalon, en las cookies se recibe como valor 2, 1, esos valores son sumados al items
        items += value                             //Se suma el total de items seleccionados 
    })

    return items
}


export const TopMenu = () => {

    //Configuracion de Cookie
    const cookieStore = cookies()                                                    // Se otienen las cookies   
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}')                 // Se obtienen las cookies del carrito de compra | Tipado: {[id:string]:number}   el id es de tipo string y el valor de tipo number

    const totalItems = getTotalCount(cart)                                          //Obtiene el total de items seleccionados            



  return (
          <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">

            <div className="px-6 flex items-center justify-between space-x-4">
                <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
                
                <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                    <CiMenuBurger size={30} />
                </button>

                <div className="flex space-x-2">
                    
                    <div hidden className="md:block">
                        <div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
                            <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                            <CiSearch />
                            </span>
                            <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition" />
                        </div>
                    </div>
                    
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                        <CiSearch />
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                        <CiChat1 size={25} />
                    </button>

                    {/**Carrito de compras*/}
                    <Link
                         href={'/dashboard/cart'} 
                         className="p-2 flex items-center justify-center  h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                        {
                          ( totalItems > 0 ) && (<span className="text-md mr-2 text-blue-800 font-bold">{ totalItems }</span>)
                        }
                        <CiShoppingCart size={25}/>
                    </Link>

                </div>
            </div>
        </div>
  )
}
