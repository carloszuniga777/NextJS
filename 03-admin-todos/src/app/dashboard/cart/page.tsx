//snippet prc

import { products, type Product } from "@/app/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";
import { WidgetItem } from '../../../components/WidgetItem';


export const metadata = {
 title: 'Productos en el carrito',
 description: 'SEO Title',
};

interface ProductInCart{
  product: Product;
  quantity: number
}


//Obtencion de los productos (imagen, precio, etc) que estan almacenadas en las cookies
const getProductsInCart = (cart: {[id:string]:number}):ProductInCart[]=>{
    const productsInCart: ProductInCart[] = []                    //Se crea un array, que va a estar tipado con la inferface ProductInCart

    //Por medio del id de la cookie se busca el producto correspondiente y luego se almacena en un arreglo
    for (const id of Object.keys(cart)) {                         //Itera los productos obtenidos en las cookies
        const product = products.find( prod => prod.id === id)    //Se obtiene toda la informacion del producto (id, precio, rating, imagen)
        
        //Si el producto existe
        if(product){
          productsInCart.push({product: product, quantity: cart[id] }) //guarda en el arreglo el producto y la cantidad (obtenida de la cookie) 
        }
    }

    return productsInCart
}



export default function CartPage() {

  //Cookies
  const cookiesStore =  cookies()                                                             //Se obtienen las cookies del navegador
  const cart = JSON.parse( cookiesStore.get('cart')?.value ?? '') as {[id:string]:number}     //Se obtiene las cookies 'cart' y se convierte a JSON
  //console.log(cart)
  const productInCart = getProductsInCart(cart)                                               //Se obtiene la informacion de los productos (image, precio, rating) correspondiente a cada cookie almacenada (Nota: Las cookies solo se almacena el id del producto y la cantidad que el usuario selecciono)      
   
//Suma todos los elementos del array productInCart, para sacar el total a pagar
  const totalToPay = productInCart.reduce((prev, current)=> (current.product.price * current.quantity) + prev, 0)

  
  return (
    <section>
        <h1 className="text-5xl">Productos en el carrito</h1>
        <hr className="mb-2"/>
        <section className="flex flex-col sm:flex-row gap-2 w-full">

            <article className="flex flex-col gap-2 w-full sm:8/12">
              {
                 productInCart.map( ({product, quantity}) => (
                   <ItemCard key={product.id} product={product} quantity={quantity}/>
                 ))
              }
            </article>

            <article className="flex flex-col w-full sm:w-4/12">
               <WidgetItem title="Total a pagar">
                  <div className="mt-2 flex justify-center gap-4">
                    <h3 className="text-3xl font-bold text-gray-700">${(totalToPay * 1.15).toFixed(2)}</h3>
                  </div>
                    <span className="font-bol text-center text-gray-500">Impuestos 15% ${(totalToPay * 0.15).toFixed(2)}</span>
              </WidgetItem> 
            </article>

        </section>
    </section>
  );
}