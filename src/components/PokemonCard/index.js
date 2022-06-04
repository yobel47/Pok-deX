import {
  View, Text, Dimensions, Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import React, { useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../../utils/styles';
import Pokeball from '../Pokeball';
import { Dots } from '../../assets';
import Tag from '../Tag';
import getColorByPokemonType from '../../utils/getColorByPokemonType';

const { width } = Dimensions.get('screen');

function PokemonCard({ item, opacity }) {
  const navigation = useNavigation();

  const backgroundColor = useMemo(
    () => getColorByPokemonType(item.types[0].name),
    [item.types],
  );

  const containerStyle = {
    opacity: opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const handlePress = useCallback(() => {
    navigation.navigate('Pokemon', { item });
  }, [item]);

  return (
    <Animated.View
      style={{
        ...containerStyle,
        marginHorizontal: 40,
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
      <RectButton style={{ width: '100%', height: '100%', flexDirection: 'row' }} onPress={handlePress}>
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
          <FastImage
            style={{
              width: 150,
              height: 150,
            }}
            source={{ uri: item.image }}
          />
        </View>
      </RectButton>
    </Animated.View>
  );
}

export default React.memo(PokemonCard);
