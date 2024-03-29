/**Logica de almacenado en el localstorge, los pokemones marcados como favorito usando Redux */

import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";

export const localStorageMiddleware = ( state: MiddlewareAPI) =>{
    return (next: Dispatch) => (action: Action) => {
           next(action)                         //Evita que se bloquee la pantalla, para que el usuario pueda realizar una accion
          
          // console.log({state: state.getState()}) 
          // console.log(action) 

          //Si detecta la accion de tipo toggleFavorite almacena en el localStorage, el pokemon marcado como favorito
           if(action.type === 'pokemons/toggleFavorite'){
             const { pokemons, counter } = state.getState() as RootState

             //Almacena en el localstorage los pokemones marcado como favoritos
             localStorage.setItem('favorite-pokemons', JSON.stringify(pokemons.favorites))

             return
           }
    }
}