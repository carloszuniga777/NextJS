import { initialData } from "@/seed/seed";
import notFound from "../not-found";
import { titleFont } from "@/config/fonts";
import { QuantitySelector, SizeSelector } from "@/components";



interface Props{
  params:{
    slug: string
  }
}

//snipett prc
export default function({ params }:Props) {

  const { slug } = params
  const product = initialData.products.find(product => product.slug === slug)

  if(!product) notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
          {/**SlideShow */}
          <div className="col-span-1 md:col-span-2">
            Hola mundo
          </div>

          {/**Detalles */}
          <div className="col-span-1 px-5">
                <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
                  { product?.title }
                </h1>
                <p className="text-lg mb-5">${product?.price}</p>
                 {/**Selector de tallas */}

                  {/**
                   * Estás utilizando el operador de afirmación no nula ! en TypeScript. 
                   * Este operador se utiliza para decirle al compilador de TypeScript que una variable será definitivamente no nula o no indefinida. 
                   * Esto significa que estás seguro de que product no será null o undefined en el momento en que se utilice.  
                   **/}

                  <SizeSelector 
                      selectedSize={product!.sizes[1]}    
                      availableSizes={product!.sizes}
                  />

                  {/**Selector de cantidad */}
                  <QuantitySelector quantity={2}/>


                  {/**Boton */}
                  <button className="btn-primary my-5">
                    Agregar al carrito
                  </button>


                  {/**Descripcion*/}
                  <h3 className="font-bold text-sm">Descripción</h3>
                  <p className="font-light">
                    { product?.description}
                  </p>
            
          </div>
    </div>
  );
}