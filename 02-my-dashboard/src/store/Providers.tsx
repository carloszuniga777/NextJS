//sniper: rafc

'use client'

import { Provider } from "react-redux"
import { store } from "./"
import { useEffect } from "react"
import { setFavoritePokemons } from "./pokemons/pokemons"

interface Props{
    children: React.ReactNode
}


export const Providers = ({ children } : Props) => {

  //Carga la primera vez la informacion de los pokemones favoritos que se encuentran en el localstorage 
  //en el state de redux 
  useEffect(()=>{    
    const storage = localStorage.getItem('favorite-pokemons') ?? '{}'   // Si el localstorage esta vacio devuelve el objeto {}
    const favorite = JSON.parse(storage) 
    //console.log(favorite)
    store.dispatch( setFavoritePokemons(favorite))
  }, [])

  return (
    <Provider store={store}>
        <div>{children}</div>
    </Provider>
  )
}
