import { getPokemonData } from '../utils';

async function PokebagController(pokemon) {
  const pokemons = await pokemon.map((item) => {
    const pokemonData = getPokemonData(item);
    return pokemonData;
  });
  return Promise.all(pokemons);
}
export default PokebagController;
