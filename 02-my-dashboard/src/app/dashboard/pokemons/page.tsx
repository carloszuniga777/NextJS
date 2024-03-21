//sniper prc
import { PokemonGrid, PokemonResponse, SimplePokemon } from "@/pokemons";



export const metadata = {
 title: 'Listado de Pokemons',
 description: 'Aqui se encuentra el listado de todos los pokemons',
};



const getPokemons = async( limit = 20, offset = 0):Promise<SimplePokemon[]>=>{
    
    const data:PokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
                       .then( res => res.json())
                                          
    const pokemons = data.results.map( pokemon => ({
        id: pokemon.url.split('/').at(-2)!,
        name: pokemon.name
    })) 

   // throw new Error('Esto es un error que no deberia de suceder')
   //throw notFound()

    return pokemons                   
}



/**Esta es la pagina principal donde se encuentra el listado de todos los Pokemones
 * Se crea el componente PokemonGrid que posiciona cada uno de los pokemons
 */

export default async function PokemonsPage() {
    const pokemons = await getPokemons(151)

  return (
    
    <div className="flex flex-col">
      <span className="text-5xl my-2">Listado de Pokemons <small className="text-blue-500">estatico</small></span>
      <PokemonGrid pokemons={pokemons}/>
    </div>
  

  )
}
