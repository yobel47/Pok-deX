import {
  View, Text, Image, Dimensions,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import React from 'react';
import styles from '../../utils/styles';
import Pokeball from '../Pokeball';
import { POKEMON_TYPE_COLORS } from '../../constant';
import { Dots } from '../../assets/Icons';

const { width } = Dimensions.get('screen');

function PokemonCard() {
  return (
    <View style={{
      marginVertical: 12,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'relative',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      backgroundColor: POKEMON_TYPE_COLORS.grass,
    }}
    >
      <RectButton style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
        <View style={{ padding: 15, paddingRight: 0, width: width / 1.8 }}>
          <View style={{
            position: 'absolute', right: 30, top: -5, opacity: 0.4,
          }}
          >
            <Dots
              width={100}
              height={40}
              style={{ color: 'white' }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...styles.pokemonNumber }}>
              #001
            </Text>
            <Text style={{ ...styles.pokemonName }}>Bulbasour</Text>
          </View>

        </View>

        <Pokeball
          width={100}
          height={100}
          withRotate
          style={{
            position: 'absolute',
            right: -8,
            bottom: -8,
          }}
        />

        <View style={{
          marginTop: -20,
          marginLeft: -15,
        }}
        >
          <Image
            style={{
              width: 120,
              height: 120,
            }}
            source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' }}
          />
        </View>
      </RectButton>
    </View>
  );
}

export default PokemonCard;
