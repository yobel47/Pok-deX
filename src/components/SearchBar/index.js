import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback, TextInput } from 'react-native-gesture-handler';
import Search from '../../assets/Icons/search.svg';

function SearchBar({ onPress }) {
  return (
    <View style={styles.searchContainer}>
      <TouchableWithoutFeedback
        style={styles.icon}
        onPress={onPress}
      >
        <Search color="grey" />
      </TouchableWithoutFeedback>
      <TextInput
        placeholderTextColor="grey"
        placeholder="What Pokémon are you looking for?"
      />
    </View>
  );
}

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    paddingLeft: 15,
  },
  icon: {
    paddingHorizontal: 10,
  },
});
