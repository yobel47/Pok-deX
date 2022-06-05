import pokeApi from '../services/pokeApi';
import getPokemonImageById from './getPokemonImageById';
import capitalizeFirstLetter from './capitalizeFirstLetter';

const getPokemonData = async (value) => {
  const { data: pokemonData } = await pokeApi.get(`/pokemon/${value}`);
  const { data: pokemonSpecieData } = await pokeApi.get(
    `/pokemon-species/${value}`,
  );

  const pokemonNameIndex = pokemonSpecieData.names.findIndex(
    (name) => name.language.name === 'en',
  );

  const pokemonGeneraIndex = pokemonSpecieData.genera.findIndex(
    (genera) => genera.language.name === 'en',
  );

  const pokemonFlavorTextIndex = pokemonSpecieData.flavor_text_entries.findIndex(
    (text) => text.version.name === 'x' && text.language.name === 'en',
  );

  const pokemonTypesFormatted = pokemonData.types.map(({ type }) => ({
    name: capitalizeFirstLetter(type.name),
    url: type.url,
  }));

  const pokemonStatsFormatted = pokemonData.stats.map((stat) => {
    let name = '';

    if (stat.stat.name === 'hp') {
      name = 'HP';
    } else if (stat.stat.name === 'attack') {
      name = 'Attack';
    } else if (stat.stat.name === 'defense') {
      name = 'Defense';
    } else if (stat.stat.name === 'special-attack') {
      name = 'Sp. Atk';
    } else if (stat.stat.name === 'special-defense') {
      name = 'Sp. Def';
    } else if (stat.stat.name === 'speed') {
      name = 'Speed';
    }

    return {
      base_stat: stat.base_stat,
      name,
      url: stat.stat.url,
    };
  });

  // eslint-disable-next-line camelcase
  const eggGroupsFormatted = pokemonSpecieData.egg_groups.map((eggGroup) => ({
    name: capitalizeFirstLetter(eggGroup.name),
    url: eggGroup.url,
  }));

  return {
    id: pokemonData.id,
    name: pokemonSpecieData.names[pokemonNameIndex].name,
    description:
      pokemonSpecieData.flavor_text_entries[pokemonFlavorTextIndex].flavor_text,
    image: getPokemonImageById(String(pokemonData.id)),
    genera: pokemonSpecieData.genera[pokemonGeneraIndex].genus,
    pokedex_number: pokemonData.id.toString().padStart(3, '0'),
    base_experience: pokemonData.base_experience,
    types: pokemonTypesFormatted,
    stats: pokemonStatsFormatted,
    height: pokemonData.height,
    weight: pokemonData.weight,
    gender_rate: pokemonSpecieData.gender_rate,
    egg_groups: eggGroupsFormatted,
  };
};

export default getPokemonData;
