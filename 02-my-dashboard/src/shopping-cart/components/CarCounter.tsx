'use client'

import { useAppDispatch, useAppSelector } from "@/store";
import { addOne, initCounterState, resetCount, substractOne } from "@/store/counter/counterSlice";
import { useEffect, useState } from "react";

interface Props{
    value?: number;               //? es un valor opcional
}


/*Se copia en portapapeles el resultado de la peticion get de POSTMAN (localhost:3000/api/counter)
  {
    "method": "GET",
    "count": 100 
   }

    Luego se va a Mostar y ejecutar comandos >
                Seleccionar > Paste Json as Code  
                Seleccionar > TypeScript
                            > Escribir el nombre de la interface
*/
export interface CounterResponse {
    method: string;
    count:  number;
}


const getApiCounter = async():Promise<CounterResponse>=>{
    const data = await fetch('/api/counter')
                       .then(res => res.json()) 

    console.log({data})                   
    return data                 
}




//sniper rafc
export const CarCounter = ({ value = 0}: Props) => {
    //Usando useState
   // const [count, setCount] = useState(value)

   //Usando Redux
   const count = useAppSelector(state => state.counter.count)
   const dispatch = useAppDispatch()  


/* //Usando useEffect para inicializar el Counter con el valor configurado en Value la primera vez que renderiza la pagina, en este ejemplo value=20
   useEffect(()=>{
        dispatch( initCounterState(value))
   },[dispatch, value])
*/
   
   //Haciendo una peticion desde una fuente externa, en este caso, un REST API configurada 
   //Se configura el counter en 100, como valor inicial
   useEffect(()=>{
    getApiCounter().then( ({count}) =>  dispatch( initCounterState(count)) )
   },[dispatch])


  return (
    <>
        <span className="text-9xl">{count}</span>
        <div className="flex gap-2">
            <button 
                    //onClick={()=>setCount(count - 1)}       //Decrementado el contador usando useState
                    
                    onClick={()=>dispatch( substractOne() )}     //Decrementado e contador en 1 usando Redux  
                    className="flex item-center justify-center p-2 rounded-xl bg-yellow-400 text-white hover:bg-gray-600 transition-all w-[100px] m-r2">
                -1
            </button>
            <button 
                //    onClick={()=>setCount(count + 1)}      //Aumentando el contador usando useState

                    onClick={()=>dispatch( addOne() )}        //Aumentando e contador en 1 usando Redux  
                    className="flex item-center justify-center p-2 rounded-xl bg-sky-500 text-white hover:bg-gray-600 transition-all w-[100px] m-r2">
                +1
            </button>
        </div>
    </>
  )
}
