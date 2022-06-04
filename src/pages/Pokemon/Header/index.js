import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../../../utils/styles';
import { Pokeball } from '../../../components';

function Header({ item }) {
  return (
    <View style={{
      height: 64,
      marginTop: 32,
      paddingHorizontal: 24,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
    >
      <TouchableOpacity style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Icon name="arrow-left" color="white" size={28} />
      </TouchableOpacity>
      <Text style={{ ...styles.pokemonName, color: 'white' }}>{item.name}</Text>
      <Text style={{ ...styles.pokemonNumber, color: 'white' }}>
        #
        {item.pokedex_number}
      </Text>
      <Pokeball
        width={150}
        height={150}
        withRotate
        style={{
          position: 'absolute',
          right: -33,
          top: -42,
        }}
      />
    </View>
  );
}

export default Header;
