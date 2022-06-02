import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';

function Header({ children }) {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}

export default Header;
