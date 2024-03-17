'use client'

import { useState } from "react";

interface Props{
    value?: number;               //? es un valor opcional
}



//sniper rafc
export const CarCounter = ({ value = 0}: Props) => {
    const [count, setCount] = useState(value)

  return (
    <>
        <span className="text-9xl">{count}</span>
        <div className="flex gap-2">
            <button 
                    onClick={()=>setCount(count - 1)} 
                    className="flex item-center justify-center p-2 rounded-xl bg-yellow-400 text-white hover:bg-gray-600 transition-all w-[100px] m-r2">
                -1
            </button>
            <button 
                    onClick={()=>setCount(count + 1)} 
                    className="flex item-center justify-center p-2 rounded-xl bg-sky-500 text-white hover:bg-gray-600 transition-all w-[100px] m-r2">
                +1
            </button>
        </div>
    </>
  )
}
