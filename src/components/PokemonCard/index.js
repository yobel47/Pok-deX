import {
  View,
} from 'react-native';
import React from 'react';

import Pokeball from '../Pokeball';

function PokemonCard() {
  return (
    <View>
      <Pokeball withRotate width={50} height={50} />
    </View>
  );
}

export default PokemonCard;
