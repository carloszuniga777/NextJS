'use client'

import { setCookie } from "cookies-next";           //Client Side
import { useRouter } from "next/navigation";
import { useState } from "react";


//Insalar las cookies: npm i cookies-next
// Plantilla tabs: https://tailwindcomponents.com/component/radio-buttons-1



interface Props{
    currentTab?: number;
    tabOptions?: number[];
}


//snnipet rafc
export const TabBar = ({tabOptions= [1,2,3,4], currentTab}: Props) => {

    const [selected, setSelected] = useState(currentTab)
    const router = useRouter()


    //guarda la cookie seleccionada
    const onTabSelected = ( tab: number) =>{
        setSelected(tab)
        setCookie('selectedTab', tab.toString())
        router.refresh()                                    //refresca la pagina cada vez que el usuario selecciona un nuevo tab
    }
    

    return (
           
      <div className={`grid w-full grid-cols-${tabOptions.length} space-x-2 rounded-xl bg-gray-200 p-2`}>  {/*Se agrego safelist en el archivo tailwing para que reconozca la concatenazacion dinamica de  grid-cols-*/}
            {
                tabOptions.map(tab =>(
                    <div key={tab}>
                        <input checked={selected === tab}    //Si el valor seleccionado en el state es igual al tab pone el check
                               type="radio" 
                               id={tab.toString()} 
                               className="peer hidden"
                               onChange={()=>{}}
                         />
                        <label onClick={()=>onTabSelected(tab)}
                                className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            {tab}
                        </label>
                    </div>

                ))
            }
       </div> 
    )
  }

