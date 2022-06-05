import {
  TouchableOpacity, Text, View, Animated,
} from 'react-native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import styles from '../../../utils/styles';
import { Pokeball } from '../../../components';

function Header({ item, translateY }) {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const fadeStyle = {
    opacity: translateY.interpolate({
      inputRange: [-300, -200],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  };

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
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={handleGoBack}
      >
        <Icon name="arrow-left" color="white" size={28} />
      </TouchableOpacity>
      <Animated.View style={fadeStyle}>
        <Text style={{ ...styles.pokemonName, color: 'white' }}>{item.name}</Text>
      </Animated.View>
      <Animated.View style={fadeStyle}>
        <Text style={{ ...styles.pokemonNumber, color: 'white' }}>
          #
          {item.pokedex_number}
        </Text>
      </Animated.View>

      <Pokeball
        width={150}
        height={150}
        withRotate
        style={{
          position: 'absolute',
          right: -33,
          top: -42,
          ...fadeStyle,
        }}
      />
    </View>
  );
}

export default Header;
