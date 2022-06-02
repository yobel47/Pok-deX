import pokeApi from '../services/pokeApi';
import { getPokemonIdByUrl, getPokemonData } from '../utils';

async function PokemonController(query) {
  const { offset, limit } = query;

  const apiResponse = await pokeApi.get('/pokemon', {
    params: {
      offset: offset || 0,
      limit: limit || 20,
    },
  });

  const { results } = apiResponse.data;

  const pokemons = results.map(async (pokemon) => {
    const pokemonId = getPokemonIdByUrl(pokemon.url);

    const pokemonData = await getPokemonData(pokemonId);

    return pokemonData;
  });

  return Promise.all(pokemons);
}
export default PokemonController;
