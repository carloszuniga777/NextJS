//'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"

/**  Esto funciona del lado del cliente
 * 
 * Logica de almacenar los productos en la cookies, estos solo guarda el id del producto y la cantidad que el usuario selecciono
 * 
 * cookie: cart
 * {
 *   'uui-123-1: 4,
 *   'uui-123-1: 1,
 *   'uui-123-1: 2,  
 * }
 * 
 */

//Obteniendo la cookies del carrito de compras
export const getCookieCart = (): { [id: string]:number} =>{     //{ [id: string]:number}: La funcion va a retornar un id de tipo string y el valor de tipo number 
    
    //Si existe la cookie 'cart'
    if(hasCookie('cart')){
        const cookieCart = JSON.parse(getCookie('cart') as string ?? '')        //Obtiene la cookie, si la cookie es nula o undefined, se configura como string vacio => ''
        return cookieCart
    }

    return {}
}

//Logica para agregar un producto, si el usuario preciona el boton de agregar producto, agrega el producto en el carrito, el cual este es guardado en las cookies
export const addProductToCart = (id: string)=>{

   // console.log(id) //id del producto

    const cookieCart = getCookieCart()  //Se obtienen las cookies del carrito de compras

    //Si las cookies con el id del producto que el usuario selecciono existen, acomula el valor +1
    if( cookieCart[id]){
        cookieCart[id] = cookieCart[id] + 1
    }else{
        cookieCart[id] = 1   
    }

    //Guarda en la cookie cart
    setCookie('cart', JSON.stringify(cookieCart))
}


//Eliminacion de producto del carrito de compras
export const removeProductFromCart = (id:string)=>{

    const cookieCart = getCookieCart()               //Se obtienen las cookies del carrito de compras
    delete cookieCart[id]                            //Se elimina la cookie con el id correspondiente
    setCookie('cart', JSON.stringify(cookieCart))    //Guarda en la cookie cart
}


//------------------------------------------------------------------------------

//Eliminacion de productos de carrito de compras (page)
export const removeSingleItemFromCart = (id: string)=>{
    const cookieCart = getCookieCart()
    
    if(!cookieCart[id]) return

    const itemsInCart = cookieCart[id] - 1

    if(itemsInCart <= 0){                       //Si la cantidad de productos es menor a cero se elimina de la cookie
        delete cookieCart[id]
    }else{                                      //De lo contrario, actualiza el nuevo valor                
        cookieCart[id] = itemsInCart
    }

    setCookie('cart', JSON.stringify(cookieCart))   //guarda en la cookie cart

}

