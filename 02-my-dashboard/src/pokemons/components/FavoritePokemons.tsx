'use client'

//snippet rafc
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store';
import { PokemonGrid } from './PokemonGrid';
import { IoHeartOutline } from 'react-icons/io5';
import { SimplePokemon } from '..';



export const NoFavorites = () =>{
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center">
          <IoHeartOutline size={100} className="text-red-500"/>
          <span>No hay favoritos</span>
      </div>
    )
}



export const FavoritePokemons = () => {

    const favoritePokemons = useAppSelector(state => Object.values(state.pokemons.favorites))    // Con Object.values convierte los objetos en un arreglo                           
    const [pokemons, setPokemons] = useState<SimplePokemon[]>(favoritePokemons)                  // se usa un useState para evitar que el elemento desaparezca si acaso el usuario dio click en el favorito por error no desparezca la tarjeta del pokemon, a menos que cambien de pagina
    
    /** La idea es era solo cargar la informacion de los pokemones favoritos la primera vez, 
     *  luego que no hiciera nada porque el useState se iba a encargar de mantener los favoritos
     *  a pesar que este mutando el favorito store, el problema era cuando quitabas algun pokemon
     *  de favoritos se lanzaba el useEffect otra vez cambiando otra vez el  useState, entonces aqui
     *  es donde se hace el pare y para eso se uso el UseRef con un valor booleano para hacer el cambio 
     *  una vez, y luego que no se haga nada y esto lo controlamos con un if 
     */ 
    const isLoad = useRef<boolean>(false)

    useEffect(() => {
        if(isLoad.current===false && favoritePokemons.length!==0){
            setPokemons(favoritePokemons)
            isLoad.current = true
        }

    }, [favoritePokemons])
    



    return (
        
        <>
            {/*<PokemonGrid pokemons={favoritePokemons}/> */}

            {
                pokemons.length > 0 
                    ? ( <PokemonGrid pokemons={pokemons}/> ) 
                    : ( <NoFavorites/> )   
            }

        </>
    )
}






