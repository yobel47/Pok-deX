import { getPokemonData } from '../utils';

async function PokebagController(pokemon) {
  const pokemons = await pokemon.map((item) => getPokemonData(item));

  return Promise.all(pokemons);
}
export default PokebagController;
