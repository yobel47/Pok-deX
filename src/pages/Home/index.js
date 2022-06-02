/* eslint-disable no-console */
import {
  View, Text, ImageBackground, Dimensions,
} from 'react-native';
import React from 'react';
import PokemonController from '../../api/controllers/Pokemon';
import Header from '../../components/Header';
import pokeballHeader from '../../assets/images/pokeballHeader.png';
import styles from '../../utils/styles';
import SearchBar from '../../components/SearchBar';

const { width, height } = Dimensions.get('screen');

function Home() {
  const tesi = () => {
    const query = { offset: 0, limit: 20 };
    PokemonController(query)
      .then(
        (result) => console.log(result),
      )
      .catch((error) => console.log(error));
  };

  return (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{ width: width * 1, height: height / 4, marginTop: -15 }}
        source={pokeballHeader}
      >
        <View style={{
          padding: 20,
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
      <Text>asd</Text>
    </>
  );
}

export default Home;
