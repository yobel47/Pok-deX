import {
  View, Text, Image, Dimensions,
} from 'react-native';
import React from 'react';
import { pokeballHeader } from '../../assets';
import styles from '../../utils/styles';
import SearchBar from '../SearchBar';

const { height, width } = Dimensions.get('screen');

function Header() {
  return (
    <View>
      <Image
        resizeMode="contain"
        style={{ width, height: height / 4, marginTop: -20 }}
        source={pokeballHeader}
      />
      <View style={{
        marginTop: -80,
        paddingHorizontal: 40,
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
    </View>
  );
}

export default Header;
