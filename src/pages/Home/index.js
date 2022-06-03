import {
  View, Text, ImageBackground, Dimensions, FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PokemonController from '../../api/controllers/Pokemon';
import { pokeballHeader } from '../../assets';
import styles from '../../utils/styles';
import { SearchBar, PokemonCard } from '../../components';

const { height } = Dimensions.get('screen');

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const query = { offset: 0, limit: 20 };

  const loadPokemons = () => {
    PokemonController(query)
      .then(
        (result) => {
          setPokemons(result);
          // console.log(result);
        },
      )
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  const header = () => (
    <>
      <ImageBackground
        resizeMode="contain"
        style={{ width: '100%', height: height / 4 }}
        source={pokeballHeader}
      />
      <View style={{
        marginTop: -80,
        paddingHorizontal: 40,
        // marginBottom: 20,
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
    </>
  );

  return (
    <View>

      <FlatList
        contentContainerStyle={{
          paddingBottom: 50,
          // marginTop: 60,
          // paddingHorizontal: 40,
        }}
        data={pokemons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 40 }}>
            <PokemonCard item={item} />
          </View>
        )}
        ListHeaderComponent={header}
      />
      {/* <View style={{
        paddingBottom: 50,
        marginTop: 50,
        paddingHorizontal: 40,
      }}
      >
        <PokemonCard />
        <PokemonCard />
      </View> */}

    </View>
  );
}

export default Home;
