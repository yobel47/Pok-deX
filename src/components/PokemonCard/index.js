import {
  View, Text, Image, Dimensions,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import React, { useMemo } from 'react';
import styles from '../../utils/styles';
import Pokeball from '../Pokeball';
import { Dots } from '../../assets';
import Tag from '../Tag';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

const { width } = Dimensions.get('screen');

function PokemonCard({ item }) {
  const backgroundColor = useMemo(
    () => getColorByPokemonType(item.types[0].name),
    [item.types],
  );

  return (
    <View style={{
      marginVertical: 12,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      elevation: 5,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
      backgroundColor,
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
              #
              {item.pokedex_number}
            </Text>
            <Text style={{ ...styles.pokemonName }}>{item.name}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 10,
          }}
          >
            {item.types.map((type) => (
              <Tag key={type.url} type={type.name} />
            ))}

          </View>
        </View>

        <Pokeball
          width={120}
          height={120}
          style={{
            position: 'absolute',
            right: -8,
            bottom: -8,
          }}
        />

        <View style={{
          marginTop: -20,
          marginLeft: -30,
        }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
            }}
            source={{ uri: item.image }}
          />
        </View>
      </RectButton>
    </View>
  );
}

export default PokemonCard;
