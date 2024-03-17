//sniper rafc
import { PokemonCards } from './PokemonCards';
import { SimplePokemon } from '../interfaces/simple-pokemon';


interface Props{
    pokemons: SimplePokemon[]; 
}


export const PokemonGrid = ({pokemons}:Props) => {
  return (
    <div className="flex flex-wrap gap-1 items-center justify-center">
        
        {
          pokemons.map( pokemon => (
            <PokemonCards key={pokemon.id} pokemon={pokemon}/>             
            
          ))
        }
        
    </div>
  )
}
