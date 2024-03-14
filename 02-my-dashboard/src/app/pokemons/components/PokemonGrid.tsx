//sniper rafc
import Image from 'next/image';
import { PokemonCards } from './PokemonCards';
import { SimplePokemon } from '../interfaces/simple-pokemon';


interface Props{
    pokemons: SimplePokemon[]; 
}


export const PokemonGrid = ({pokemons}:Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
        
        {
          pokemons.map( pokemon => (
            <PokemonCards key={pokemon.id} {...pokemons}/>             
        //     <Image
        //         key={pokemon.id}
        //         src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}       
        //         width={100}
        //         height={100}
        //         alt={pokemon.name}
        //     />
        //   
            
          ))
        }
        
    </div>
  )
}
