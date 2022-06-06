import { getPokemonData } from '../utils';

async function SearchPokemonController(query) {
  const pokemonData = await getPokemonData(query);

  return pokemonData;
}
export default SearchPokemonController;
