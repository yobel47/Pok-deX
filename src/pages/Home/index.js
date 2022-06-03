/* eslint-disable no-console */
import {
  View, Text, ImageBackground, Dimensions,
} from 'react-native';
import React from 'react';
// import PokemonController from '../../api/controllers/Pokemon';
import { pokeballHeader } from '../../assets';
import styles from '../../utils/styles';
import { SearchBar, PokemonCard } from '../../components';

const { height } = Dimensions.get('screen');

function Home() {
  // const tesi = () => {
  //   const query = { offset: 0, limit: 20 };
  //   PokemonController(query)
  //     .then(
  //       (result) => console.log(result),
  //     )
  //     .catch((error) => console.log(error));
  // };

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{ width: '100%', height: height / 4 }}
        source={pokeballHeader}
      >
        <View style={{
          paddingHorizontal: 40,
          marginTop: 80,
          marginBottom: 20,
        }}
        >
          <Text style={{ color: 'black', ...styles.applicationTitle }}>
            Pokédex
          </Text>
          <Text style={{ color: 'grey', ...styles.description }}>
            Search for Pokémon by name or using the National Pokédex number.
          </Text>
          <SearchBar />
        </View>
      </ImageBackground>
      <View style={{
        paddingBottom: 50,
        marginTop: 50,
        paddingHorizontal: 40,
      }}
      >
        <PokemonCard />
        <PokemonCard />
      </View>

    </>
  );
}

export default Home;
