import { Text, View } from 'react-native';
import React from 'react';
import Logo from '../Logo';
import styles from '../../utils/styles';

function Tag({
  type, tagStyle, fontStyle, width, height,
}) {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 7,
      marginRight: 5,
      padding: 5,
      marginTop: 2,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      ...tagStyle,
    }}
    >
      <Logo name={type} width={width} height={height} />
      <Text
        style={{
          color: 'white',
          marginLeft: 5,
          textTransform: 'capitalize',
          opacity: 1,
          ...styles.pokemonType,
          ...fontStyle,
        }}
      >
        {type}
      </Text>
    </View>
  );
}

export default Tag;
