import {
  View, Text, Image, Dimensions,
} from 'react-native';
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { pokeballHeader, pokeball } from '../../assets';
import styles from '../../utils/styles';
import SearchBar from '../SearchBar';

const { height, width } = Dimensions.get('screen');

function Header() {
  const navigation = useNavigation();

  return (
    <View>
      <Image
        resizeMode="contain"
        style={{ width, height: height / 4, marginTop: -20 }}
        source={pokeballHeader}
      />
      <View style={{
        width: 55,
        height: 55,
        borderRadius: 100,
        backgroundColor: '#f4c41e',
        justifyContent: 'center',
        position: 'absolute',
        top: 36,
        right: 38,
        overflow: 'hidden',
      }}
      >
        <RectButton
          onPress={() => { navigation.navigate('Profile'); }}
        >

          <Image
            source={pokeball}
            style={{
              width: 50, height: 50, alignSelf: 'center',
            }}
          />
        </RectButton>
      </View>

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
