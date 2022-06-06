import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TouchableWithoutFeedback, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import SearchPokemonController from '../../api/controllers/SearchPokemon';
import { Search } from '../../assets';
import Loading from '../Loading';

function SearchBar() {
  const navigation = useNavigation();

  const [input, setInput] = useState('');
  const [load, setLoad] = useState(false);

  const onSearch = async (query) => {
    await SearchPokemonController(query)
      .then((item) => {
        navigation.navigate('Pokemon', {
          item,
          from: 'search',
        });
        setInput('');
        setLoad(false);
      })
      .catch(() => {
        Alert.alert(
          'Fail to get Pokémons',
          'The Pokémons youre trying looking for is missing, please try again.',
        );
        setInput('');
        setLoad(false);
      });
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TouchableWithoutFeedback
          style={styles.icon}
          onPress={() => { onSearch(input); setLoad(true); }}
        >
          <Search color="grey" />
        </TouchableWithoutFeedback>
        <TextInput
          placeholderTextColor="grey"
          placeholder="What Pokémon are you looking for?"
          onChangeText={(text) => setInput(text)}
          value={input}
        />
      </View>
      {load
      && <Loading size="large" color="grey" style={{ marginVertical: 10 }} />}

    </>

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
