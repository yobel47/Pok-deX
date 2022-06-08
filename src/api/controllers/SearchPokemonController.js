import { getPokemonData } from '../utils';

function SearchPokemonController(query) {
  return getPokemonData(query);
}
export default SearchPokemonController;
