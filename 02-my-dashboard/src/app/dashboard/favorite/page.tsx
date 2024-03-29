//sniper prc
import { FavoritePokemons } from "@/pokemons";



export const metadata = {
 title: 'Favoritos',
 description: 'Aqui se encuentra el listado de pokemons favoritos',
};




/**Esta es la pagina principal donde se encuentra el listado de todos los Pokemones
 * Se crea el componente PokemonGrid que posiciona cada uno de los pokemons
 */

export default async function PokemonsPage() {
  
  return (   
          <div className="flex flex-col">
              <span className="text-5xl my-2">Pokemons Favoritos <small className="text-blue-500">Global State</small></span>
              <FavoritePokemons/> 
          </div>
      )

}


