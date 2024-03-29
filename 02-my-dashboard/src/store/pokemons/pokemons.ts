
/**
 * Configuracion para almacenar en un estado global los favorites 
 * de los pokemones
 */

//snippet rxslice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/pokemons';


/**
 *  Logica para almacenar los favoritos, se guardaran en un objeto 
 * 
 * {
 *  favorites: {
 *     '1': { id: 1, name: 'bulbasaur'}
 *     '2': { id: 2, name: 'charmander'}
 *   }
 * }
 */
interface PokemonsState {          //Llaves es un string y los values es simplepokemons 
    favorites: { [key: string]: SimplePokemon }   //Se va a tener Equis cantidad de String y cada llave apunta a SimplePokemon  [ {id, name}, {id, name}]
}


//Definicion de valores iniciales
const initialState: PokemonsState  = {
    favorites: {}
}


const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    /**Debido a que no se puedo inicializar el initialState directamente desde el localStorge,
       Se creo esta funcion para que inicialice el state desde el provider, de esta manera se puedan 
       cargar los pokemones que se encuentran marcados como favoritos desde el localstorage
    */ 
    setFavoritePokemons(state, action:PayloadAction< { [key: string]: SimplePokemon }  >){
        state.favorites = action.payload
    },


    toggleFavorite(state, action: PayloadAction<SimplePokemon>){
        
        const  pokemon = action.payload         //se obtiene el objeto pokemon {id, name}
        const {id} = pokemon

        
        //Pregunta si el pokemon existe en el state global, se aplica !! para convertir el undefine en un valor boleano de tipo false
        if(!!state.favorites[id]){                    //Es igual a decir si state[id] !== undefined
           delete state.favorites[id]                 //Si existe, se realiza el delete en el state
         //return
        }else{
            //Si no existe, guarda en el state 
            state.favorites[id] = pokemon
        }

        /*Se guarda en el localstorage - No se debe hacer en Redux
          Para poder almacenar se tuvo que crear un middleware en la carpeta Store  
        */
       // localStorage.setItem('favorite-pokemons', JSON.stringify(state.favorites))

    }
  }
});

export const {toggleFavorite, setFavoritePokemons} = pokemonsSlice.actions
export default pokemonsSlice.reducer