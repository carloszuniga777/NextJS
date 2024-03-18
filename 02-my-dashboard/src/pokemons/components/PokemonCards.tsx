//sniper rafc

import Image from "next/image"
import { SimplePokemon } from '../interfaces/simple-pokemon';
import Link from "next/link";
import { IoHeartOutline } from "react-icons/io5";
//import "./PokemonTransitionCard.css";

interface Props{
   pokemon: SimplePokemon
}


/**Se crea las tarjetas que va a contener cada uno de los pokemons */

export const PokemonCards = ({pokemon}:Props) => {

    const {id, name} = pokemon

  return (


  <div className="cardPokemon flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
        
        <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{transform: "scale(1.5)", opacity: 0.1}}>
          <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
          <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
        </svg>

        <div className="relative pt-10 px-10 flex items-center justify-center">
            <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: "radial-gradient(black, transparent 60%)", transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)", opacity: 0.2}}></div>
            <Image className="relative w-35" 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`} 
                    alt={name} 
                    width={100} 
                    height={100}
                    priority={false}
             />
        </div>

        <div className="relative text-white px-6 pb-6 mt-6">
          <div className="flex flex-col justify-center items-center">
            <p className="pt-2 text-lg font-semibold text-gray-50 text-center capitalize">{name}</p>
            <div className="mt-5">
                <Link href={`/dashboard/pokemon/${id}`} className="border rounded-full py-2 px-5 text-xs font-semibold text-gray-100">
                    Más información
                </Link>
            </div>
          </div>
        </div>


        <div className="border-b">
            <Link href="/dashboard/main" className="px-4 py-2 flex justify-center items-center">
                  <div className="text-gray-50">
                      <IoHeartOutline/>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-medium text-gray-50 leading-none"> 
                        No es favorito
                    </p>
                  </div>
            </Link>
        </div>
  </div>

  

    
  )
}