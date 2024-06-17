import type { Sizes } from "@/interfaces"
import clsx from "clsx";

interface Props{
    selectedSize: Sizes;
    availableSizes: Sizes[] //['SX', 'M', 'XL', 'XXL']
}

//snipett rafc
export const SizeSelector = ({selectedSize, availableSizes}: Props) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>

        <div className="flex">
            {
                 /* clsx: Aplica la clase underline cuando selectedSize sea igual a size, 
                          Para que el usuario vea cual es la talla de camisa seleccionada  
                 */   
                availableSizes.map(size  =>(
                    <button key={size} 
                            className={
                                        clsx(
                                              "mx-2 hover:underline text-lg",
                                               {
                                                  'underline' : size === selectedSize          
                                               }
                                        )}>
                        {size}
                    </button>
                ))
            }
        </div>
    </div>
  )
}
